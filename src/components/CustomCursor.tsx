import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

interface Point {
  x: number
  y: number
  age: number
}

const TRAIL_LENGTH = 20
const MAX_AGE = 500 // ms
const PLATINUM_RGB = '229, 228, 226'

export default function CustomCursor() {
  const [isClicked, setIsClicked] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<Point[]>([])
  const requestRef = useRef<number>(0)
  
  // Smooth cursor follow
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 250 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      
      // Add point for trail
      pointsRef.current.push({ x: e.clientX, y: e.clientY, age: Date.now() })
      if (pointsRef.current.length > TRAIL_LENGTH) {
        pointsRef.current.shift()
      }
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [mouseX, mouseY])

  // Trail Animation Loop
  const animate = (_time: number) => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        const now = Date.now()
        pointsRef.current = pointsRef.current.filter(p => now - p.age < MAX_AGE)

        if (pointsRef.current.length > 1) {
          ctx.beginPath()
          ctx.moveTo(pointsRef.current[0].x, pointsRef.current[0].y)
          
          for (let i = 1; i < pointsRef.current.length; i++) {
            const p = pointsRef.current[i]
            ctx.lineTo(p.x, p.y)
          }

          const gradient = ctx.createLinearGradient(
            pointsRef.current[0].x, pointsRef.current[0].y,
            pointsRef.current[pointsRef.current.length-1].x, pointsRef.current[pointsRef.current.length-1].y
          )
          gradient.addColorStop(0, `rgba(${PLATINUM_RGB}, 0)`)
          gradient.addColorStop(1, `rgba(${PLATINUM_RGB}, 0.4)`)

          ctx.strokeStyle = gradient
          ctx.lineWidth = 1.5
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          ctx.stroke()
        }
      }
    }
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {/* Light Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9999] mix-blend-screen"
      />
      
      {/* Primary Cursor Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000] rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: 8,
          height: 8,
        }}
        animate={{
          scale: isClicked ? 1.5 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
    </>
  )
}
