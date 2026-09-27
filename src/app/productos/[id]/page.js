import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import BotonAgregar from '@/components/BotonAgregar'

export default async function DetalleProducto({ params }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: producto } = await supabase
    .from('productos')
    .select('*, categorias(nombre)')
    .eq('id', id)
    .single()

  if (!producto) {
    return <p className="p-6 text-slate-400">Producto no encontrado.</p>
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <Link href="/" className="text-cyan-400 text-sm">← Volver al catálogo</Link>

      <div className="grid md:grid-cols-2 gap-8 mt-4">
        {producto.imagen_url ? (
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            className="w-full h-80 object-cover rounded-xl"
          />
        ) : (
          <div className="w-full h-80 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-500">
            Sin imagen
          </div>
        )}

        <div>
          <span className="text-xs bg-violet-500/10 text-violet-300 px-2 py-0.5 rounded-full">
            {producto.categorias?.nombre}
          </span>
          <h1 className="text-2xl font-bold text-white mt-2">{producto.nombre}</h1>
          {producto.marca && <p className="text-slate-500 text-sm">{producto.marca}</p>}
          <p className="text-cyan-400 text-3xl font-bold mt-3">S/ {producto.precio}</p>

          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 mt-3 text-sm text-green-400">
            ● {producto.stock} unidades en stock
          </div>

          {producto.descripcion && (
            <>
              <hr className="border-slate-800 my-4" />
              <p className="text-xs text-slate-500 uppercase mb-1">Descripción</p>
              <p className="text-slate-300">{producto.descripcion}</p>
            </>
          )}

          <div className="mt-6">
            <BotonAgregar producto={producto} />
          </div>
        </div>
      </div>
    </main>
  )
}