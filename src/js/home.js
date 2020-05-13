
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
    // debugger
    if(data.data.movie_count > 0) {
      // aquÃ­ se acaba
      return data;
    }
    // si no hay pelis aquÃ­ continua
    throw new Error('No se encontró ningún resultado');
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
                            <img src="src/images/loader.gif" width="110"  height="110">
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
    try {
      const {
        data: {
          movies: pelis
        }
      } = await getData(`${BASE_API}/list_movies.json?limit=1&query_term=${data.get('name')}`)
      // debugger
      const HTMLString = featuringTemplate(pelis[0]);
      $featuringContainer.innerHTML = HTMLString
    } catch(error){
      alert(error.message)
      $featuringContainer.innerHTML = '<span></span>'
      $home.classList.remove('search-active')
    }

  })
  
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

  function videoItemtemplate(movie, category) {
    return (
      `<div class="primaryPlaylist" id="primaryPlaylist" data-id=${movie.id} data-category=${category}>
            <div class="primaryPlaylist-list"">
              <img src=${movie.medium_cover_image} width="50" height="50" alt=""></img>
            </div>
            <h2 class="primaryPlaylist-title">${movie.title}</h2>
      </div>`
    )
  }
   // Utilizar variable $modal ya rastreada para buscar #modal img
   const $modal = document.getElementById('modal')
   const $modalTitle = $modal.querySelector('h1')
   const $modalImage = $modal.querySelector('img')
   const $modalDescription = $modal.querySelector('p')
 
  function findbyId(list, id){
    // debugger
    return list.find(movie => movie.id === parseInt(id,10));
  }

  function findMovie(id, category){
    switch(category){
      case 'action': {
        return findbyId(actionList,id)
      }
      case 'drama' : {
        return findbyId(dramaList,id)
      }
      case 'animation': {
        return findbyId(animationList,id)
      }
    }
  }

   function showModal($element) {
    $overlay.classList.add('active')
    $modal.style.animation = 'modalIn .8s forwards'
    const id = $element.dataset.id
    const category = $element.dataset.category
    const data = findMovie(id,category)
    $modalTitle.textContent = data.title
    $modalImage.setAttribute('src', data.medium_cover_image);
    $modalDescription.textContent = data.description_full
  }
  // showModal()
   function addEventClick($element) {
    $element.addEventListener('click', () => {
      // alert('click')
      showModal($element)
    })
  }
  // console.log(videoItemtemplate('src/images/covers/bitcoin.jpg','Bitcoin'))

  function renderMovieList(list, $container,category){
    $container.children[0].remove()
    list.forEach((movie) => {
      const HTMLString = videoItemtemplate(movie,category)
      // console.log(HTMLString)
      $container.innerHTML += HTMLString
      const $primaryPlaylist = document.getElementById('primaryPlaylist')
      const image = $container.querySelector('img')
      image.addEventListener('load', (event) => {
        // $image.classList.add('fadeIn')
        event.srcElement.classList.add('fadeIn')
      })
      addEventClick($primaryPlaylist);
    });
  }
  
  async function cacheExist(category){
    const listName=`${category}List`;
    const cacheList=window.localStorage.getItem('listName')
    if(cacheList){
      return JSON.parse(cacheList)
    }
    // debugger
    const {data: {movies: data}} =  await getData(`${BASE_API}/list_movies.json?genre=${category}`)
    window.localStorage.setItem(listName, JSON.stringify(data))
    return data
  }

  const actionList= await cacheExist('action');
  const $actionContainer = document.querySelector('#action')
  renderMovieList(actionList, $actionContainer,'action')
  
  const dramaList= await cacheExist('drama');
  const $dramaContainer = document.querySelector('#drama')
  renderMovieList(dramaList,$dramaContainer,'drama')

  const animationList= await cacheExist('animation');
  const $animationContainer = document.getElementById('animation');
  renderMovieList(animationList, $animationContainer,'animation')

  const $overlay = document.getElementById('overlay')
  const $hideModal = document.getElementById('hide-modal')

  $hideModal.addEventListener('click', hideModal)
  function hideModal(){
    $overlay.classList.remove('active')
    $modal.style.animation = 'modalOut .8s forwards'
  }

})()