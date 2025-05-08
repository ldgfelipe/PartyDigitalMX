  // contains your actions
  export const actions = {
    async nuxtServerInit({ dispatch }, ctx) {
        console.log('inicia nuxtServerInit')
    
    },
    onAuthStateChangedAction: (ctx, {authUser, claims}) => {

        if (!authUser) {
            ctx.commit('cambiarStatusLogin',false)
        } else {
            ctx.commit('cambiarStatusLogin',true)
            console.log(ctx)
           /* app.$fireModule.firestore().collection('usuarios').where('regid','==',authUser.uid).get()
            .then((re)=>{
                console.log(re)
            })
          // Do something with the authUser and the claims object...
         // console.log(authUser)
        //  const ref =   this.$fire.firestore.collection('usuarios').where('regid','==',ctx.state.user.uid)*/
        }
      }
  }