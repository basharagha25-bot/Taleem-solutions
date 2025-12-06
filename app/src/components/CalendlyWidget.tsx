'use client'

import { useEffect } from 'react'

interface CalendlyWidgetProps {
  url: string
}

export default function CalendlyWidget({ url }: CalendlyWidgetProps) {
  useEffect(() => {
    const head = document.querySelector('head')
    const script = document.createElement('script')
    script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js')
    head?.appendChild(script)

    return () => {
      head?.removeChild(script)
    }
  }, [])

  return (
    <div 
      className="calendly-inline-widget w-full h-[650px]" 
      data-url={url} 
      style={{ minWidth: '320px', height: '650px' }} 
    />
  )
}
