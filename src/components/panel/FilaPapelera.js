'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function FilaPapelera({ producto }) {
  const router = useRouter()

  async function restaurar() {
    const supabase = createClient()
    const { error } = await supabase.from('productos').update({ activo: true }).eq('id', producto.id)
    if (error) { console.error(error); return }
    router.refresh()
  }

  async function eliminarDefinitivo() {
    const confirmar = window.confirm(`¿Eliminar "${producto.nombre}" para siempre? Esta acción no se puede deshacer.`)
    if (!confirmar) return

    const supabase = createClient()
    const { error } = await supabase.from('productos').delete().eq('id', producto.id)

    if (error) {
      if (error.code === '23503') {
        alert('Este producto no se puede eliminar por completo porque aparece en el historial de cotizaciones. Puedes dejarlo en la papelera o restaurarlo.')
      } else {
        console.error(error)
        alert('No se pudo eliminar el producto.')
      }
      return
    }

    router.refresh()
  }

  return (
    <tr className="border-b border-slate-800">
      <td className="py-3 px-4 text-white">{producto.nombre}</td>
      <td className="py-3 px-4 text-slate-400">S/ {producto.precio}</td>
      <td className="py-3 px-4">
        <div className="flex gap-2">
          <button onClick={restaurar} className="bg-emerald-500/10 text-emerald-400 rounded-lg px-3 py-1.5 text-sm">
            ↻ Restaurar
          </button>
          <button onClick={eliminarDefinitivo} className="bg-rose-500/10 text-rose-400 rounded-lg px-3 py-1.5 text-sm">
            ✕ Eliminar
          </button>
        </div>
      </td>
    </tr>
  )
}