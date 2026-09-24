'use client'

import { useCarrito } from '@/context/CarritoContext'

export default function BotonAgregar({ producto }) {
  const { agregarProducto } = useCarrito()

  return (
    <button
      onClick={() => agregarProducto(producto)}
      className="mt-2 w-full bg-blue-600 text-white rounded py-1.5 text-sm hover:bg-blue-700"
    >
      Agregar
    </button>
  )
}