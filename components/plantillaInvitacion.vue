<template>
            <div
                :style="'background-image:url(\'' + proptema.urlImagen + '\'); height:auto; width:100%; max-width:100%; background-size:cover; background-attachment: fixed;'">
                <v-row>
                 
                    <v-col cols="12" md="12" v-for="(key, index) in componentes" :key="index" v-show="key.estado">
                        <!---Cabecera---->
                        <EspacioComponentes :props="proptema.tema" @cargaparametros="modparams">
                            <component :is="key.nombre" @salidaInfo="mandainfocomponentes" :props="proptema.tema" :datacomponente="key" />
                        </EspacioComponentes>
                    </v-col>
                    <v-col cols="12" md="12" >
                        <AreaFooter  />
                    </v-col>
                </v-row>
            </div>
</template>
<script>
//// carga la plantilla donde muestra toda la información 
import Cabecera from '@/components/componentes/Cabecera.vue';
import EspacioComponentes from '@/components/elementosPlantilla/espacioComponentes.vue';
import AreaFooter from '@/components/elementosPlantilla/areaFooter.vue';

export default {
    data() {
        return {
           
            showlatel:true,
            params:{}
        }
    },
    mounted() {
        this.addcabecera()
    },
    methods: {
        modparams(evt){
            this.params[evt.component]=evt.data
            this.$emit('cargaInfoComponentes',this.params)
        },
        addcabecera() { /// carga datos de cabecera 
            if (this.proptema.tema.importFonts) {
                this.proptema.tema.importFonts.map((p) => {
                    var link = document.createElement('link');
                    link.href = p.href;
                    link.rel = p.rel;
                    link.className = "addertema"
                    document.head.appendChild(link);
                })

            }
        }
    },
    components: {
        Cabecera,
        EspacioComponentes,
        AreaFooter
    },
    props: ['proptema','componentes'],

}
</script>
