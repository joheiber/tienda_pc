import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data: categorias } = await supabase.from('categorias').select()

  return (
    <main>
      <h1>Categorías</h1>
      <ul>
        {categorias?.map((categoria) => (
          <li key={categoria.id}>{categoria.nombre}</li>
        ))}
      </ul>
    </main>
  )
}