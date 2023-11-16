'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/app/lib/database.types'

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();

  return (
    <Auth
      supabaseClient={supabase}
      view="sign_in"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      providers={[]}
      //redirectTo="http://localhost:3000/auth/callback"
      redirectTo="https://incomparable-llama-1b3592.netlify.app/auth/callback"
    />
  )
}