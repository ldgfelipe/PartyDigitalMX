<template>
    <v-row>
        <v-col cols="12" md="4" v-for="(key,index) in fondos">
            <v-card >
                <v-card-title>
                   {{key.title}}
                </v-card-title>
                <v-card-text>
                    <v-img  @click="$emit('continua',key)" :src="key.urlImagen" style="height:300px; cursor:pointer;"></v-img>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    </template>
    <script>
    //import  listafondos  from '@/schemas/fondosSh' //// esquema con el listado de fondos por default ya no se utiliza ahora se usa solo con base de firebase
 
   export default{
    data(){
        return {
            temaselect:"",
            fondos:[],

        }
    },

    methods:{
        async cargaFondos(){
            this.fondos=[]
            console.log('carga fondos')
            await this.$fireModule.firestore().collection('plantillas').where('categoria','==',this.categoria).get()
            .then((querySnapshot)=>{
                querySnapshot.forEach((e)=>{
                    this.fondos.push(e.data())
                })
            })
        }
    },
    props:['categoria'],
    watch: {
  categoria: {
    // the callback will be called immediately after the start of the observation
    immediate: true, 
    handler (val, oldVal) {
    this.cargaFondos()
    }
  }
}
   }



    </script>   