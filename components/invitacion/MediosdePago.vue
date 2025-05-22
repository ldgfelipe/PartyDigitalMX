<template>
    <v-card>
        <v-card-title style="background-color:#ff6666; color:white;">
            Medios de Pago
        </v-card-title>
        <v-card-text class="text-center">

            <h4 class="text-h4">Activa tu Invitación por tan solo:</h4>
            <h6>Plan {{ plan }}</h6>
            <h3 class="text-h3">{{ plan === 'basico' ? '$299' : '$599' }} MXN</h3>

  
            <stripe-checkout ref="checkoutRef" mode="payment" :pk="publishableKey" :line-items="itemret"
                :success-url="dominio + '/success/' + idinv" :cancel-url="dominio + '/cancel/'" :clientReferenceId="idinv"
                @loading="v => loading = v" />
            <v-btn @click="checkout" style="color:white; background-color: blue;">Pago Con Stripe</v-btn>
            {{ successUrl }}



        </v-card-text>
    </v-card>
</template>
<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default {
    data() {
        this.publishableKey = process.env.STRIPE_PK;
        this.envi=process.env.ENVI;
        return {
            itemBasicoTest: [
                {
                    price: 'price_1RRTHV4GLAPy9zekGAzI4fVO',
                    quantity: 1
                },
            ],
            itemPremiumTest: [{
                price: 'price_1RRTII4GLAPy9zeksvuOVJnn',
                quantity: 1
            }
            ],
            itemBasicProd: [
                {
                    price: 'price_1RRUj2KN9JRs1tCg2uRVWrc0',
                    quantity: 1
                }
            ],
             itemPremiumProd: [
                {
                    price: 'price_1RRUjZKN9JRs1tCgBLV6jSub',
                    quantity: 1
                }
            ],
            itemret:[]



        }
    },
    computed:{
       
    },
    created() {

    },
    components: {
        StripeCheckout
    },
    methods: {
        checkout() {
            this.$refs.checkoutRef.redirectToCheckout();
        },
         modeLineItem(){
         
            if(this.envi=='development'){
               this.itemret=this.plan==='basico' ? this.itemBasicoTest : this.itemPremiumTest
            }else{
                this.itemret=this.plan==='basico' ? this.itemBasicProd : this.itemPremiumProd
            }

     
        }

    },
    props: ['idinv', 'dominio', 'plan'],

    watch:{
plan:{
     // the callback will be called immediately after the start of the observation
    immediate: true, 
    handler (val, oldVal) {
        console.log('cambia plan')
    this.modeLineItem()
    }
}
    }

}
</script>