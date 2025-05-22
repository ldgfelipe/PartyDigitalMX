<template>
    <v-row>
        
        <v-col cols="12" class="text-center" >
 
    
       <v-switch v-if="previewMode===false" v-model="datacomponente.edit" :label="datacomponente.edit ? 'Normal' : 'Editar'"></v-switch> 
   
              
                     <div v-if="!datacomponente.edit" :style="props.title">{{ datacomponente.titulo }}</div>   
                    <v-text-field v-if="datacomponente.edit" v-model="datacomponente.titulo"  label="Titulo" ></v-text-field>

                    <div v-if="!datacomponente.edit" :style="props.subtitle">{{ datacomponente.subtitulo }}</div>   
                    <v-text-field v-if="datacomponente.edit" v-model="datacomponente.subtitulo"  label="Subtitulo" ></v-text-field>

                    <p  v-if="!datacomponente.edit"  :style="props.text">
                   {{datacomponente.texto}}
                </p>
                <v-textarea  v-if="datacomponente.edit" label="Texto descripción" v-model="datacomponente.texto"></v-textarea>

                </v-col>
    </v-row>
</template>
<script>
//// componente de cabecera de plantilla muestra imagen principal de la cabecera de la plantilla

export default {
    name: 'Cabecera',
     data(){
        return {

        }
     },
     created(){
          console.log('carga componente Cabecera')

             if(!this.datacomponente.titulo || this.datacomponente.titulo ==='' ) this.datacomponente.titulo = 'Ingresa el titulo de tu evento' ;
            if(!this.datacomponente.subtitulo || this.datacomponente.subtitulo ==='' ) this.datacomponente.subtitulo = 'Subtitulo de tu evento';
            if(!this.datacomponente.texto || this.datacomponente.texto ==='' ) this.datacomponente.texto= 'Puedes ingresar un texto aplio a tu evento';
      
     },
     methods:{
       
     },
    
     props:{
        props:{},
        datacomponente:{
            titulo:{
                type:String,
                default:'datos'
            },
            subtitulo:{
                type:String,
                default:'Ingresa el subtitulo'
            },
            texto:{
                type:String,
                default:'Ingresa el texto',
            },
    },
     previewMode:false
    },
}
</script>