import * as React from 'react'
import { cn } from '@/lib/utils'
import { Search, X } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  containerClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, leftIcon, rightIcon, containerClassName, ...props }, ref) => {
    return (
      <div className={cn('space-y-2', containerClassName)}>
        {label && (
          <label className="text-sm font-medium text-etoro-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-etoro-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-md border border-etoro-gray-200 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-etoro-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-etoro-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-etoro-red focus-visible:ring-etoro-red',
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-etoro-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-etoro-red">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: Array<{ value: string; label: string }>
  placeholder?: string
  containerClassName?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, containerClassName, ...props }, ref) => {
    return (
      <div className={cn('space-y-2', containerClassName)}>
        {label && (
          <label className="text-sm font-medium text-etoro-gray-700">
            {label}
          </label>
        )}
        <select
          className={cn(
            'flex h-10 w-full rounded-md border border-etoro-gray-200 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-etoro-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-etoro-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-etoro-red focus-visible:ring-etoro-red',
            className
          )}
          ref={ref}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs text-etoro-red">{error}</p>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'

interface SearchInputProps extends Omit<InputProps, 'leftIcon'> {
  onClear?: () => void
  showClearButton?: boolean
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, showClearButton, onClear, value, ...props }, ref) => {
    return (
      <Input
        type="text"
        leftIcon={<Search className="w-4 h-4" />}
        rightIcon={
          showClearButton && value ? (
            <button
              type="button"
              onClick={onClear}
              className="hover:text-etoro-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : undefined
        }
        value={value}
        className={cn('pr-10', className)}
        ref={ref}
        {...props}
      />
    )
  }
)
SearchInput.displayName = 'SearchInput'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  containerClassName?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, containerClassName, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className={cn('space-y-2', containerClassName)}>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={checkboxId}
            className={cn(
              'h-4 w-4 rounded border-etoro-gray-300 text-etoro-green focus:ring-2 focus:ring-etoro-green focus:ring-offset-2',
              error && 'border-etoro-red focus:ring-etoro-red',
              className
            )}
            ref={ref}
            {...props}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium text-etoro-gray-700 cursor-pointer"
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <p className="text-xs text-etoro-red">{error}</p>
        )}
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  containerClassName?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, containerClassName, ...props }, ref) => {
    return (
      <div className={cn('space-y-2', containerClassName)}>
        {label && (
          <label className="text-sm font-medium text-etoro-gray-700">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-etoro-gray-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-etoro-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-etoro-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-etoro-red focus-visible:ring-etoro-red',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-xs text-etoro-red">{error}</p>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Input, Select, SearchInput, Checkbox, Textarea }