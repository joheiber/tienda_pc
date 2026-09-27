'use client'

import { useCarrito } from '@/context/CarritoContext'

export default function BotonAgregar({ producto }) {
  const { agregarProducto } = useCarrito()

  return (
    <button
      onClick={() => agregarProducto(producto)}
      className="w-full bg-cyan-500 text-slate-950 rounded-lg py-1.5 text-sm font-medium hover:bg-cyan-400"
    >
      Agregar
    </button>
  )
}