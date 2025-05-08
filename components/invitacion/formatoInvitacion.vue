<template>
    <div :style="'background-image:url(\'' + data.plantilla.urlImagen + '\'); height:auto; width:100%; max-width:100%; background-size:cover; background-attachment: fixed; height:auto;'">
                <v-row>
          
                    <v-col cols="12" md="12" v-for="(key, index) in data.componentes" :key="'componente'+index" v-show="key.estado">
                        <!---Cabecera---->
                        <EspacioComponentes :props="data.plantilla.tema" :previewMode="mode" >
                            <component :is="key.nombre"  :props="data.plantilla.tema" :datacomponente="key" />
                        </EspacioComponentes>
                    </v-col>
                    <v-col cols="12" md="12" >
                        <AreaFooter  />
                    </v-col>
                </v-row>
            </div>
</template>
<script>
import loadImportPlantilla from '~/mixins/loadImportPlantilla_mixins.js';
export default {
    data(){
        return {

        }
    },
    mixins:[loadImportPlantilla],
    props:['data']
}
</script>