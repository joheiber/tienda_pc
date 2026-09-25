'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  async function iniciarSesion(e) {
    e.preventDefault()
    setError('')
    setCargando(true)

    const supabase = createClient()
    const { error: errorLogin } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setCargando(false)

    if (errorLogin) {
      setError('Correo o contraseña incorrectos.')
      return
    }

    router.push('/panel')
  }

  return (
    <main className="max-w-sm mx-auto p-6 mt-12">
      <h1 className="text-2xl font-bold mb-6">Ingreso del dueño</h1>

      <form onSubmit={iniciarSesion} className="space-y-3">
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-blue-600 text-white rounded py-2 font-medium disabled:opacity-50"
        >
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </main>
  )
}