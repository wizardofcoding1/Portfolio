import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const followerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const isHoveringRef = useRef(false)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const isMouseDownRef = useRef(false)
  const [glowColor, setGlowColor] = useState('rgba(37, 99, 235, 0.35)') // default theme color

  useEffect(() => {
    // Add custom cursor class to enable global CSS rules
    document.documentElement.classList.add('has-custom-cursor')

    const follower = followerRef.current
    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0
    let lastMouseX = 0, lastMouseY = 0
    let speed = 0
    let currentScale = 1
    let raf

    const updateCursor = () => {
      // Lagging follower interpolation (very responsive 0.22 coeff)
      followerX += (mouseX - followerX) * 0.22
      followerY += (mouseY - followerY) * 0.22

      // Velocity calculation (distance moved since last frame)
      const dx = mouseX - lastMouseX
      const dy = mouseY - lastMouseY
      const targetSpeed = Math.sqrt(dx * dx + dy * dy)

      // Smooth velocity interpolation
      speed += (targetSpeed - speed) * 0.1

      lastMouseX = mouseX
      lastMouseY = mouseY

      // Map speed to scale factor (ranges between 1.0 and 1.7x)
      let targetScale = 1 + Math.min(speed * 0.035, 0.7)
      if (isHoveringRef.current) {
        targetScale *= 1.25 // Scale up cursor on hover
      }
      if (isMouseDownRef.current) {
        targetScale *= 0.75 // Shrink cursor on click
      }
      currentScale += (targetScale - currentScale) * 0.12

      if (follower) {
        // Offset and rotate to point top-left (traditional mouse pointer angle)
        follower.style.transform = `translate(${followerX - 10}px, ${followerY - 2}px) scale(${currentScale}) rotate(-30deg)`
      }

      raf = requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const handleMouseDown = () => {
      isMouseDownRef.current = true
      setIsMouseDown(true)
    }
    const handleMouseUp = () => {
      isMouseDownRef.current = false
      setIsMouseDown(false)
    }

    // Detect hovers on interactive components
    const detectHover = () => {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, [class*="card"], [class*="btn"], [class*="tab"], [class*="link"], [data-cursor-color]'
      )
      interactives.forEach((el) => {
        if (el.dataset.hasCursorListener) return
        el.dataset.hasCursorListener = 'true'

        el.addEventListener('mouseenter', () => {
          isHoveringRef.current = true
          setIsHovering(true)
          const color = el.getAttribute('data-cursor-color')
          if (color) {
            setGlowColor(color)
          } else {
            setGlowColor('rgba(37, 99, 235, 0.75)') // Vibrant blue glow on hover
          }
        })
        el.addEventListener('mouseleave', () => {
          isHoveringRef.current = false
          setIsHovering(false)
          setGlowColor('rgba(37, 99, 235, 0.35)') // Reset to default subtle blue
        })
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    raf = requestAnimationFrame(updateCursor)
    detectHover()

    // Monitor additions of interactive components to dynamically register listeners
    const observer = new MutationObserver(detectHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [isVisible])

  // Disable on mobile/touch interfaces
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <div
      ref={followerRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300"
      style={{
        width: '32px',
        height: '32px',
        opacity: isVisible ? 1 : 0,
        willChange: 'transform',
      }}
    >
      {/* Premium trailing glow behind the rocket cursor */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md transition-all duration-300"
        style={{
          width: isHovering ? '36px' : '24px',
          height: isHovering ? '36px' : '24px',
          backgroundColor: isHovering ? 'rgba(37, 99, 235, 0.8)' : glowColor,
          boxShadow: isHovering
            ? '0 0 24px 8px rgba(37, 99, 235, 0.8)'
            : `0 0 16px 6px ${glowColor}`,
          opacity: isHovering ? 0.75 : 0.45,
        }}
      />
      {/* Rocket cursor image up.png */}
      <div
        className="w-full h-full"
        style={{
          backgroundImage: 'url(/up.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
    </div>
  )
}
