import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="border-b bg-white sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-lg">
          🖥️ TiendaPC
        </Link>

        {user && (
          <Link href="/panel" className="text-sm text-blue-600 underline">
            Panel del dueño
          </Link>
        )}
      </div>
    </header>
  )
}