<template>
    <v-card>
        <v-card-title style="background-color: #ff6666; color:white;">
            Mis Invitaciones <v-spacer></v-spacer> <v-btn><v-icon>mdi-close</v-icon></v-btn>
         </v-card-title>
         <v-card-text>
      

           <v-row>
            <v-col cols="12" sm="3" v-for="(key,index) in Invitaciones" :key="index">
                <v-card class="elevation-6">
                    <v-card-text>
                        <v-img :src="key.plantilla.urlImagen" style="text-align: center; cursor:pointer;" @click="editarInvitacion()"   >
                            <div style="font-size: 24px; color:#ff6666; margin-top:30px;  text-shadow:1px 1px 2px red, 0 0 1em blue,0 0 0.2em blue; ">{{ key.plantilla.title }}</div>
                        </v-img>
                    </v-card-text>
                </v-card>
            </v-col>
           </v-row>

           <v-dialog v-model="editarInv">
           <v-toolbar>
                             

                             <v-btn   @click="showmenucomp===true ? showmenucomp=false : showmenucomp=true" title="Componentes" ><v-icon>mdi-package</v-icon></v-btn>
                             <v-btn title="Guardara Invitación" @click="guardarInvitacion()"><v-icon>mdi-content-save</v-icon></v-btn> 
                             <v-btn title="Previsualizar" @click="VerPrevisualizacion()"><v-icon>mdi-eye</v-icon></v-btn>

                                 
                         </v-toolbar>
                         <div v-if="showmenucomp">
                             <v-list  >
                                 <v-list-subheader>Componentes </v-list-subheader>
                                 <v-list-item v-for="(item, index) in componentes" :key="index">
                                     {{ item.nombre }} <v-checkbox v-model="item.estado"></v-checkbox>
                                     </v-list-item>
                         </v-list>
                     </div>

                         <div style="width:100%; max-width:100%; max-height:600px;  min-height:500px; height:100%; overflow: auto;">
                             <!----carga plantilla --->
                             <plantillaInvitacion :proptema="plantilla" :componentes="componentes" :mode="previewMode" />
                      
                         </div>
                         <v-alert  style="display:block; position:fixed; bottom:0px; width:100%; height:100px; overflow: auto; opacity:0.7;">
                             {{ this.dtUser }}
                         </v-alert>

                         <v-dialog v-model="previewMode" fullscreen persistent>
                             <v-card>

                                 <v-card-title>
                                     <v-toolbar class="text-center" >
                                         <v-btn @click="mediaport='100%'" ><v-icon>mdi-monitor</v-icon></v-btn> 
                                         <v-btn @click="mediaport='800px'" ><v-icon>mdi-tablet</v-icon></v-btn>
                                         <v-btn @click="mediaport='400px'" ><v-icon>mdi-cellphone</v-icon></v-btn> 
                                         <v-spacer></v-spacer>
                                         <v-btn @click="previewMode=false"><v-icon>mdi-close</v-icon></v-btn>
                                     </v-toolbar>
                                 </v-card-title>
                                 <v-card-text>
                                     <div :style="'margin:auto; width:100%; max-width:'+mediaport+'; height:600px; border:solid 10px gray; padding:0px; border-radius:30px; overflow-y:scroll;  overflow-x:hidden;'">
                                    <formatoInvitacion :data="infoInvitacion" :mode="previewMode" ></formatoInvitacion> 
                                     </div>
                                 </v-card-text>
                             </v-card>
                          
                         </v-dialog>

                        </v-dialog>
         </v-card-text>
    </v-card>

</template>
<script>
import plantillaInvitacion from '@/components/plantillaInvitacion.vue'
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
            palntilla:{}
        }
    },
    computed:{
        ...mapState(['dtUser'])
    },
    components:{
        plantillaInvitacion
    },
    created(){
        this.cargaInvitaciones()
    },
    methods:{
        async cargaInvitaciones(){
            await this.$fireModule.firestore().collection('invitaciones').where('userId','==',this.dtUser.regid).get()
            .then((querySnapshot) =>{
                querySnapshot.forEach((doc) =>{
                    this.Invitaciones.push(doc.data())
                })
            })
        },
        editarInvitacion(){


        }
    }
}

</script>