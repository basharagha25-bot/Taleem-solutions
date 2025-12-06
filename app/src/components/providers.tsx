'use client'

import * as React from 'react'
import NextTopLoader from 'nextjs-toploader'
import { BounceLoader } from '@/components/ui/loader'

export function Providers({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    // Simulate initial resource loading or wait for window load
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500) // 2.5 seconds for the bounce effect to be seen
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <NextTopLoader 
        color="#F39A23" // Using Orange for the top loader to contrast with Blue header
        initialPosition={0.08}
        crawlSpeed={200}
        height={4}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #F39A23,0 0 5px #F39A23"
      />
      {loading && <BounceLoader />}
      {!loading && children}
    </>
  )
}
