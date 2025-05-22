<template>
    <v-card>

        <v-card-title>
            <v-toolbar class="text-center">
                <!-----<v-btn @click="mediaport = '100%'"><v-icon>mdi-monitor</v-icon></v-btn>
                <v-btn @click="mediaport = '800px'"><v-icon>mdi-tablet</v-icon></v-btn>
                <v-btn @click="mediaport = '400px'"><v-icon>mdi-cellphone</v-icon></v-btn>--->
                <v-spacer></v-spacer>
                <v-btn @click="$emit('cerrarPreview',false)"><v-icon>mdi-close</v-icon></v-btn>
            </v-toolbar>
        </v-card-title>
        <v-card-text>

            <div
                :style="'margin:auto; width:100%; max-width:' + mediaport + '; height:600px; border:solid 10px gray; padding:0px; border-radius:30px; overflow-y:scroll;  overflow-x:hidden;'">

                <div
                    :style="'background-image:url(\'' + infoInvitacion.plantilla.urlImagen + '\'); height:auto; width:100%; max-width:100%; background-size:cover; background-attachment: fixed;'">
                    <v-row>
                        <v-col cols="12" md="12" v-for="(key, index) in infoInvitacion.componentes" :key="index"
                            v-show="key.estado">

                            <LoadComponentes :proptema="infoInvitacion.plantilla" :datacomponente="key"
                                :modparams="previewMode"></LoadComponentes>
                        </v-col>
                        <v-col cols="12" md="12">
                            <AreaFooter />
                        </v-col>
                    </v-row>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>
<script>
import AreaFooter from '@/components/elementosPlantilla/areaFooter.vue'
export default {
    data() {
        return {
            mediaport: '100%'
        }
    },
    props: ['infoInvitacion', 'previewMode'],
    components: {
        AreaFooter
    }
}
</script>