<template>
        <EspacioComponentes :props="proptema.tema" >
            <component v-if="asyncComponent" :is="asyncComponent" :props="proptema.tema" :datacomponente="datacomponente" :previewMode="modparams" />
        </EspacioComponentes>

</template>

<script>
import EspacioComponentes from '@/components/elementosPlantilla/espacioComponentes.vue';
import componentMap from '~/components/map.js'
export default {
  name:'LoadComponentes',
    data() {
        return {
 
        }
    },
    computed: {
    asyncComponent() {
     
        console.log(this.datacomponente.path)
      const comp = componentMap[this.datacomponente.path]
      if (!comp) {
        console.warn(`Componente "${this.datacomponente.nombre}" no encontrado.`)
      }
      return comp || null
    
 
    },
  },

    props:['proptema','datacomponente','modparams'],
    components:{
        EspacioComponentes
    }
}
</script>