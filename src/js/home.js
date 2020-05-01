
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
  
  const actionList= await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
  const dramaList= await getData('https://yts.mx/api/v2/list_movies.json?genre=drama')
  const animationList= await getData('https://yts.mx/api/v2/list_movies.json?genre=animation')
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

  const $actionContainer = document.querySelector('#action')
  const $dramaContainer = document.querySelector('#drama')
  const $animationContainer = document.querySelector('#animation')
  const $featuringContainer = document.getElementById('#featuring')
  const $form = document.getElementById('#form')
  const $home = document.getElementById('#home')

  const $modal = document.getElementById('modal')
  const $overlay = document.getElementById('overlay')
  const $hideModal = document.getElementById('hide-modal')

  // Utilizar variable $modal ya rastreada para buscar #modal img
  const $modalTitle = $modal.querySelector('h1')
  const $modalImage = $modal.querySelector('img')
  const $modalDescription = $modal.querySelector('p')
  
  function videoItemtemplate(movie) {
    return (
      `<div class="primaryPlaylist">
            <div class="primaryPlaylist-list" id="animation">
              <img src="${movie.medium_cover_image}" width="50" height="50" alt=""></img>
            </div>
            <h2 class="primaryPlaylist-title">${movie.title}</h2>
      </div>`
    )
  }
  // console.log(videoItemtemplate('src/images/covers/bitcoin.jpg','Bitcoin'))

  actionList.data.movies.forEach((movie) => {
 
    const HTMLString = videoItemtemplate(movie)
    // console.log(HTMLString)
    $actionContainer.innerHTML += HTMLString
  });

  dramaList.data.movies.forEach((movie) => {
    // debugger
    const HTMLString = videoItemtemplate(movie)
    // console.log(HTMLString)
    $dramaContainer.innerHTML += HTMLString;
  });

  animationList.data.movies.forEach((movie) => {
    // debugger
    const HTMLString = videoItemtemplate(movie)
    // console.log(HTMLString)
    $animationContainer.innerHTML += HTMLString;
  });


})()

// load()