  // contains your mutations
  export const mutations = {
    updateDtUser(state,data){
        state.dtUser=data
        state.is_login=true
    },
    logoutData(state,data){
        state.dtUser = {}
        state.user  = {}
        state.is_login=false
    },
    cambiarStatusLogin(state,data){
        state.is_login=data
    },
    ON_AUTH_STATE_CHANGED_MUTATION: (state, {authUser, claims},ctx) => {
        if( authUser){
            
        // Don't do this:
        state.user = authUser
        state.is_login=true
        // Do this:
        const {uid, email, emailVerified} = authUser
        state.user = {uid, email, emailVerified}
        }else{
            state.is_login=false
        }
      },
  }