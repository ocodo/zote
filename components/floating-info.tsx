import React, { useState, useRef } from "react"

interface FloatingInfoProps {
  body: React.ReactNode
  onClick: () => void
  children: React.ReactNode
}

export const FloatBox: React.FC<FloatingInfoProps> = ({ children, body: tooltipBody, onClick }) => {
  const [visible, setVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const targetRef = useRef<HTMLDivElement | null>(null)

  const handleMouseEnter = () => {
    setVisible(true)
    if (targetRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect()
      setTooltipPosition({
        top: targetRect.top - 40,  // Position above the element
        left: targetRect.left + targetRect.width / 2,  // Center the tooltip
      })
    }
  }

  const handleMouseLeave = () => {
    setVisible(false)
  }

  return (
    <div
      ref={targetRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={onClick}
      className="inline-block"
    >
      {children}

      {visible && (
        <div
          className="
          dark:bg-gray-900 bg-slate-200 dark:text-white text-slate-900
          opacity-90
          p-4 rounded-lg whitespace-nowrap absolute
          "
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            transform: "translateX(-50%)",
            zIndex: 9999,
            pointerEvents: "none",
            border: '1px'
          }}
        >
          {tooltipBody}
        </div>
      )}
    </div>
  )
}
