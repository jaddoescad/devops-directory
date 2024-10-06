"use client"

import React, { type ComponentProps } from "react"
import { useFormStatus } from "react-dom"

import { cn } from "@/lib/utils"

type Props = ComponentProps<"button"> & {
  pendingText?: string
}

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus()

  const isPending = pending && action === props.formAction

  return (
    <StyledButton {...props} type="submit" aria-disabled={pending}>
      {isPending ? pendingText : children}
    </StyledButton>
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const StyledButton: React.FC<ButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "relative inline-flex items-center px-4 py-2 group",
        "text-base font-medium leading-6 rounded-[9px]",
        "bg-gradient-to-b from-white to-gray-50 text-black/80",
        "shadow-[0_0_0_1px_rgba(0,0,0,0.1)_inset,0_0.5px_0.5px_rgba(0,0,0,0.05)_inset,0_-0.5px_0.5px_rgba(0,0,0,0.05)_inset,0_1px_2px_rgba(0,0,0,0.1)]",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/20",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      style={{ backgroundClip: "padding-box" }}
      {...props}
    >
      <span className="mr-2 scale-95 group-hover:scale-100">←</span>
      {children}
    </button>
  )
}
