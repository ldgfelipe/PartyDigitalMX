<template>
    <v-row>
        
        <v-col cols="12" class="text-center" >
       <v-btn @click="editarcomponente()"><v-icon>mdi-pencil</v-icon></v-btn>
                   
              
               
                    <v-text-field v-model="datacomponente.titulo" :style="props.title" ></v-text-field>
                    <h2 :style="props.subtitle">Subtitulo</h2>
                    <p :style="props.text">
                    Texto descriptivo para probar la plantilla del sistema 
                </p>
                </v-col>
    </v-row>
</template>
<script>
//// componente de cabecera de plantilla muestra imagen principal de la cabecera de la plantilla

export default {
     data(){
        return {

        }
     },
     methods:{
        editarcomponente(){
            this.datacomponente.edit === true ? this.datacomponente.edit = false : this.datacomponente.edit = true
        }
     },
     props:['props','datacomponente'],
}
</script>