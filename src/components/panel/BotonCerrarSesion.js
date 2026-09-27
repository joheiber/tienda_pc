'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function BotonCerrarSesion() {
  const router = useRouter()

  async function cerrarSesion() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={cerrarSesion}
      className="text-sm text-slate-300 border border-slate-800 rounded-lg px-3 py-1.5 hover:bg-slate-900"
    >
      ⎋ Cerrar sesión
    </button>
  )
}