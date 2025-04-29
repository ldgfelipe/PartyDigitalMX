<template>
    <v-card max-width="900" class="mx-auto" v-if="props" :style='props.bgOpacity'>
        <v-card-text class="pa-3" >
            <slot></slot>
        </v-card-text>
    </v-card>
</template>
<script>
//// este es el marco donde carga el componente del listado de componentes que se utilizaran 
export default {
    data(){
        return {

        }
    },
    props:['props']
        
    
}
</script>