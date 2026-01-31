import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { useEffect, useState, useRef } from "react"

interface GlowingBorderProps {
  children: ReactNode
  className?: string
  glowColor?: string
  duration?: number
}

export function GlowingBorder({ 
  children, 
  className = "", 
  glowColor = "#E10600",
  duration = 8 
}: GlowingBorderProps) {
  const [rectSize, setRectSize] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  
  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current
      setRectSize({ width: offsetWidth, height: offsetHeight })
    }
  }, [])

  // Calculate perimeter for stroke-dasharray
  const perimeter = (rectSize.width + rectSize.height) * 2

  return (
    <div 
      ref={containerRef}
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => {
        setIsClicked(true)
        setTimeout(() => setIsClicked(false), 200)
      }}
    >
      {/* SVG Border Overlay */}
      {rectSize.width > 0 && (
        <svg
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          width="100%"
          height="100%"
          viewBox={`0 0 ${rectSize.width} ${rectSize.height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Static gray border - Completely hidden on hover */}
          <motion.rect
            x="0.5"
            y="0.5"
            width={rectSize.width - 1}
            height={rectSize.height - 1}
            rx="8"
            stroke="#374151"
            strokeWidth="1"
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />

          {/* Animated Glowing Line - Thicker and isolated on hover */}
          <motion.rect
            x="0.5"
            y="0.5"
            width={rectSize.width - 1}
            height={rectSize.height - 1}
            rx="8"
            stroke={glowColor}
            strokeWidth={isClicked ? 5 : 3.5}
            strokeLinecap="round"
            initial={{ strokeDasharray: `100 ${perimeter}`, strokeDashoffset: 0 }}
            animate={{ 
              strokeDashoffset: -perimeter,
              opacity: isHovered ? 1 : 0,
              strokeWidth: isClicked ? 5 : 3.5
            }}
            transition={{
              strokeDashoffset: {
                duration: isHovered ? duration / 2 : duration,
                repeat: Infinity,
                ease: "linear",
              },
              opacity: { duration: 0.2 },
              strokeWidth: { duration: 0.1 }
            }}
            style={{
              filter: isClicked 
                ? `blur(3px) drop-shadow(0 0 10px ${glowColor})`
                : `blur(1.5px) drop-shadow(0 0 8px ${glowColor})`,
            }}
          />
        </svg>
      )}

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}
