import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import FilaProducto from '@/components/panel/FilaProducto'
import BotonCerrarSesion from '@/components/panel/BotonCerrarSesion'

export default async function PanelPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: productos } = await supabase
    .from('productos')
    .select('*')
    .order('nombre')

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Panel del dueño</h1>
          <p className="text-gray-600 text-sm">Sesión iniciada como: {user.email}</p>
        </div>
        <BotonCerrarSesion />
      </div>

      <h2 className="text-lg font-semibold mb-3">Editar precio y stock</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b font-semibold text-sm">
            <th className="py-2 pr-4">Producto</th>
            <th className="py-2 pr-4">Precio</th>
            <th className="py-2 pr-4">Stock</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {productos?.map((producto) => (
            <FilaProducto key={producto.id} producto={producto} />
          ))}
        </tbody>
      </table>
    </main>
  )
}