import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const skeletonVariants = cva(
  "bg-muted",
  {
    variants: {
      variant: {
        text: "h-4 w-full rounded",
        circular: "rounded-full",
        rectangular: "rounded-md",
      },
      animation: {
        pulse: "animate-pulse",
        wave: "shimmer",
      },
    },
    defaultVariants: {
      variant: "rectangular",
      animation: "pulse",
    },
  }
)

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({
  className,
  variant,
  animation,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ variant, animation }), className)}
      {...props}
    />
  )
}

export { Skeleton }
