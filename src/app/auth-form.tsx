'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/app/lib/database.types'
import { useEffect, useState } from 'react'
import { Session } from '@supabase/auth-helpers-nextjs'

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();
  const [session, setSession] = useState<Session|null>(null)


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const logOut = async () => {
    await supabase.auth.signOut()

  };

  if (!session) {

  return (
    <Auth
      supabaseClient={supabase}
      view="sign_in"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      providers={[]}
      redirectTo={`https://spectacular-centaur-c12895.netlify.app/auth/callback`}
    />
  )
  }
  else {
    return (
      <div>
        <h1>Logged in</h1>
        <button onClick={logOut}>Log out</button>

      </div>
    )
  }
}