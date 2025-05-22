import colors from 'vuetify/es5/util/colors'

require('dotenv').config()
export default {
  mode: 'spa',
  server: {
    host: '0.0.0.0',
    port: 8000
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],

  },
  components: [
    {
      path: '~/components/componentes/LoadComponentes.vue'
      // Puedes especificar un componente o varios componentes
      // Ejemplo: '~/components/MyComponent.vue'
      // '~/components' representa la raíz de tu aplicación
     
      // Opcional: puedes agregar una lista de componentes globales aquí
      // Ejemplo: ['MyComponent.vue', 'AnotherComponent.vue']
    }
  ],
  /*
  ** Customize the progress-bar color
  */
loading: '~/components/LoadingBar.vue',
  /*
  ** Global CSS
  */
  css: [
  ],

  router: {
    middleware: 'validUser'
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vue-stripe.js', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
     '@nuxtjs/google-analytics'

  ],
   googleAnalytics: {
    // Options
    id: process.env.GOOGLE_ANALYTICS_ID,
  },
  
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
   
  
  ],
 
  env: {
    STRIPE_PK: process.env.NODE_ENV === 'production' ?  process.env.stripe_public_key : process.env.stripe_test_public_key,
    ENVI:process.env.NODE_ENV
  },
  firebase: {
    // options

    config: {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
      measurementId: process.env.measurementId
    },
    services: {
      auth: {
        persistence: 'local', // default
        initialize: {
          onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
          onAuthStateChangedAction: 'onAuthStateChangedAction',
          subscribeManually: false
        }
      },
      firestore:{
         enablePersistence: true,
      },
      storage:true
    } // Just as example. Can be any other service.
  },
/*
** Axios module configuration
** See https://axios.nuxtjs.org/options
*/
axios: {
},
/*
** vuetify module configuration
** https://github.com/nuxt-community/vuetify-module
*/
vuetify: {
  customVariables: ['~/assets/variables.scss', '@mdi/font/css/materialdesignicons.css'],
    icons: {
    defaultSet: 'mdi'
  },
  theme: {
    dark: false,
      themes: {
      dark: {
        primary: colors.blue.darken2,
          accent: colors.grey.darken3,
            secondary: colors.amber.darken3,
              info: colors.teal.lighten1,
                warning: colors.amber.base,
                  error: colors.deepOrange.accent4,
                    success: colors.green.accent3
      }
    }
  },

},
/*
** Build configuration
*/
build: {
  /*
  ** You can extend webpack config here
  */
  extend(config, ctx) {
    console.log('modo de '+process.env.NODE_ENV)
  }
},
ssr:false,
render: {
  bundleRenderer: {
    runInNewContext: false
  }
},
}
