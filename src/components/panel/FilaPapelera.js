'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function FilaPapelera({ producto }) {
  const router = useRouter()

  async function restaurar() {
    const supabase = createClient()
    const { error } = await supabase
      .from('productos')
      .update({ activo: true })
      .eq('id', producto.id)

    if (error) {
      console.error(error)
      return
    }

    router.refresh()
  }

  async function eliminarDefinitivo() {
    const confirmar = window.confirm(
      `¿Eliminar "${producto.nombre}" para siempre? Esta acción no se puede deshacer.`
    )
    if (!confirmar) return

    const supabase = createClient()
    const { error } = await supabase.from('productos').delete().eq('id', producto.id)

    if (error) {
      if (error.code === '23503') {
        alert(
          'Este producto no se puede eliminar por completo porque aparece en el historial de cotizaciones. Puedes dejarlo en la papelera o restaurarlo.'
        )
      } else {
        console.error(error)
        alert('No se pudo eliminar el producto.')
      }
      return
    }

    router.refresh()
  }

  return (
    <tr className="border-b">
      <td className="py-2 pr-4">{producto.nombre}</td>
      <td className="py-2 pr-4">S/ {producto.precio}</td>
      <td className="py-2 pr-4">
        <button onClick={restaurar} className="text-green-600 text-sm underline">
          Restaurar
        </button>
      </td>
      <td className="py-2">
        <button onClick={eliminarDefinitivo} className="text-red-600 text-sm underline">
          Eliminar definitivamente
        </button>
      </td>
    </tr>
  )
}