document.addEventListener('DOMContentLoaded', () => {
  const boton = document.getElementById('btn-internacionales')

  boton.addEventListener('click', cargarDestinos)
})

async function cargarDestinos() {
  try {
    const respuesta = await fetch(
      'https://countries-api.davegarvey.workers.dev/countries',
    )

    const paises = await respuesta.json()

    renderDestinos(paises.slice(0, 12))
  } catch (error) {
    console.error('Error:', error)
  }
}

function renderDestinos(paises) {
  const contenedor = document.getElementById('contenedor-internacionales')

  contenedor.innerHTML = ''

  paises.forEach((pais) => {
    const precio = Math.floor(Math.random() * 500000) + 500000

    const tarjeta = document.createElement('article')

    tarjeta.classList.add('producto')

    tarjeta.innerHTML = `
    <h3>${pais.flag} ${pais.name}</h3>

    <p>
      Descubrí la cultura, gastronomía y paisajes de
      ${pais.name}.
    </p>

    <p>
      Capital: ${pais.capital}
    </p>

    <p>
      Región: ${pais.region}
    </p>

    <p class="precio">
      $${precio.toLocaleString()}
    </p>

    <button
      class="agregar-carrito"
      data-id="${pais.code}"
      data-nombre="${pais.name}"
      data-precio="${precio}"
      data-imagen=""
    >

    Reservar viaje
      
    </button>
  `

    contenedor.appendChild(tarjeta)
  })
}
