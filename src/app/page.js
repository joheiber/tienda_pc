import { createClient } from '@/lib/supabase/server'
import Buscador from '@/components/Buscador'


export default async function Home() {
  const supabase = await createClient()

  const { data: productos } = await supabase
    .from('productos')
    .select('*, categorias(nombre)')
    .eq('activo', true)

  if (error) {
    console.error(error)
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <Buscador productos={productos ?? []} />
    </main>
  )
}