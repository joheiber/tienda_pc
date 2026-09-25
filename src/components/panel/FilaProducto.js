'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function FilaProducto({ producto }) {
  const [precio, setPrecio] = useState(producto.precio)
  const [stock, setStock] = useState(producto.stock)
  const [guardando, setGuardando] = useState(false)
  const [guardado, setGuardado] = useState(false)

  async function guardarCambios() {
    setGuardando(true)
    setGuardado(false)
    const supabase = createClient()

    const { error } = await supabase
      .from('productos')
      .update({ precio: Number(precio), stock: Number(stock) })
      .eq('id', producto.id)

    setGuardando(false)

    if (!error) {
      setGuardado(true)
      setTimeout(() => setGuardado(false), 2000)
    }
  }

  return (
    <tr className="border-b">
      <td className="py-2 pr-4">{producto.nombre}</td>
      <td className="py-2 pr-4">
        <input
          type="number"
          step="0.01"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="w-24 border rounded p-1"
        />
      </td>
      <td className="py-2 pr-4">
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-16 border rounded p-1"
        />
      </td>
      <td className="py-2">
        <button
          onClick={guardarCambios}
          disabled={guardando}
          className="bg-blue-600 text-white rounded px-3 py-1 text-sm disabled:opacity-50"
        >
          {guardando ? 'Guardando...' : guardado ? 'Guardado ✓' : 'Guardar'}
        </button>
      </td>
    </tr>
  )
}