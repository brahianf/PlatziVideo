
// module.exports = { 
//     plugins: [ 
//         // require('autoprefixer')({ 
//             // grid:true 
//             // }), 
//         require('postcss-preset-env')({ 
// 			autoprefixer: {
//                 grid: true,
//                 // flexbox: false,
// 			}
//          }) 
//     ] 
// }

module.exports = {
    plugins: [
      // require('autoprefixer')({
      //   grid: true
      // }),
      require('postcss-import'),
      require('postcss-cssnext')({
        features: {
          autoprefixer: {
            grid: true,
            flexbox: false,
          },
          customProperties: false,
          calc: false,
        }
      })
    ]
  }