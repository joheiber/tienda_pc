import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import BotonAgregar from '@/components/BotonAgregar'

export default async function Home() {
  const supabase = await createClient()
  const { data: productos } = await supabase
    .from('productos')
    .select('*, categorias(nombre)')

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Catálogo</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {productos?.map((producto) => (
          <div key={producto.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <Link href={`/productos/${producto.id}`} className="block">
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
    </main>
  )
}