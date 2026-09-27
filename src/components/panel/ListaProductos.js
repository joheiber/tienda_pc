import FilaProducto from './FilaProducto'

export default function ListaProductos({ productos }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-800 text-xs text-slate-500 uppercase">
            <th className="py-3 px-4">Producto</th>
            <th className="py-3 px-4">Precio (USD)</th>
            <th className="py-3 px-4">Stock</th>
            <th className="py-3 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <FilaProducto key={producto.id} producto={producto} />
          ))}
        </tbody>
      </table>
    </div>
  )
}