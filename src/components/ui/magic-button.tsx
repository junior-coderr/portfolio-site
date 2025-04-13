"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

const magicButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "text-white font-bold relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-violet-600 hover:bg-gradient-to-l",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface MagicButtonProps
  extends Omit<HTMLMotionProps<"button">, "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "children">,
    VariantProps<typeof magicButtonVariants> {
  glow?: boolean
  shimmer?: boolean
  glowColor?: string
  children?: React.ReactNode
}

const MagicButton = React.forwardRef<HTMLButtonElement, MagicButtonProps>(
  ({ className, variant, size, glow = false, shimmer = false, glowColor = "rgba(76, 0, 255, 0.7)", children, ...props }, ref) => {
    const [position, setPosition] = React.useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = React.useState(false)
    const buttonRef = React.useRef<HTMLButtonElement>(null)

    function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
      if (!buttonRef.current) return
      
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      setPosition({ x, y })
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          magicButtonVariants({ variant, size, className }),
          glow && "shadow-lg",
          shimmer && "group"
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {glow && isHovering && (
          <div
            className="absolute pointer-events-none"
            style={{
              background: `radial-gradient(circle 80px at ${position.x}px ${position.y}px, ${glowColor}, transparent)`,
              inset: "-30px",
              opacity: 0.8,
              zIndex: 0,
            }}
          />
        )}

        {shimmer && (
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out" />
        )}

        <span className="relative z-10">{children}</span>
      </motion.button>
    )
  }
)
MagicButton.displayName = "MagicButton"

export { MagicButton, magicButtonVariants }