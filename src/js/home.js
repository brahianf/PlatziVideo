
const getUser = new Promise(function(todoBien, todoMal) {
  
  setTimeout(function(){
    todoMal('se acabo tiempo')
  }, 3000);
  
})

// getUser
//   .then (function(){
//     console.log('Bien')
//   })
//   .catch(function(messaje){
//     console.log(messaje)
//   })

Promise.all([
  getUser,
  getUser
])
.then()
.catch(function(message){
  console.log(message)
})

// Peticion Jquery
// $.ajax('https://randomuser.me/api/', {
//   method: 'GET',
//   success: function(data){
//     console.log(data)
//   },
//   error: function(error){
//     console.log(error)
//   }
  
// })

// Fetch retorna una promesa, y response.json() tambien devuelve una promesa
fetch('https://randomuser.me/api/')
  .then(function(response){
    console.log(response)
    return response.json()
  })
  // Al resolverse anterior promesa, en JSON vienen los datos del user
  .then(function(user){
    console.log('user', user.results[0].name.first)
  })
  .catch(function(){
    console.log('error')
    // punto y coma al final para terminar promesa fetch y continue con la siguiente promesa
  });

// Funcion Asincrona
// Peticiones fetch a la API de películas.
// Sin funciones asíncronas para cada fetch tendríamos que usar los métodos then y catch
// con async/await solo se escribe la palabra await antes de cada promesa.
// Se envuelve la funcion para que se autoejecute load
(async function load(){

  // action// terror // animation
  async function getData(url){
    const response = await fetch(url);
    // await para esperar a que se termine el fetch
    const data = await response.json()
    return data
  }
  const $form = document.getElementById('form')
  const $home = document.getElementById('home')
  const $featuringContainer = document.getElementById('featuring')

  function setAttribute ($element, attributes){
    for (const key in attributes){
      // $element.getAttribute(key)
      $element.setAttribute(key, attributes[key])
    }
  }

  const BASE_API = 'https://yts.mx/api/v2/'

  function featuringTemplate(peli){
    return (
      `<div class="featuring">
        <div class="featuring-image">
          <img src="${peli.medium_cover_image}" width="70">
        <div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula Encontrada</p>
          <p class="featuring-album">${peli.title}</p>
        <div>
      <div>`
    )
  }

  $form.addEventListener('submit', async (event) => {
    // debugger
    event.preventDefault()
    $home.classList.add('search-active')
    // Agregar Clases en html
    // const $loader = document.createElement('img')
    const StringHtml = ` <div class="featuring-image">
                            <img src="'src/images/loader.gif'" width="50  height="50">
                         </div>`
    $featuringContainer.innerHTML = StringHtml
    // $loader.setAttribute('src','asdads/dsa') jQuery
    // setAttributes($loader, {
    //   src: 'src/images/loader.gif',
    //   height: 50,
    //   width: 50,
    // })
    // $('sdf').attr({'src':'sadas',heigth: '50px'}) Jquery
    // $featuringContainer.append($loader)

    const data = new FormData($form)
    const {
      data: {
        movies: pelis
      }
    } = await getData(`${BASE_API}/list_movies.json?limit=1&query_term=${data.get('name')}`)
    // debugger
    const HTMLString = featuringTemplate(pelis[0]);
    $featuringContainer.innerHTML = HTMLString

  })
  
  const actionList= await getData(`${BASE_API}/list_movies.json?genre=action`)
  const dramaList= await getData(`${BASE_API}/list_movies.json?genre=drama`)
  const animationList= await getData(`${BASE_API}/list_movies.json?genre=animation`)
  // debugger para poder verificar los datos actionList.data.movies estarán las peliculas
  // let terrorList;
  // getData('https://yts.mx/api/v2/list_movies.json?genre=terror')
  //   .then(function(data){
  //     console.log(data)
  //     terrorList = data
  //   })
  // console.log(actionList,dramaList,animationList)
  // Codigo asincrono que se lee de una manera sincrona

  // Selector de clase con Jquery, $home para entender que es un elemento del DOM y no data, objetos
  // const $home=$('.home .list #item')

  function videoItemtemplate(movie) {
    return (
      `<div class="primaryPlaylist">
            <div class="primaryPlaylist-list"">
              <img src=${movie.medium_cover_image} width="50" height="50" alt=""></img>
            </div>
            <h2 class="primaryPlaylist-title">${movie.title}</h2>
      </div>`
    )
  }
   // Utilizar variable $modal ya rastreada para buscar #modal img
  
   function showModal() {
    $overlay.classList.add('active')
    $modal.style.animation = 'modalIn .8s forwards'
  }
  // showModal()
   function addEventClick($element) {
    $element.addEventListener('click', () => {
      // alert('click')
      showModal()
    })
  }
  // console.log(videoItemtemplate('src/images/covers/bitcoin.jpg','Bitcoin'))
  const $primaryPlaylist = document.getElementById('primaryPlaylist')
  function renderMovieList(list, $container){
    $container.children[0].remove()
    list.forEach((movie) => {
      const HTMLString = videoItemtemplate(movie)
      // console.log(HTMLString)
      $container.innerHTML += HTMLString
      addEventClick($primaryPlaylist);
    });
  }
  const $actionContainer = document.querySelector('#action')
  renderMovieList(actionList.data.movies, $actionContainer)
 
  const $dramaContainer = document.querySelector('#drama')
  renderMovieList(dramaList.data.movies, $dramaContainer)
  
  const $animationContainer = document.getElementById('animation');
  renderMovieList(animationList.data.movies, $animationContainer)

  const $modal = document.getElementById('modal')
  const $overlay = document.getElementById('overlay')
  const $hideModal = document.getElementById('hide-modal')

  const $modalTitle = $modal.querySelector('h1')
  const $modalImage = $modal.querySelector('img')
  const $modalDescription = $modal.querySelector('p')

  $hideModal.addEventListener('click', hideModal)
  function hideModal(){
    $overlay.classList.remove('active')
    $modal.style.animation = 'modalOut .8s forwards'
  }

})()