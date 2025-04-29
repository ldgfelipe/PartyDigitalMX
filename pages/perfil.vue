<template>
    <v-container>
        <v-card max-width="500" class="ma-auto">    
            <v-card-title style="background-color:#ff6666; color:white;">
               
            </v-card-title>
            <v-card-text>
                    <h2>Datos Generales</h2>
                <v-text-field outline v-model="fullname" label="Nombre" ></v-text-field>
                <v-text-field outline v-model="email" label="Email"   ></v-text-field>
                <v-btn style="background-color:#ff6666; color:white;" @click="guardarDatos()"><v-icon>mdi-content-save</v-icon></v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
import { mapState } from 'vuex'

export default {
    data(){
        return {
            tab:'user',
            fullname:"",
            email:""

        }
    },
    mounted(){
     if(!this.user.email){
        this.$router.push('/')
    }   

        this.email=this.dtUser.email
        this.fullname=this.dtUser.nombre

        
    },
    computed:{
        ...mapState(['user','dtUser'])
    },
    methods:{
     async guardarDatos(){
        try{
          console.log(this.$fire.firestore.collection('usuarios').where('regid','==',this.user.uid).get()
        .then((ad)=>{
            console.log(ad.docs[0].data())
        }))
           
        }catch(error){
            console.log(error)
        }
        }
    }
}
</script>