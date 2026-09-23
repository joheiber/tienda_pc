import { createClient } from '@/lib/supabase/server'

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
      <p className="text-xs text-gray-500 uppercase">
        {producto.categorias?.nombre}
      </p>
      <h1 className="text-2xl font-bold mb-2">{producto.nombre}</h1>
      <p className="text-xl text-gray-800 mb-1">S/ {producto.precio}</p>
      <p className="text-sm text-gray-500">Stock: {producto.stock}</p>
    </main>
  )
}