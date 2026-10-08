'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function FormularioProducto({ categorias }) {
  const router = useRouter()
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [marca, setMarca] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [imagenArchivo, setImagenArchivo] = useState(null)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')

  async function agregarProducto(e) {
    e.preventDefault()
    setError('')

    if (!nombre.trim() || !precio || !stock || !categoriaId) {
      setError('Completa nombre, precio, stock y categoría.')
      return
    }

    // NUEVO: no permitir negativos
    if (Number(precio) < 0 || Number(stock) < 0) {
      setError('El precio y el stock no pueden ser negativos.')
      return
    }

    setGuardando(true)
    const supabase = createClient()

    let imagenUrlFinal = null

    if (imagenArchivo) {
      const nombreArchivo = `${Date.now()}-${imagenArchivo.name}`
      const { error: errorSubida } = await supabase.storage.from('productos').upload(nombreArchivo, imagenArchivo)

      if (errorSubida) {
        setError('No se pudo subir la imagen.')
        setGuardando(false)
        return
      }

      const { data: urlData } = supabase.storage.from('productos').getPublicUrl(nombreArchivo)
      imagenUrlFinal = urlData.publicUrl
    }

    const { error: errorInsert } = await supabase.from('productos').insert({
      nombre,
      precio: Number(precio),
      stock: Number(stock),
      categoria_id: Number(categoriaId),
      marca: marca || null,
      descripcion: descripcion || null,
      imagen_url: imagenUrlFinal,
    })

    setGuardando(false)

    if (errorInsert) {
      setError('No se pudo agregar el producto. Intenta de nuevo.')
      return
    }

    setNombre(''); setPrecio(''); setStock(''); setCategoriaId('')
    setMarca(''); setDescripcion(''); setImagenArchivo(null)
    router.refresh()
  }

  const campo = "w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white mt-1"
  const etiqueta = "text-sm text-cyan-400"

  return (
    <form onSubmit={agregarProducto} className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={etiqueta}>Nombre del producto *</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className={campo} />
        </div>
        <div>
          <label className={etiqueta}>Marca</label>
          <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} className={campo} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={etiqueta}>Precio USD *</label>
          {/* NUEVO: min="0" */}
          <input type="number" step="0.01" min="0" value={precio} onChange={(e) => setPrecio(e.target.value)} className={campo} />
        </div>
        <div>
          <label className={etiqueta}>Stock *</label>
          {/* NUEVO: min="0" */}
          <input type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} className={campo} />
        </div>
      </div>

      <div>
        <label className={etiqueta}>Categoría *</label>
        <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} className={campo}>
          <option value="">Selecciona una categoría</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={etiqueta}>Descripción</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className={campo} rows={3} />
      </div>

      <div>
        <label className={etiqueta}>Foto del producto</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagenArchivo(e.target.files[0])}
          className={campo}
        />
      </div>

      {error && <p className="text-rose-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={guardando}
        className="bg-cyan-500 text-slate-950 rounded-lg px-5 py-2.5 font-semibold disabled:opacity-50"
      >
        {guardando ? 'Agregando...' : '+ Agregar producto'}
      </button>
    </form>
  )
}