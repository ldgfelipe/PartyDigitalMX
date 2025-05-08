// components/map.js


const requireComponent = require.context(
    '.', // carpeta base (dentro de /components)
    true, // busca en subdirectorios
    /\.vue$/ // todos los archivos .vue
  )
  
  const componentMap = {}
  
  requireComponent.keys().forEach((fileName) => {
    // ejemplo: './layout/Cabecera.vue' → 'layout/Cabecera'
    const path = fileName.replace(/^\.\/(.*)\.vue$/, '$1')

    componentMap[path] = requireComponent(fileName).default
  })
  
  export default componentMap
  