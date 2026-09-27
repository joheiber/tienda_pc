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
    { id: 'productos', etiqueta: 'Productos', icono: '▦' },
    { id: 'agregar', etiqueta: 'Agregar', icono: '+' },
    { id: 'papelera', etiqueta: `Papelera${ocultos.length > 0 ? ` (${ocultos.length})` : ''}`, icono: '🗑' },
    { id: 'cotizaciones', etiqueta: 'Cotizaciones', icono: '▤' },
  ]

  return (
    <div>
      <div className="flex gap-1 mb-6 bg-slate-900 border border-slate-800 rounded-lg p-1 flex-wrap">
        {pestañas.map((pestaña) => (
          <button
            key={pestaña.id}
            onClick={() => setVista(pestaña.id)}
            className={`px-4 py-2 rounded-md text-sm flex items-center gap-1.5 ${
              vista === pestaña.id ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            <span>{pestaña.icono}</span> {pestaña.etiqueta}
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