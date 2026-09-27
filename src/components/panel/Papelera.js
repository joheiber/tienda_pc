import FilaPapelera from './FilaPapelera'

export default function Papelera({ productos }) {
  if (productos.length === 0) {
    return <p className="text-slate-500">La papelera está vacía.</p>
  }

  const productosVisibles = productos.slice(0, 10)

  return (
    <div>
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-800 text-xs text-slate-500 uppercase">
              <th className="py-3 px-4">Producto</th>
              <th className="py-3 px-4">Precio</th>
              <th className="py-3 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosVisibles.map((producto) => (
              <FilaPapelera key={producto.id} producto={producto} />
            ))}
          </tbody>
        </table>
      </div>

      {productos.length > 10 && (
        <p className="text-sm text-slate-500 mt-3">Mostrando 10 de {productos.length} productos ocultos.</p>
      )}
    </div>
  )
}