<template>
    <div>

        <div v-if="loading" style="max-width:100%; width:100%; text-align:center;">
            
            <img src="/logo_PD.png" width="300" style="margin:5% auto;" 
aspect-ratio="16/9"
cover />
<br />

<v-progress-circular
indeterminate
      :rotate="360"
      :size="100"
      :width="15"
      color="#ff6666"
    >

    </v-progress-circular>
         
        </div>
        <div v-if="!loading">
            <v-main v-if="invitacion.statuspay" >
      <FormatoInvitacion  v-if="siexisteTema" :data="invitacion"  ></FormatoInvitacion>
                    </v-main>
                    <v-main v-if="!invitacion.statuspay" >

                        Pendiente de publicación

                    </v-main>
      </div>
        <v-dialog persistent v-model="nodisponible" max-width="500">
        <v-card>
            <v-card-title style="background-color: #ff6666; color:white; text-align: center;"  >
                Invitación No Disponible
            </v-card-title>
            <v-card-text>
                <v-main class="text-center"> 
                    Lo sentimos la invitación ya no esta disponible, si desea crear una nueva invitación por favor haga clic en el botón de crear invitación.

                    <v-btn to="/creaInvitacion" style="background-color: #ff6666; color:white;">Crear Invitación</v-btn>
                </v-main>

            </v-card-text>
        </v-card> 
        </v-dialog>    

    </div>
</template>
<script>
import FormatoInvitacion from '@/components/invitacion/formatoInvitacion.vue'

export default{
    data(){
        return {
            invitacion:{
                urlImagen:"",
                tema:[]
            },
            loading:true,
            nodisponible:false,
            siexisteTema:false

        }
    },
    components:{
        FormatoInvitacion
    },
    created(){
 
        this.cargaInvitacion()
    },
    mounted(){
   
    },
    methods:{
       async  cargaInvitacion(){
        await this.$fireModule.firestore().collection('invitaciones').doc(this.$route.params.uid).get()
        .then((res)=>{
            console.log(res)
            if(res.exists){

            this.invitacion=res.data()
            /// cambio edit a false
            this.editmodefalse()
            /// carga fuentes
            this.addcabecera()
            setTimeout(()=>{
                this.loading=false
                this.siexisteTema=true
            },2000)
        }else{
            this.loading=false
            this.nodisponible=true
    this.siexisteTema=false
        }
        this.guardaVisita()
        })
        },
        editmodefalse(){
            this.invitacion.componentes.map((e)=>{
                e.edit=false
            })
        },
        guardaVisita(){
            if(this.invitacion.visitas){
                this.invitacion.visitas=this.invitacion.visitas+1
            }else{  
                this.invitacion.visitas=1
            }
            this.$fireModule.firestore().collection('invitaciones').doc(this.$route.params.uid).set(this.invitacion)
            .then((e)=>{
                console.log(e)
                console.log('Visita registrada correctamente..')
            })
        },
        addcabecera() { /// carga datos de cabecera 

            if (this.invitacion.plantilla.tema.importFonts) {
                this.invitacion.plantilla.tema.importFonts.map((p) => {
                    var link = document.createElement('link');
                    link.href = p.href;
                    link.rel = p.rel;
                    link.className = "addertema"
                    document.head.appendChild(link);
                })

            }
        }
    }

}


</script>