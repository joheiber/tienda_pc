'use client'

import { useState } from 'react'
import ListaProductos from './ListaProductos'
import Papelera from './Papelera'
import HistorialCotizaciones from './HistorialCotizaciones'
import FormularioProducto from './FormularioProducto'

export default function PanelTabs({ productos, cotizaciones, categorias }) {
  const [vista, setVista] = useState('productos')

  const activos = productos.filter((p) => p.activo)
  const ocultos = productos.filter((p) => !p.activo)

  const pestañas = [
    { id: 'productos', etiqueta: 'Productos' },
    { id: 'agregar', etiqueta: 'Agregar' },
    { id: 'papelera', etiqueta: `Papelera${ocultos.length > 0 ? ` (${ocultos.length})` : ''}` },
    { id: 'cotizaciones', etiqueta: 'Cotizaciones' },
  ]

  return (
    <div>
      <div className="flex gap-2 mb-6 border-b flex-wrap">
        {pestañas.map((pestaña) => (
          <button
            key={pestaña.id}
            onClick={() => setVista(pestaña.id)}
            className={`pb-2 px-1 border-b-2 ${
              vista === pestaña.id
                ? 'border-blue-600 text-blue-600 font-medium'
                : 'border-transparent text-gray-500'
            }`}
          >
            {pestaña.etiqueta}
          </button>
        ))}
      </div>

      {vista === 'productos' && <ListaProductos productos={activos} />}
      {vista === 'agregar' && <FormularioProducto categorias={categorias} />}
      {vista === 'papelera' && <Papelera productos={ocultos} />}
      {vista === 'cotizaciones' && <HistorialCotizaciones cotizaciones={cotizaciones} />}
    </div>
  )
}