
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
  })