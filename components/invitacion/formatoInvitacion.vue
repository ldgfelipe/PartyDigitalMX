<template>
    <div
        :style="'background-image:url(\'' + data.plantilla.urlImagen + '\'); height:auto; width:100%; max-width:100%; background-size:cover; background-attachment: fixed;'">
        <v-row>
            <v-col cols="12" md="12" v-for="(key, index) in data.componentes" :key="index" v-show="key.estado">
         
                <LoadComponentes  :proptema="data.plantilla"  :datacomponente="key"  :modparams="mode" ></LoadComponentes>
            </v-col>
            <v-col cols="12" md="12" >
                <AreaFooter  />
            </v-col>
        </v-row>
    </div>
</template>
<script>
//// carga la plantilla donde muestra toda la información 

import loadImportPlantilla from '~/mixins/loadImportPlantilla_mixins.js';
import LoadComponentes from '@/components/componentes/LoadComponentes.vue'
import AreaFooter from '@/components/elementosPlantilla/areaFooter.vue';
export default {
data() {
return {
    showlatel:true,
    params:{},
    mode:true
}
},
mixins:[loadImportPlantilla],
mounted() {
this.addcabecera()
},
methods: {
modparams(evt){
    this.params[evt.component]=evt.data
    this.$emit('cargaInfoComponentes',this.params)
}
},
components: {
        LoadComponentes,
        AreaFooter

    },
props: ['data'],

}
</script>
