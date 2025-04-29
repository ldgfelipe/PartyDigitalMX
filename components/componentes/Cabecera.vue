<template>
    <v-row>
        
        <v-col cols="12" class="text-center" >
       

                    <h1 :style="props.title">Titulo1</h1>
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

     },
     props:['props']
}
</script>