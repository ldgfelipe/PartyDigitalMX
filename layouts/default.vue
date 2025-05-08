<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon style="color:#ff6666;"  >{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="color:#ff6666;" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="user.email" to="/dashboard">
            <v-list-item-action>
              <v-icon style="color:#ff6666;"  >mdi-tablet-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content style="color:#ff6666;" >
              Dashboard
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      v-if="$route.name!=='invitacion-uid'"
    >
    
      <v-app-bar-nav-icon  @click.stop="drawer = !drawer"  style="color:#ff6666;"     />

      <v-spacer></v-spacer>
      <v-btn style="background:#ff6666; color:white;" v-if="!is_login" class="elevation-0" @click="loginmod=true">Iniciar Sesión</v-btn>
      <v-btn class="elevation-0" v-if="!is_login" to="/registrate" >Crear Cuenta</v-btn>

      <v-btn style="background:#ff6666; color:white;" v-if="is_login" to="/perfil" ><v-icon>mdi-account</v-icon></v-btn>
      <v-btn style="background:#ff6666; color:white;" v-if="is_login" @click="cerrarSesion()" ><v-icon>mdi-logout</v-icon></v-btn>
      

    </v-app-bar>

        <v-dialog v-model="loginmod" max-width="500">
          <LoginComponent @cerrarpop="cerrarLogin"></LoginComponent>
        </v-dialog>


      <v-main>
        <nuxt />
      </v-main>

    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue'
import {mapState, mapMutations} from 'vuex'

export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      loginmod:false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Inicio',
          to: '/'
        },
        {
          icon: 'mdi-email-open-heart-outline',
          title:'Crea Invitación',
          to: '/creaInvitacion'
        }
       
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  computed:{
    ...mapState(['is_login','user','dtUser'])
  },
  mounted(){
 
  },
  methods:{
    ...mapMutations(['updateDtUser','logoutData']),
    cerrarLogin(evt){
      this.loginmod=evt
    },
    async cerrarSesion(){
        await this.$fireModule.auth().signOut();
        this.logoutData()
        this.$router.push('/')
       } 
  },
  components:{
    LoginComponent
  }
}
</script>
