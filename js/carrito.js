document.addEventListener('DOMContentLoaded', () => {
  // Inicializar carrito al cargar
  cargarCarrito()
  actualizarContador()
  actualizarTotal()

  // Botón de vaciar carrito (solo existe en carrito.html)
  const vaciarBtn = document.getElementById('vaciar-carrito')
  if (vaciarBtn) {
    vaciarBtn.addEventListener('click', () => {
      localStorage.removeItem('carrito')
      cargarCarrito()
      actualizarContador()
      actualizarTotal()
    })
  }
})

// --- Delegación de eventos para botones dinámicos ---
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('agregar-carrito')) {
    agregarProducto(e)
  }
})

// --- Función para cargar carrito ---
function cargarCarrito() {
  const lista = document.getElementById('lista-carrito')
  if (!lista) return // si no existe el contenedor, no hace nada

  lista.innerHTML = ''
  const carrito = JSON.parse(localStorage.getItem('carrito')) || []

  carrito.forEach((p, index) => {
    const li = document.createElement('li')
    li.textContent = `${p.nombre} - $${p.precio}`

    // Botón eliminar individual
    const btnEliminar = document.createElement('button')
    btnEliminar.textContent = 'Eliminar'
    btnEliminar.addEventListener('click', () => {
      carrito.splice(index, 1)
      localStorage.setItem('carrito', JSON.stringify(carrito))
      cargarCarrito()
      actualizarContador()
      actualizarTotal()
    })

    li.appendChild(btnEliminar)
    lista.appendChild(li)
  })
}

// --- Función para agregar producto ---
function agregarProducto(e) {
  const producto = {
    id: e.target.dataset.id,
    nombre: e.target.dataset.nombre,
    precio: e.target.dataset.precio,
    imagen: e.target.dataset.imagen, // opcional
  }

  let carrito = JSON.parse(localStorage.getItem('carrito')) || []
  carrito.push(producto)
  localStorage.setItem('carrito', JSON.stringify(carrito))

  alert('Producto agregado al carrito correctamente')

  cargarCarrito()
  actualizarContador()
  actualizarTotal()
}

// --- Función para actualizar contador ---
function actualizarContador() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || []

  const contadorIndex = document.getElementById('contador-index')
  if (contadorIndex) contadorIndex.textContent = carrito.length

  const contadorCarrito = document.getElementById('contador-carrito')
  if (contadorCarrito) contadorCarrito.textContent = carrito.length
}

function actualizarTotal() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || []

  const total = carrito.reduce((acumulador, producto) => {
    return acumulador + Number(producto.precio)
  }, 0)

  const totalElemento = document.getElementById('total-carrito')

  if (totalElemento) {
    totalElemento.textContent = total.toFixed(2)
  }
}
