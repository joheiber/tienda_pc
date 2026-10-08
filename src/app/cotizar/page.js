'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCarrito } from '@/context/CarritoContext'
import { createClient } from '@/lib/supabase/client'

const NUMERO_WHATSAPP = process.env.NEXT_PUBLIC_NUMERO_WHATSAPP

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
      .insert({ cliente_nombre: nombre, cliente_telefono: telefono, total })
      .select()
      .single()

    if (errorCotizacion) {
      setError('No se pudo guardar la cotización. Intenta de nuevo.')
      setGuardando(false)
      return
    }

    const itemsParaGuardar = items.map((item) => ({
      cotizacion_id: cotizacion.id,
      producto_id: item.producto.id,
      cantidad: item.cantidad,
    }))

    const { error: errorItems } = await supabase.from('cotizacion_items').insert(itemsParaGuardar)

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
        <p className="text-slate-500">Tu cotización está vacía.</p>
        <button onClick={() => router.push('/')} className="mt-4 text-cyan-400 underline">
          Volver al catálogo
        </button>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <Link href="/" className="text-cyan-400 text-sm">← Volver</Link>
      <h1 className="text-2xl font-bold text-white mt-2 mb-6">Cotización</h1>

      <div className="grid md:grid-cols-[1fr_320px] gap-6">
        <div>
          <p className="text-xs text-slate-500 uppercase mb-3">Productos seleccionados</p>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.producto.id} className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex gap-3 items-center">
                {item.producto.imagen_url ? (
                  <img src={item.producto.imagen_url} alt={item.producto.nombre} className="w-14 h-14 object-cover rounded" />
                ) : (
                  <div className="w-14 h-14 bg-slate-800 rounded flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="text-white font-medium">{item.producto.nombre}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={() => cambiarCantidad(item.producto.id, item.cantidad - 1)} className="w-6 h-6 bg-slate-800 rounded text-white">−</button>
                    <span className="text-white text-sm">{item.cantidad}</span>
                    <button onClick={() => cambiarCantidad(item.producto.id, item.cantidad + 1)} className="w-6 h-6 bg-slate-800 rounded text-white">+</button>
                  </div>
                </div>
                <span className="text-cyan-400 font-semibold">S/ {(item.producto.precio * item.cantidad).toFixed(2)}</span>
                <button onClick={() => quitarProducto(item.producto.id)} className="text-slate-500 hover:text-rose-400">🗑</button>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 mt-3 flex justify-between items-center">
            <span className="text-slate-400">Total</span>
            <span className="text-xl font-bold text-white">S/ {total.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 h-fit">
          <p className="text-xs text-slate-500 uppercase mb-3">Tus datos</p>

          <label className="text-sm text-slate-400">Nombre completo</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white mb-3 mt-1"
          />

          <label className="text-sm text-slate-400">Teléfono / WhatsApp</label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white mb-3 mt-1"
          />

          {error && <p className="text-rose-400 text-sm mb-2">{error}</p>}

          <button
            onClick={enviarCotizacion}
            disabled={guardando}
            className="w-full bg-emerald-500 text-slate-950 rounded-lg py-2.5 font-semibold disabled:opacity-50"
          >
            {guardando ? 'Guardando...' : '💬 Enviar por WhatsApp'}
          </button>
          <p className="text-xs text-slate-500 mt-2 text-center">
            Se abrirá WhatsApp con tu cotización lista para enviar.
          </p>
        </div>
      </div>
    </main>
  )
}