'use client'

import { useState } from 'react'
import { useCarrito } from '@/context/CarritoContext'

export default function CarritoPanel() {
  const [abierto, setAbierto] = useState(false)
  const { items, cambiarCantidad, quitarProducto, total } = useCarrito()

  const cantidadTotal = items.reduce((suma, item) => suma + item.cantidad, 0)

  return (
    <>
      <button
        onClick={() => setAbierto(true)}
        className="fixed top-4 right-4 z-40 bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg text-xl"
      >
        🛒
        {cantidadTotal > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cantidadTotal}
          </span>
        )}
      </button>

      {abierto && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setAbierto(false)}
          />

          <div className="relative w-full sm:w-96 h-full bg-white p-4 overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Tu cotización</h2>
              <button onClick={() => setAbierto(false)} className="text-gray-500 text-xl">
                ✕
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-gray-500">Todavía no agregaste productos.</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.producto.id} className="border-b pb-3">
                    <div className="flex justify-between">
                      <p className="font-medium">{item.producto.nombre}</p>
                      <button
                        onClick={() => quitarProducto(item.producto.id)}
                        className="text-red-500 text-sm"
                      >
                        Quitar
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <input
                        type="number"
                        min="0"
                        value={item.cantidad}
                        onChange={(e) =>
                          cambiarCantidad(item.producto.id, Number(e.target.value))
                        }
                        className="w-16 border rounded p-1 text-center"
                      />
                      <p className="text-gray-700">
                        S/ {(item.producto.precio * item.cantidad).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 text-xl font-bold">
              Total: S/ {total.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </>
  )
}