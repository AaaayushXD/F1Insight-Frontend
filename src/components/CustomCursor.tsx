import { useEffect, useState, useCallback, useRef } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";

/**
 * Premium F1 Helmet Cursor
 *
 * Safety Features:
 * - Only hides system cursor when mouse moves (never leaves user without a pointer).
 * - Automatic restoration for all text/input contexts.
 * - Disables for touch devices and reduced-motion preferences.
 * - Lightweight requestAnimationFrame-based tracking logic.
 */
export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isInInputContext, setIsInInputContext] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Performance optimized spring tracking
  const springConfig = { damping: 28, stiffness: 300, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const cursorRef = useRef<HTMLDivElement>(null);

  const updateContext = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    // Check for input contexts where system cursor is mandatory
    const isInput = !!target.closest(
      "input, textarea, select, [contenteditable='true'], .auth-form",
    );
    setIsInInputContext(isInput);

    // Check for interactive elements for helmet feedback (tilt/glow)
    const isLink = !!target.closest("button, a, [role='button']");
    setIsHovering(isLink);

    if (isLink) {
      const clickable = target.closest("button, a, [role='button']");
      setIsDisabled(
        !!(
          clickable?.hasAttribute("disabled") ||
          clickable?.classList.contains("disabled")
        ),
      );
    }
  }, []);

  useEffect(() => {
    // 1. Accessibility & Device Detection
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (touch || reducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      updateContext(e);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [isVisible, mouseX, mouseY, updateContext]);

  // 2. Safety Toggle: Only hide system cursor if helmet is visible and NOT in input context
  useEffect(() => {
    if (isVisible && !isInInputContext && !isTouchDevice) {
      document.documentElement.classList.add("custom-cursor-active");
    } else {
      document.documentElement.classList.remove("custom-cursor-active");
    }
  }, [isVisible, isInInputContext, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <AnimatePresence>
      {isVisible && !isInInputContext && (
        <motion.div
          ref={cursorRef}
          className="pointer-events-none fixed left-0 top-0 z-99999 flex items-center justify-center translate-y-[-50%] translate-x-[-50%]"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          {/* Subtle Dynamic Bloom */}
          <motion.div
            className="absolute h-10 w-10 rounded-full bg-f1-red/10 blur-xl"
            animate={{
              scale: isHovering ? 1.6 : 1,
              opacity: isHovering ? 0.3 : 0.15,
            }}
          />

          {/* Minimal F1 Helmet SVG */}
          <motion.svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-f1-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            animate={{
              rotate: isHovering ? 12 : 0,
              scale: isClicked ? 0.8 : 1,
              opacity: isDisabled ? 0.4 : 1,
            }}
            transition={{ type: "spring", damping: 15 }}
          >
            {/* Aerodynamic Shell */}
            <path
              d="M12 4C7.58 4 4 7.58 4 12V16C4 18.21 5.79 20 8 20H16C18.21 20 20 18.21 20 16V12C20 7.58 16.42 4 12 4Z"
              fill="currentColor"
            />
            {/* Professional Visor */}
            <path
              d="M5 11C5 11 7 10 12 10C17 10 19 11 19 11V14H5V11Z"
              fill="#0F1115"
            />
            {/* Top Detail Path */}
            <path
              d="M10 6C10 6 11 5.5 12 5.5C13 5.5 14 6 14 6"
              stroke="#0B0D10"
              strokeWidth="0.5"
            />
          </motion.svg>

          {/* Idle Breathing Pulse - Very Subtle */}
          <motion.div
            className="absolute h-6 w-6 rounded-full border border-f1-white/3"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
