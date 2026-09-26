import FilaPapelera from './FilaPapelera'

export default function Papelera({ productos }) {
  if (productos.length === 0) {
    return <p className="text-gray-500">La papelera está vacía.</p>
  }

  const productosVisibles = productos.slice(0, 10)

  return (
    <div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b font-semibold text-sm">
            <th className="py-2 pr-4">Producto</th>
            <th className="py-2 pr-4">Precio</th>
            <th className="py-2 pr-4"></th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {productosVisibles.map((producto) => (
            <FilaPapelera key={producto.id} producto={producto} />
          ))}
        </tbody>
      </table>

      {productos.length > 10 && (
        <p className="text-sm text-gray-500 mt-3">
          Mostrando 10 de {productos.length} productos ocultos.
        </p>
      )}
    </div>
  )
}