'use client'

import { createContext, useContext, useState } from 'react'

const CarritoContext = createContext(null)

export function CarritoProvider({ children }) {
  const [items, setItems] = useState([])

  function agregarProducto(producto) {
    setItems((prev) => {
      const existente = prev.find((item) => item.producto.id === producto.id)
      if (existente) {
        return prev.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }
      return [...prev, { producto, cantidad: 1 }]
    })
  }

  function cambiarCantidad(productoId, cantidad) {
    setItems((prev) =>
      prev
        .map((item) =>
          item.producto.id === productoId ? { ...item, cantidad } : item
        )
        .filter((item) => item.cantidad > 0)
    )
  }

  function quitarProducto(productoId) {
    setItems((prev) => prev.filter((item) => item.producto.id !== productoId))
  }

  const total = items.reduce(
    (suma, item) => suma + item.producto.precio * item.cantidad,
    0
  )

  return (
    <CarritoContext.Provider
      value={{ items, agregarProducto, cambiarCantidad, quitarProducto, total }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  return useContext(CarritoContext)
}