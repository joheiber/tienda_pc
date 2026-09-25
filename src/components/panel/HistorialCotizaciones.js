export default function HistorialCotizaciones({ cotizaciones }) {
  if (cotizaciones.length === 0) {
    return <p className="text-gray-500">Todavía no hay cotizaciones.</p>
  }

  return (
    <div className="space-y-4">
      {cotizaciones.map((cotizacion) => (
        <div key={cotizacion.id} className="border rounded-lg p-4">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>{new Date(cotizacion.creado_en).toLocaleString('es-PE')}</span>
            <span className="font-semibold text-gray-800">
              Total: S/ {cotizacion.total}
            </span>
          </div>
          <p className="font-medium">
            {cotizacion.cliente_nombre} — {cotizacion.cliente_telefono}
          </p>
          <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
            {cotizacion.cotizacion_items.map((item, i) => (
              <li key={i}>
                {item.cantidad}x {item.productos?.nombre} (S/ {item.productos?.precio} c/u)
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}