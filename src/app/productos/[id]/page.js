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
    return <p className="p-6">Producto no encontrado.</p>
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      {producto.imagen_url && (
        <img
          src={producto.imagen_url}
          alt={producto.nombre}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <p className="text-xs text-gray-500 uppercase">
        {producto.categorias?.nombre}
      </p>
      <h1 className="text-2xl font-bold mb-1">{producto.nombre}</h1>
      {producto.marca && <p className="text-sm text-gray-500 mb-2">Marca: {producto.marca}</p>}
      <p className="text-xl text-gray-800 mb-1">S/ {producto.precio}</p>
      <p className="text-sm text-gray-500 mb-4">Stock: {producto.stock}</p>
      {producto.descripcion && <p className="text-gray-700 mb-4">{producto.descripcion}</p>}
      <BotonAgregar producto={producto} />
    </main>
  )
}