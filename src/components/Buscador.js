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
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full border rounded p-2 mb-6"
      />

      {productosFiltrados.length === 0 ? (
        <p className="text-gray-500">No se encontraron productos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {productosFiltrados.map((producto) => (
            <div key={producto.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
              <Link href={`/productos/${producto.id}`} className="block">
                {producto.imagen_url && (
                  <img
                    src={producto.imagen_url}
                    alt={producto.nombre}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                <p className="text-xs text-gray-500 uppercase">
                  {producto.categorias?.nombre}
                </p>
                <h2 className="font-semibold text-lg">{producto.nombre}</h2>
                <p className="text-gray-700">S/ {producto.precio}</p>
                <p className="text-sm text-gray-500">Stock: {producto.stock}</p>
              </Link>
              <BotonAgregar producto={producto} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}