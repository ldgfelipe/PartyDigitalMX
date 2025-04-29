<template>
        <v-card>
            <v-card-title style="background:#ff6666; color:white;" class="center--text">Iniciar Sesión</v-card-title>
            <v-card-text class="pa-3">
                <v-text-field outlined @keyup.enter="iniciarSesion()" v-model="username" label="correo"></v-text-field>
                <v-text-field outlined  @keyup.enter="iniciarSesion()" type="password" v-model="password" label="password"></v-text-field>
                <v-alert color="red" v-if="msgerror" class="white--text" >{{ msgerror }}</v-alert>
                <v-btn style="background-color:#ff6666; color:white;" @click="iniciarSesion()">Iniciar Sesión</v-btn>
            </v-card-text>
        </v-card>

</template>
<script>
import { mapMutations } from 'vuex' 
export default {
    data(){
        return {
            username:"",
            password:"",
            msgerror:""
        }
    },
    methods:{
        ...mapMutations(['updateDtUser']),
       async iniciarSesion(){
        try{
        await this.$fireModule.auth().signInWithEmailAndPassword(this.username,this.password)
        .then((d)=>{
           this.$fireModule.firestore().collection('usuarios').where('regid','==',d.user.uid).get()
           .then((b)=>{
            console.log(b.user)
            this.updateDtUser(b.docs[0].data())
           })
         this.$router.push('/dashboard')
            this.$emit('cerrarpop',false)
            
        })
    }catch(error){
        console.log(error)
        this.msgerror = "Usuario o contraseña incorrectos"
        setTimeout(()=>{
            this.msgerror = ""
        },2000)
    }
        },
      
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
}
</script>
