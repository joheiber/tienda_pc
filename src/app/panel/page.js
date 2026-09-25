import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import BotonCerrarSesion from '@/components/panel/BotonCerrarSesion'
import PanelTabs from '@/components/panel/PanelTabs'

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

  const { data: cotizaciones } = await supabase
    .from('cotizaciones')
    .select('*, cotizacion_items(cantidad, productos(nombre, precio))')
    .order('creado_en', { ascending: false })

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Panel del dueño</h1>
          <p className="text-gray-600 text-sm">Sesión iniciada como: {user.email}</p>
        </div>
        <BotonCerrarSesion />
      </div>

      <PanelTabs productos={productos ?? []} cotizaciones={cotizaciones ?? []} />
    </main>
  )
}