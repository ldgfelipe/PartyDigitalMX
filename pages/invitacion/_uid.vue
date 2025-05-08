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

      <formatoInvitacion  v-if="!loading" :data="invitacion"  ></formatoInvitacion>
    </div>
</template>
<script>
import formatoInvitacion from '@/components/invitacion/formatoInvitacion.vue'
export default{
    data(){
        return {
            invitacion:{},
            loading:true

        }
    },
    components:{
        formatoInvitacion
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
            console.log(res.data())
            this.invitacion=res.data()
            /// cambio edit a false
            this.editmodefalse()
            /// carga fuentes
            this.addcabecera()
            setTimeout(()=>{
                this.loading=false
            },2000)
          

        })
        },
        editmodefalse(){
            this.invitacion.componentes.map((e)=>{
                e.edit=false
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