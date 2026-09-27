import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import CarritoPanel from './CarritoPanel'

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="border-b border-slate-800 bg-slate-950 sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="bg-cyan-500 text-slate-950 w-8 h-8 rounded-lg flex items-center justify-center font-bold">
            N
          </span>
          <span className="font-bold text-lg text-white">NexusPC</span>
        </Link>

        <div className="flex items-center gap-3">
          {user && (
            <Link
              href="/panel"
              className="text-sm text-cyan-400 border border-slate-800 rounded-lg px-3 py-1.5 hover:bg-slate-900"
            >
              Panel del dueño
            </Link>
          )}
          <CarritoPanel />
        </div>
      </div>
    </header>
  )
}