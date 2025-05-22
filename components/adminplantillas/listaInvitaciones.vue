<template>
    <v-card>
        <v-card-title style="background-color: #ff6666; color:white;">
            Mis Invitaciones <v-spacer></v-spacer> <v-btn @click="$emit('cerrarventana',false)"><v-icon>mdi-close</v-icon></v-btn>
         </v-card-title>
         <v-card-text>
      

           <v-row>
            <v-col cols="12" sm="3" v-for="(key,index) in Invitaciones" :key="index"  @click="editarInvitacion(key)">
                <v-card class="elevation-6">
                    <v-card-text>
                 
                        <v-img :src="key.plantilla.urlImagen" style="text-align: center; cursor:pointer;"  >
                            <div   style="font-size: 24px; color:#ff6666; margin-top:30px;  text-shadow:1px 1px 2px red, 0 0 1em blue,0 0 0.2em blue; ">{{ key.nombreInvitacion }}
                                <br />

                                <v-chip  v-if="key.statuspay" color="green" class="white--text">
                                    Publicado
                                </v-chip>
                                <v-chip  v-if="!key.statuspay" color="red" class="white--text">
                                    Pendiente
                                </v-chip>
                            </div>
                        </v-img>
                    </v-card-text>
                </v-card>
            </v-col>
           </v-row>

           <v-dialog v-model="editarInv" fullscreen >
           
            <EditorInvitaciones v-if="invSelect" :plantilla="invSelect.plantilla" :componentes="invSelect.componentes" :infoInvitacion="invSelect" @cierraeditor="editarInv=false"></EditorInvitaciones>
                        </v-dialog>
         </v-card-text>
    </v-card>

</template>
<script>
import FormatoInvitacion from '@/components/invitacion/formatoInvitacion.vue';
import plantillaInvitacion from '@/components/plantillaInvitacion.vue';
import EditorInvitaciones from '@/components/invitacion/editorInvitaciones.vue';
import  componentes  from '@/schemas/componentes'
import {mapState} from 'vuex';
export default {
    
    data(){
        return {
            Invitaciones:[],
            editarInv:false, 
            previewMode:false,
            mediaport:'100%',
            componentes:componentes,
            showmenucomp:false,
            palntilla:{},
            invSelect:{}
        }
    },
    computed:{
        ...mapState(['dtUser'])
    },
    components:{
        plantillaInvitacion,
        FormatoInvitacion,
        EditorInvitaciones
    },
    created(){
        this.cargaInvitaciones()
    },
    methods:{
        async cargaInvitaciones(){
            await this.$fireModule.firestore().collection('invitaciones').where('userId','==',this.dtUser.regid).get()
            .then((querySnapshot) =>{
                querySnapshot.forEach((doc) =>{
                    let payload=doc.data()
                    payload.uid=doc.id
                    this.Invitaciones.push(payload)
                })
            })
        },
        editarInvitacion(p){
            this.editarInv=true
            this.invSelect=p
        }
    }
}

</script>