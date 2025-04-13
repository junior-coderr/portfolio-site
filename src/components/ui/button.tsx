import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors transition-transform duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[2px] active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_4px_12px_rgba(var(--primary),0.25)] hover:shadow-[0_6px_16px_rgba(var(--primary),0.35)] focus:ring-2 focus:ring-primary/40",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 shadow-[0_4px_12px_rgba(var(--destructive),0.25)] hover:shadow-[0_6px_16px_rgba(var(--destructive),0.35)] focus-visible:ring-destructive/20",
        outline:
          "border bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground hover:border-accent dark:bg-input/20 dark:border-input/40 dark:hover:bg-input/30 border-[1.5px] shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-[0_4px_12px_rgba(var(--secondary),0.15)] hover:shadow-[0_5px_14px_rgba(var(--secondary),0.25)]",
        ghost:
          "hover:bg-accent/50 hover:text-accent-foreground dark:hover:bg-accent/30",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        gradient: "bg-gradient-to-br from-primary to-primary/60 text-primary-foreground hover:opacity-90 shadow-md hover:shadow-lg focus:ring-2 focus:ring-primary/40",
      },
      size: {
        default: "h-10 px-5 py-2 has-[>svg]:px-4",
        sm: "h-8 rounded-md gap-1.5 px-3.5 has-[>svg]:px-2.5",
        lg: "h-11 rounded-md px-7 has-[>svg]:px-5 text-base",
        icon: "size-10 rounded-full p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
