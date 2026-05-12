interface ClickToCallProps {
  phoneNumber: string
  className?: string
  children?: React.ReactNode
}

export default function ClickToCall({ phoneNumber, className = '', children }: ClickToCallProps) {
  const digits = phoneNumber.replace(/\D/g, '')
  const href = `tel:+1${digits}`

  return (
    <a href={href} className={className}>
      {children ?? phoneNumber}
    </a>
  )
}
