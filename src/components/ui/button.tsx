import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-etoro-green text-white hover:bg-etoro-green-dark',
        destructive: 'bg-etoro-red text-white hover:bg-etoro-red-dark',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-etoro-gray-100 text-etoro-gray-900 hover:bg-etoro-gray-200',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-etoro-blue underline-offset-4 hover:underline',
        success: 'bg-etoro-green text-white hover:bg-etoro-green-dark',
        danger: 'bg-etoro-red text-white hover:bg-etoro-red-dark',
        'etoro-primary': 'bg-etoro-green text-white hover:bg-etoro-green-dark font-semibold px-6 py-3',
        'etoro-secondary': 'bg-white text-etoro-green border-2 border-etoro-green hover:bg-etoro-green hover:text-white font-semibold px-6 py-3',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
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
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }