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
    const { error: errorLogin } = await supabase.auth.signInWithPassword({ email, password })

    setCargando(false)

    if (errorLogin) {
      setError('Correo o contraseña incorrectos.')
      return
    }

    router.push('/panel')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="bg-cyan-500 text-slate-950 w-8 h-8 rounded-lg flex items-center justify-center font-bold">N</span>
        <span className="font-bold text-lg text-white">NexusPC</span>
      </div>

      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h1 className="text-lg font-bold text-white">Acceso al panel</h1>
        <p className="text-sm text-slate-500 mb-5">Área restringida — solo staff autorizado</p>

        <form onSubmit={iniciarSesion} className="space-y-3">
          <div>
            <label className="text-sm text-slate-400">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white mt-1"
              required
            />
          </div>
          <div>
            <label className="text-sm text-slate-400">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white mt-1"
              required
            />
          </div>

          {error && <p className="text-rose-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-cyan-500 text-slate-950 rounded-lg py-2.5 font-semibold disabled:opacity-50"
          >
            {cargando ? 'Ingresando...' : '→ Ingresar'}
          </button>
        </form>
      </div>
    </main>
  )
}