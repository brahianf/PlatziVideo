
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
  // let terrorList;
  // getData('https://yts.mx/api/v2/list_movies.json?genre=terror')
  //   .then(function(data){
  //     console.log(data)
  //     terrorList = data
  //   })
  console.log(actionList,dramaList,animationList)
  // Codigo asincrono que se lee de una manera sincrona

  // Selector de clase con Jquery, $home para entender que es un elemento del DOM y no data, objetos
  const $home=$('.home .list #item')

})()

// load()