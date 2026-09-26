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
  const [imagenUrl, setImagenUrl] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')

  async function agregarProducto(e) {
    e.preventDefault()
    setError('')

    if (!nombre.trim() || !precio || !stock || !categoriaId) {
      setError('Completa nombre, precio, stock y categoría.')
      return
    }

    setGuardando(true)
    const supabase = createClient()

    const { error: errorInsert } = await supabase.from('productos').insert({
      nombre,
      precio: Number(precio),
      stock: Number(stock),
      categoria_id: Number(categoriaId),
      marca: marca || null,
      descripcion: descripcion || null,
      imagen_url: imagenUrl || null,
    })

    setGuardando(false)

    if (errorInsert) {
      setError('No se pudo agregar el producto. Intenta de nuevo.')
      return
    }

    setNombre('')
    setPrecio('')
    setStock('')
    setCategoriaId('')
    setMarca('')
    setDescripcion('')
    setImagenUrl('')
    router.refresh()
  }

  return (
    <form onSubmit={agregarProducto} className="border rounded-lg p-4 mb-8 space-y-3">
      <h3 className="font-semibold">Agregar producto nuevo</h3>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full border rounded p-2"
      />

      <div className="flex gap-3">
        <input
          type="number"
          step="0.01"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      <select
        value={categoriaId}
        onChange={(e) => setCategoriaId(e.target.value)}
        className="w-full border rounded p-2"
      >
        <option value="">Selecciona una categoría</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nombre}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Marca (opcional)"
        value={marca}
        onChange={(e) => setMarca(e.target.value)}
        className="w-full border rounded p-2"
      />

      <textarea
        placeholder="Descripción (opcional)"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="w-full border rounded p-2"
        rows={2}
      />

      <input
        type="text"
        placeholder="URL de la imagen (opcional)"
        value={imagenUrl}
        onChange={(e) => setImagenUrl(e.target.value)}
        className="w-full border rounded p-2"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={guardando}
        className="bg-blue-600 text-white rounded px-4 py-2 text-sm disabled:opacity-50"
      >
        {guardando ? 'Agregando...' : 'Agregar producto'}
      </button>
    </form>
  )
}