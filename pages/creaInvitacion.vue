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
                        <!---carga componente editor de invitaciones--->
                        <editorInvitaciones :plantilla="plantilla" :componentes="componentes" :infoInvitacion="infoInvitacion" @cierraeditor="preview=false"></editorInvitaciones>
                    </v-dialog>


                    <v-btn @click="continuar(1)" v-if="catselect" style="background-color:#ff6666; color:white;">Cambiar
                        Categoría</v-btn>
                    <v-btn @click="continuar(2)" v-if="catselect" style="background-color:#ff6666; color:white;">Cambiar
                        Tema</v-btn>
                </v-col>
            </v-row>
           

        </div>
    </div>
</template>
<script>
import categorias from '@/schemas/categoriasSh' ///  carga esquema de categoria o puede carga desde la base de firebase 
import seleccionfondo from '@/components/seleccionfondo.vue'
import { mapState } from 'vuex'

import componentes from '@/schemas/componentes'
import editorInvitaciones from '~/components/invitacion/editorInvitaciones.vue'


export default {
    data() {
        return {
            categorias:categorias ,
            catselect: '',
            imgback: '/imgs/sinselect.jpg',
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
          
        
            
        }
    },
    computed:{
        ...mapState(['is_login','dtUser'])
    },
    components:{
        seleccionfondo,
        editorInvitaciones
    
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
      
    }
}

</script>