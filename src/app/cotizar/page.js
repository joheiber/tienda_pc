'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCarrito } from '@/context/CarritoContext'
import { createClient } from '@/lib/supabase/client'

const NUMERO_WHATSAPP = '51924534553' // reemplaza por el número real de la tienda

export default function CotizarPage() {
  const router = useRouter()
  const { items, cambiarCantidad, quitarProducto, vaciarCarrito, total } = useCarrito()

  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')

  async function enviarCotizacion() {
    setError('')

    if (items.length === 0) {
      setError('Tu cotización está vacía.')
      return
    }
    if (!nombre.trim() || !telefono.trim()) {
      setError('Completa tu nombre y teléfono.')
      return
    }

    setGuardando(true)
    const supabase = createClient()

    const { data: cotizacion, error: errorCotizacion } = await supabase
      .from('cotizaciones')
      .insert({
        cliente_nombre: nombre,
        cliente_telefono: telefono,
        total: total,
      })
      .select()
      .single()

    if (errorCotizacion) {
         console.error(errorCotizacion)
      setError('No se pudo guardar la cotización. Intenta de nuevo.')
      setGuardando(false)
      return
    }

    const itemsParaGuardar = items.map((item) => ({
      cotizacion_id: cotizacion.id,
      producto_id: item.producto.id,
      cantidad: item.cantidad,
    }))

    const { error: errorItems } = await supabase
      .from('cotizacion_items')
      .insert(itemsParaGuardar)

    if (errorItems) {
      setError('No se pudieron guardar los productos. Intenta de nuevo.')
      setGuardando(false)
      return
    }

    const lineasProductos = items
      .map((item) => `- ${item.cantidad}x ${item.producto.nombre} (S/ ${(item.producto.precio * item.cantidad).toFixed(2)})`)
      .join('\n')

    const mensaje = `Hola, soy ${nombre}. Quiero cotizar:\n\n${lineasProductos}\n\nTotal: S/ ${total.toFixed(2)}`

    const urlWhatsapp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`

    vaciarCarrito()
    window.location.href = urlWhatsapp
  }

  if (items.length === 0) {
    return (
      <main className="max-w-2xl mx-auto p-6">
        <p className="text-gray-500">Tu cotización está vacía.</p>
        <button onClick={() => router.push('/')} className="mt-4 text-blue-600 underline">
          Volver al catálogo
        </button>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Confirma tu cotización</h1>

      <div className="space-y-4 mb-6">
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
                onChange={(e) => cambiarCantidad(item.producto.id, Number(e.target.value))}
                className="w-16 border rounded p-1 text-center"
              />
              <p className="text-gray-700">
                S/ {(item.producto.precio * item.cantidad).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-xl font-bold mb-6">Total: S/ {total.toFixed(2)}</div>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          type="tel"
          placeholder="Tu teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="w-full border rounded p-2"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={enviarCotizacion}
          disabled={guardando}
          className="w-full bg-green-600 text-white rounded py-2 font-medium disabled:opacity-50"
        >
          {guardando ? 'Guardando...' : 'Enviar por WhatsApp'}
        </button>
      </div>
    </main>
  )
}