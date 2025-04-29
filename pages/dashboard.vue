<template>
    <v-card>
        <v-card-title>
       Bienvenido  {{ dtUser.nombre }}
    </v-card-title>
    <v-card-text>
        <v-row>
            <v-col cols="12" md="4">
Mis invitaciones
            </v-col>
            <v-col cols="12" md="4">
Pagos realizados
            </v-col>
            <v-col cols="12" md="4">
<listadoplantillas v-if="dtUser.lvl===2720" ></listadoplantillas>

            </v-col>
        </v-row>


    </v-card-text>
    </v-card>
</template>
<script>
import listadoplantillas
 from '~/components/adminplantillas/listadoplantillas.vue'
import {mapState} from 'vuex'

export default {
    data(){
        return {

        }
    },
    computed:{
        ...mapState(['user','dtUser'])

    },
    mounted(){
        if(!this.user.email){
            this.$router.push('/')
        }
    },
    components:{
        listadoplantillas
    }
}
</script>