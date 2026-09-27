'use client'

import { useState } from 'react'
import Link from 'next/link'
import BotonAgregar from './BotonAgregar'

export default function Buscador({ productos }) {
  const [busqueda, setBusqueda] = useState('')

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar procesadores, GPUs, laptops..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 mb-6 text-white placeholder-slate-500"
      />

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Catálogo de Productos
        </h1>
        <span className="text-sm text-slate-400">{productosFiltrados.length} productos</span>
      </div>

      {productosFiltrados.length === 0 ? (
        <p className="text-slate-500">No se encontraron productos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {productosFiltrados.map((producto) => (
            <div
              key={producto.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition"
            >
              <Link href={`/productos/${producto.id}`} className="block">
                {producto.imagen_url ? (
                  <img
                    src={producto.imagen_url}
                    alt={producto.nombre}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-slate-800 flex items-center justify-center text-slate-500 text-sm">
                    Sin imagen
                  </div>
                )}
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs bg-violet-500/10 text-violet-300 px-2 py-0.5 rounded-full">
                      {producto.categorias?.nombre}
                    </span>
                    <span className="text-xs text-green-400 flex items-center gap-1">
                      ● {producto.stock} en stock
                    </span>
                  </div>
                  <h2 className="font-semibold text-white">{producto.nombre}</h2>
                  {producto.marca && (
                    <p className="text-xs text-slate-500 uppercase">{producto.marca}</p>
                  )}
                  <p className="text-cyan-400 text-lg font-bold mt-1">S/ {producto.precio}</p>
                </div>
              </Link>
              <div className="px-4 pb-4">
                <BotonAgregar producto={producto} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}