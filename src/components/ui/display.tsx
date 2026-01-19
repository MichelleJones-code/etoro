import * as React from 'react'
import { cn } from '@/lib/utils'
import { formatCurrency, formatPercent } from '@/lib/utils'

interface PriceDisplayProps {
  price: number
  change?: number
  changePercent?: number
  showChange?: boolean
  currency?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function PriceDisplay({
  price,
  change = 0,
  changePercent = 0,
  showChange = true,
  currency = 'USD',
  className,
  size = 'md',
}: PriceDisplayProps) {
  const isPositive = change >= 0
  const changeColor = isPositive ? 'price-up' : 'price-down'

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg font-semibold',
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <span className={cn('font-medium text-etoro-gray-900', sizeClasses[size])}>
        {formatCurrency(price, currency)}
      </span>
      {showChange && (
        <span className={cn('text-xs', changeColor)}>
          {isPositive ? '+' : ''}{formatCurrency(change, currency)} ({formatPercent(changePercent)})
        </span>
      )}
    </div>
  )
}

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-etoro-gray-100 text-etoro-gray-800',
    success: 'bg-etoro-green/10 text-etoro-green',
    danger: 'bg-etoro-red/10 text-etoro-red',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-etoro-blue/10 text-etoro-blue',
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  )
}

interface IconProps {
  icon: React.ReactNode
  label: string
  variant?: 'default' | 'success' | 'danger' | 'warning'
  size?: 'sm' | 'md' | 'lg'
}

export function StatusIcon({ icon, label, variant = 'default', size = 'md' }: IconProps) {
  const variantClasses = {
    default: 'text-etoro-gray-600',
    success: 'text-etoro-green',
    danger: 'text-etoro-red',
    warning: 'text-yellow-600',
  }

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <div className="flex items-center space-x-2">
      <div className={cn(variantClasses[variant], sizeClasses[size])}>
        {icon}
      </div>
      <span className={cn('text-sm', variantClasses[variant])}>{label}</span>
    </div>
  )
}

interface SparklineProps {
  data: number[]
  width?: number
  height?: number
  stroke?: string
  strokeWidth?: number
  fill?: string
}

export function Sparkline({
  data,
  width = 60,
  height = 20,
  stroke = '#00b066',
  strokeWidth = 2,
  fill = 'none',
}: SparklineProps) {
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - ((value - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  const gradient = data[data.length - 1] >= data[0]
    ? 'url(#greenGradient)'
    : 'url(#redGradient)'

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00b066" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00b066" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff4444" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ff4444" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill={gradient}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}