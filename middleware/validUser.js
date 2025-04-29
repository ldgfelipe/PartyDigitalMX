export default function (ctx){
    console.log(ctx.store.state.user)
    if(ctx.store.state.user.email){
    ctx.$fireModule.firestore().collection('usuarios').where('regid','==',ctx.store.state.user.uid).get()
    .then((us)=>{
        ctx.store.commit('updateDtUser',us.docs[0].data())
    })
}
}