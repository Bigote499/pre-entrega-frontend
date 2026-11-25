document.addEventListener('DOMContentLoaded', () => {
  const contador = document.getElementById('contador-index')
  if (contador) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || []
    contador.textContent = carrito.length
  }
})
