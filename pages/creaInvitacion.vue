<template>

    <div :style="'background-image:url(\'' + imgback + '\'); background-size: cover; height:100%;'">
        <div style="width:100%; height:130px;"></div>
        <div class="pl-10">

            <v-row v-if="seccion === 1">
                <v-col cols="12" sm="12">
                    <span class="white--text"><b>Selecciona el tipo de invitación que deseas realizar</b></span>
                </v-col>
                <v-col cols="12" sm="12">
                    <v-chip v-for="(key, index) in categorias" color="red" @click="selecCategoria(key.slug)" :key="index"
                        :style="catselect === key.slug ? 'background-color:orange; color:white;' : 'background-color:red; color:white; '"
                        class="ma-3">{{ key.categoria }}</v-chip>
                
                </v-col>
            </v-row>

            <v-row v-if="seccion === 2">
                <v-col cols="12" sm="12" class="white--text">
                    Categoría: {{ catselect }}
                    Tema: {{ temaselected }}
                </v-col>
                <v-col cols="12" sm="12">
                    <v-btn @click="continuar(1)" v-if="catselect"
                    style="background-color:#ff6666;" class="elevation-0 ma-2 white--text"><v-icon>mdi-arrow-left</v-icon></v-btn>

                    <seleccionfondo :categoria="temaselected" @continua="contema" />
                    

                </v-col>
            </v-row>

            <v-row v-if="seccion === 3">
                <v-col cols="12" sm="12" class="text-white">
                    <v-dialog v-model="preview" fullscreen persistent>
                        <v-card>
                            <v-card-title style="background-color:#ff6666;" class="pa-4 white--text"> 
                               
                                <span :class="'text-' + colortxt">Categoría: {{ plantilla.categoria }} Tema: {{ plantilla.title }}</span>
                                <v-spacer></v-spacer>

                                <v-btn @click="cerrarpreview()" class="elevation-0 white--text" color="#ff6666"  ><v-icon>mdi-close</v-icon></v-btn>
                            </v-card-title>
                            <v-card-text class="pa-0 ma-0">
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
                                <plantillaInvitacion :proptema="plantilla"  :componentes="componentes" :mode="previewMode" />
                         
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
                                         
                                            <div
                                                :style="'background-image:url(\'' + infoInvitacion.plantilla.urlImagen + '\'); height:auto; width:100%; max-width:100%; background-size:cover; background-attachment: fixed;'">
                                                <v-row>
                                                    <v-col cols="12" md="12" v-for="(key, index) in infoInvitacion.componentes" :key="index" v-show="key.estado">
                                                
                                                        <LoadComponentes  :proptema="infoInvitacion.plantilla"  :datacomponente="key"  :modparams="previewMode" ></LoadComponentes>
                                                    </v-col>
                                                    <v-col cols="12" md="12" >
                                                        <AreaFooter  />
                                                    </v-col>
                                                </v-row>
                                            </div>
                                        </div>
                                    </v-card-text>
                                </v-card>
                             
                            </v-dialog>
                            </v-card-text>
                        </v-card>
                    </v-dialog>


                    <v-btn @click="continuar(1)" v-if="catselect" style="background-color:#ff6666; color:white;">Cambiar
                        Categoría</v-btn>
                    <v-btn @click="continuar(2)" v-if="catselect" style="background-color:#ff6666; color:white;">Cambiar
                        Tema</v-btn>
                </v-col>
            </v-row>
            <v-dialog v-model="logmodreg" persistent max-width="1200px">
                <LoginModRegister @cerrarpop="loginregister"></LoginModRegister>
            </v-dialog>

        </div>
    </div>
</template>
<script>
import categorias from '@/schemas/categoriasSh' ///  carga esquema de categoria o puede carga desde la base de firebase 
import seleccionfondo from '@/components/seleccionfondo.vue'
import plantillaInvitacion from '@/components/plantillaInvitacion.vue'
import FormatoInvitacion from '@/components/invitacion/formatoInvitacion.vue'
import { mapState } from 'vuex'
import LoginModRegister from '@/components/loginModRegister.vue'
import componentes from '@/schemas/componentes'
import AreaFooter from '@/components/elementosPlantilla/areaFooter.vue';
import LoadComponentes from '@/components/componentes/LoadComponentes.vue'
export default {
    data() {
        return {
            categorias:categorias ,
            catselect: '',
            imgback: '/imgs/sinselect.jpg',
            colortxt: 'red',
            seccion: 1,
            plantilla: {},
            temaselected: "",
            fondo: "",
            temaselected: "",
            preview: false,
            showmenucomp:false,
            componentes:componentes,
            infoInvitacion:{
               
            },
            previewMode:false,
            mediaport:'100%',
            logmodreg:false
            
        }
    },
    computed:{
        ...mapState(['is_login','dtUser'])
    },
    components:{
        seleccionfondo,
        plantillaInvitacion,
        FormatoInvitacion,
        LoginModRegister,
        AreaFooter,
        LoadComponentes
    },
    mounted(){
        setTimeout(()=>{
            this.infoInvitacion={
            plantilla:this.plantilla,
            componentes:this.componentes
        }
        },2000)
       
    },
    methods: {
        VerPrevisualizacion(){
            this.previewMode=true
            this.componentes.map((e)=>{
                e.edit=false
            })
        },
     
        selecCategoria(v) { //// toma datos del fondo 
            console.log(v)
            this.catselect = v
            this.imgback = "/imgs/" + v + ".jpg"
            this.colortxt = 'white'
            this.temaselected = v
          
            this.plantilla.temaselected = this.temaselected
            this.continuar(2)
        
        },
        continuar(p) { /// cambia seccion
            this.seccion = p
            
        },
        contema(evt) { ////pasa los datos del tema a la plantilla
            this.seccion = evt.etapa
            this.preview = true
            this.plantilla = evt
            this.infoInvitacion={
            plantilla:evt,
            componentes:this.componentes
        }
    
        },
        cerrarpreview(){/// elimina los liks de las etiquetas agregadas 
            this.preview = false
  
           var remtema= document.getElementsByClassName('addertema')
         
            for(var i=0; i<remtema.length+1.; i++ ){
                if(remtema[i]){
                remtema[i].remove()
                }
            }
  
        },
       async registraInvitacion(){
        this.infoInvitacion.userId=this.dtUser.regid
        await this.$fireModule.firestore().collection('invitaciones').add(this.infoInvitacion)
        .then((res)=>{
            console.log(res)
            alert('plantilla registrada')
        })
        },
        guardarInvitacion(){
            console.log(this.is_login)
            if(!this.is_login){
            this.logmodreg=true
            }else{
               this.registraInvitacion()
            }
        },
        loginregister(evt){
            this.logmodreg=false
            this.registraInvitacion()
        }
    }
}

</script>