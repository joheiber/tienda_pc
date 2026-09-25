import FilaProducto from './FilaProducto'

export default function ListaProductos({ productos }) {
  return (
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
        {productos.map((producto) => (
          <FilaProducto key={producto.id} producto={producto} />
        ))}
      </tbody>
    </table>
  )
}