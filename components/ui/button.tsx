import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-[#303030] to-gray-950 text-white/90 border-[1px] border-black/30 hover:text-white",
        destructive:
          "bg-destructive text-destructive-foreground  hover:bg-destructive/90",
        outline: " bg-background  hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-gradient-to-b from-white to-gray-50 text-black/80 hover:text-black",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          "relative inline-flex items-center px-4 py-2 group",
          "text-base font-medium leading-6 rounded-[9px]",
          // Removed focus-related classes
          "focus:outline-none",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        style={{ backgroundClip: "padding-box" }}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
