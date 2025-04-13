"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

const magicCardVariants = cva(
  "relative overflow-hidden rounded-lg border bg-background p-4 transition-all duration-300 group",
  {
    variants: {
      variant: {
        default: "border-border",
        glow: "border-transparent shadow-md",
        outline: "border-primary",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface MagicCardProps
  extends Omit<HTMLMotionProps<"div">, "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "children">,
    VariantProps<typeof magicCardVariants> {
  hoverEffect?: "lift" | "glow" | "border" | "none"
  glowColor?: string
  children?: React.ReactNode
}

const MagicCard = React.forwardRef<HTMLDivElement, MagicCardProps>(
  ({ className, children, variant, size, hoverEffect = "lift", glowColor = "rgba(76, 0, 255, 0.5)", ...props }, ref) => {
    const [position, setPosition] = React.useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = React.useState(false)
    const cardRef = React.useRef<HTMLDivElement>(null)

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
      if (!cardRef.current) return
      
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      setPosition({ x, y })
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          magicCardVariants({ variant, size, className }),
          hoverEffect === "lift" && "hover:-translate-y-1",
          hoverEffect === "border" && "hover:border-primary",
          "transition-all duration-300"
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        whileHover={hoverEffect === "lift" ? { y: -5 } : {}}
        {...props}
      >
        {/* Glow effect */}
        {hoverEffect === "glow" && isHovering && (
          <div
            className="absolute pointer-events-none"
            style={{
              background: `radial-gradient(circle 100px at ${position.x}px ${position.y}px, ${glowColor}, transparent)`,
              inset: "-50px",
              opacity: 0.5,
              zIndex: 0,
            }}
          />
        )}

        {/* Card content */}
        <div ref={cardRef} className="relative z-10">
          {children}
        </div>
      </motion.div>
    )
  }
)
MagicCard.displayName = "MagicCard"

export { MagicCard, magicCardVariants }