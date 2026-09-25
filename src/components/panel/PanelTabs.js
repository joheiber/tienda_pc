'use client'

import { useState } from 'react'
import ListaProductos from './ListaProductos'
import HistorialCotizaciones from './HistorialCotizaciones'

export default function PanelTabs({ productos, cotizaciones }) {
  const [vista, setVista] = useState('productos')

  return (
    <div>
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setVista('productos')}
          className={`pb-2 px-1 border-b-2 ${
            vista === 'productos'
              ? 'border-blue-600 text-blue-600 font-medium'
              : 'border-transparent text-gray-500'
          }`}
        >
          Productos
        </button>
        <button
          onClick={() => setVista('cotizaciones')}
          className={`pb-2 px-1 border-b-2 ${
            vista === 'cotizaciones'
              ? 'border-blue-600 text-blue-600 font-medium'
              : 'border-transparent text-gray-500'
          }`}
        >
          Cotizaciones
        </button>
      </div>

      {vista === 'productos' ? (
        <ListaProductos productos={productos} />
      ) : (
        <HistorialCotizaciones cotizaciones={cotizaciones} />
      )}
    </div>
  )
}