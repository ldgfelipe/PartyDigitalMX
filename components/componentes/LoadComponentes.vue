<template>
        <EspacioComponentes :props="proptema.tema" >
            <component v-if="datacomponente.nombre" :is="datacomponente.nombre" :props="proptema.tema" :datacomponente="datacomponente" :previewMode="modparams" />
        </EspacioComponentes>

</template>

<script>
import EspacioComponentes from '@/components/elementosPlantilla/espacioComponentes.vue';
//  import componentMap from '~/components/map.js'
//**
// Importación de componentes
//  */
import Cabecera from '@/components/componentes/Cabecera.vue';


export default {
  name:'LoadComponentes',
    data() {
        return {
 
        }
    },
    components:{
      Cabecera
    },
    props:['proptema','datacomponente','modparams'],
    components:{
        EspacioComponentes
    }
}
</script>