async function cargarOfertas() {
  try {
    const respuesta = await fetch('../data/productos.json')

    const ofertasPorMes = await respuesta.json()

    renderOfertasPorMes(ofertasPorMes)
  } catch (error) {
    console.error('Error al cargar ofertas:', error)
  }
}

function renderOfertasPorMes(ofertasPorMes) {
  const contenedorMeses = document.getElementById('contenedor-meses')

  contenedorMeses.innerHTML = ''

  for (const mes in ofertasPorMes) {
    const cardMes = document.createElement('div')
    cardMes.classList.add('card-mes')

    const tituloMes = document.createElement('h2')
    tituloMes.textContent = `Ofertas ${mes}`
    cardMes.appendChild(tituloMes)

    const contenedorOfertas = document.createElement('div')
    contenedorOfertas.classList.add('productos')
    contenedorOfertas.style.display = 'none'

    ofertasPorMes[mes].forEach((oferta) => {
      const tarjeta = document.createElement('article')

      tarjeta.classList.add('producto')

      tarjeta.innerHTML = `
        <img src="${oferta.imagen}" alt="${oferta.nombre}">
        <h3>${oferta.nombre}</h3>
        <p class="promo">${oferta.promo}</p>
        <p class="precio">$${oferta.precio}</p>
        <p class="lugares">${oferta.lugares} lugares disponibles</p>
        <button class="btn-descripcion">
          Ver descripción
        </button>
      `

      const botonDescripcion = tarjeta.querySelector('.btn-descripcion')

      botonDescripcion.addEventListener('click', () => {
        const existente = tarjeta.querySelector('.descripcion')

        if (existente) {
          existente.remove()
        } else {
          const descripcion = document.createElement('p')

          descripcion.textContent = oferta.descripcion

          descripcion.classList.add('descripcion')

          tarjeta.appendChild(descripcion)
        }
      })

      const botonCarrito = document.createElement('button')

      botonCarrito.textContent = 'Agregar al carrito'

      botonCarrito.classList.add('agregar-carrito')

      botonCarrito.dataset.id = oferta.nombre

      botonCarrito.dataset.nombre = oferta.nombre

      botonCarrito.dataset.precio = oferta.precio

      botonCarrito.dataset.imagen = oferta.imagen

      tarjeta.appendChild(botonCarrito)

      contenedorOfertas.appendChild(tarjeta)
    })

    cardMes.appendChild(contenedorOfertas)

    tituloMes.addEventListener('click', () => {
      contenedorOfertas.style.display =
        contenedorOfertas.style.display === 'none' ? 'flex' : 'none'
    })

    contenedorMeses.appendChild(cardMes)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-nacionales').addEventListener('click', () => {
    const contenedor = document.getElementById('contenedor-meses')

    if (contenedor.innerHTML === '') {
      cargarOfertas()
    } else {
      contenedor.innerHTML = ''
    }
  })
})
