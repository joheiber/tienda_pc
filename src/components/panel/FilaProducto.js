'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function FilaProducto({ producto }) {
  const router = useRouter()
  const [precio, setPrecio] = useState(producto.precio)
  const [stock, setStock] = useState(producto.stock)
  const [guardando, setGuardando] = useState(false)
  const [guardado, setGuardado] = useState(false)
  const [error, setError] = useState('')  // NUEVO

  async function guardarCambios() {
    setError('')  // NUEVO

    // NUEVO: no permitir negativos
    if (Number(precio) < 0 || Number(stock) < 0) {
      setError('El precio y el stock no pueden ser negativos.')
      return
    }

    setGuardando(true)
    setGuardado(false)
    const supabase = createClient()

    const { error: errorUpdate } = await supabase
      .from('productos')
      .update({ precio: Number(precio), stock: Number(stock) })
      .eq('id', producto.id)

    setGuardando(false)

    if (!errorUpdate) {
      setGuardado(true)
      setTimeout(() => setGuardado(false), 2000)
    } else {
      setError('No se pudo guardar. Intenta de nuevo.')  // NUEVO
    }
  }

  async function ocultarProducto() {
    const supabase = createClient()
    const { error } = await supabase.from('productos').update({ activo: false }).eq('id', producto.id)
    if (error) {
      console.error(error)
      return
    }
    router.refresh()
  }

  return (
    <tr className="border-b border-slate-800">
      <td className="py-3 px-4">
        <p className="text-white font-medium">{producto.nombre}</p>
        {producto.categoria_id && <p className="text-xs text-slate-500">{producto.marca}</p>}
      </td>
      <td className="py-3 px-4">
        <input
          type="number"
          step="0.01"
          min="0"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="w-24 bg-slate-800 border border-slate-700 rounded-lg p-1.5 text-white"
        />
      </td>
      <td className="py-3 px-4">
        <input
          type="number"
          min="0"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-16 bg-slate-800 border border-slate-700 rounded-lg p-1.5 text-white"
        />
      </td>
      <td className="py-3 px-4">
        <div className="flex gap-2">
          <button
            onClick={guardarCambios}
            disabled={guardando}
            className="bg-cyan-500/10 text-cyan-400 rounded-lg px-3 py-1.5 text-sm disabled:opacity-50"
          >
            {guardando ? 'Guardando...' : guardado ? 'Guardado ✓' : '💾 Guardar'}
          </button>
          <button
            onClick={ocultarProducto}
            className="bg-rose-500/10 text-rose-400 rounded-lg px-3 py-1.5 text-sm"
          >
            👁 Ocultar
          </button>
        </div>
        {error && <p className="text-rose-400 text-xs mt-1">{error}</p>}
      </td>
    </tr>
  )
}