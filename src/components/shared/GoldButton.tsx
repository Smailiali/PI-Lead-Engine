import type { ButtonHTMLAttributes } from 'react'

interface GoldButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export default function GoldButton({
  children,
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: GoldButtonProps) {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      {...props}
      className={`
        inline-flex items-center justify-center gap-2
        bg-gold text-navy font-sans font-bold rounded-lg
        shadow-md hover:bg-gold-dark active:scale-[0.98]
        transition-all duration-150 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  )
}
