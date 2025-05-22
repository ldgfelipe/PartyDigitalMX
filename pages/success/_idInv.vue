<template>
    <v-container>
        <v-card>
            <v-card-title>
               Estado de Pago
            </v-card-title>
            <v-card-text>
              <v-alert color="green" class="white--text" >
                 Su pago se registro correctamente su invitación quedo activa y publica
            </v-alert>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
export default{
    data(){
        return{
            idinv:this.$route.params.idInv
        }
    },
    mounted(){
       // this.actualizarInvitacion()
    },
    methods:{
        async actualizarInvitacion(){
            if(this.idinv){
                await this.$fireModule.firestore().collection('invitaciones').doc(this.idinv).get()
                .then((r)=>{
                    var payload=r.data()
                    payload.paytype='stripe'
                    payload.statuspay=true

                     this.$fireModule.firestore().collection('invitaciones').doc(this.idinv).update(payload)
                        .then((r)=>{

                        })
                })
               

            }
        }
    }

}

</script>