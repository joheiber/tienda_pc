export default function HistorialCotizaciones({ cotizaciones }) {
  if (cotizaciones.length === 0) {
    return <p className="text-slate-500">Todavía no hay cotizaciones.</p>
  }

  return (
    <div className="space-y-3">
      {cotizaciones.map((cotizacion) => (
        <div key={cotizacion.id} className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between text-sm text-slate-500 mb-2">
            <span>{new Date(cotizacion.creado_en).toLocaleString('es-PE')}</span>
            <span className="font-semibold text-white">Total: S/ {cotizacion.total}</span>
          </div>
          <p className="font-medium text-white">
            {cotizacion.cliente_nombre} — {cotizacion.cliente_telefono}
          </p>
          <ul className="mt-2 text-sm text-slate-400 list-disc list-inside">
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