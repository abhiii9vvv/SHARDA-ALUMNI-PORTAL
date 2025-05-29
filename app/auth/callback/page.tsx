'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      const code = new URL(window.location.href).searchParams.get('code')

      if (code) {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        await supabase.auth.exchangeCodeForSession(code)
      }

      router.push('/dashboard')
    }

    handleCallback()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Authenticating...</h1>
        <p className="text-gray-600">Please wait while we complete the authentication process.</p>
      </div>
    </div>
  )
} 