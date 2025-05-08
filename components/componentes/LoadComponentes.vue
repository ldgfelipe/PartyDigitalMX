<template>

        <EspacioComponentes :props="proptema.tema" @cargaparametros="modparams">
            <component v-if="asyncComponent" :is="asyncComponent" :props="proptema.tema" :datacomponente="datacomponente" :previewMode="modparams" />
        </EspacioComponentes>

</template>

<script>
import EspacioComponentes from '@/components/elementosPlantilla/espacioComponentes.vue';
export default {
    data() {
        return {
 
        }
    },
    computed: {
    asyncComponent() {
        console.log(this.datacomponente.path)
      return () => import(`~/components/${this.datacomponente.path}`).catch((err) => {
          console.error(`Error cargando componente ${this.name}:`, err)
          return null
        })
 
    },
  },

    props:['proptema','componentes','datacomponente','modparams'],
    components:{
        EspacioComponentes
    }
}
</script>