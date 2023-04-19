export function formatearCantidad(cantidad: string | number) {
  return new Intl.NumberFormat('es-HN', {
    style: 'currency',
    currency: 'HNL',
  }).format(Number(cantidad));
}

export function formatearFecha(fecha: number) {
  const fechaNueva = new Date(fecha);

  return fechaNueva.toLocaleDateString('es-HN', {
    day: '2-digit',
    year: 'numeric',
    month: 'long',
  });
}
