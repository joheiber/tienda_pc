'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCarrito } from '@/context/CarritoContext'

export default function CarritoPanel() {
  const [abierto, setAbierto] = useState(false)
  const { items, cambiarCantidad, quitarProducto, total } = useCarrito()

  const pathname = usePathname()
  const ocultarEnEstaRuta = pathname.startsWith('/login') || pathname.startsWith('/panel')
  if (ocultarEnEstaRuta) return null

  const cantidadTotal = items.reduce((suma, item) => suma + item.cantidad, 0)

  return (
    <>
      <button
        onClick={() => setAbierto(true)}
        className="relative flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-sm rounded-lg px-4 py-2"
      >
        🛒 Carrito
        {cantidadTotal > 0 && (
          <span className="absolute -top-2 -right-2 bg-cyan-500 text-slate-950 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cantidadTotal}
          </span>
        )}
      </button>

      {abierto && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60" onClick={() => setAbierto(false)} />

          <div className="relative w-full sm:w-96 h-full bg-slate-950 border-l border-slate-800 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                🛒 Carrito {cantidadTotal > 0 && <span className="bg-cyan-500 text-slate-950 text-xs rounded-full px-2 py-0.5">{cantidadTotal}</span>}
              </h2>
              <button onClick={() => setAbierto(false)} className="text-slate-500 text-xl">
                ✕
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-slate-500">Todavía no agregaste productos.</p>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.producto.id} className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex gap-3">
                    {item.producto.imagen_url ? (
                      <img src={item.producto.imagen_url} alt={item.producto.nombre} className="w-14 h-14 object-cover rounded" />
                    ) : (
                      <div className="w-14 h-14 bg-slate-800 rounded flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-white">{item.producto.nombre}</p>
                        <button onClick={() => quitarProducto(item.producto.id)} className="text-slate-500 hover:text-rose-400">
                          🗑
                        </button>
                      </div>
                      <p className="text-cyan-400 text-sm mb-1">S/ {item.producto.precio}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => cambiarCantidad(item.producto.id, item.cantidad - 1)}
                          className="w-6 h-6 bg-slate-800 rounded text-white"
                        >
                          −
                        </button>
                        <span className="text-white text-sm">{item.cantidad}</span>
                        <button
                          onClick={() => cambiarCantidad(item.producto.id, item.cantidad + 1)}
                          className="w-6 h-6 bg-slate-800 rounded text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Total</span>
              <span className="text-2xl font-bold text-white">S/ {total.toFixed(2)}</span>
            </div>

            {items.length > 0 && (
              <Link
                href="/cotizar"
                onClick={() => setAbierto(false)}
                className="mt-4 block text-center bg-cyan-500 text-slate-950 rounded-lg py-2.5 font-semibold hover:bg-cyan-400"
              >
                Cotizar →
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  )
}