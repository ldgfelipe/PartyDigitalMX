<template>
    <v-container>

        <v-row>
            <v-col cols="12" sm="4">
                <v-card>
                    <v-card-title style="background-color: #ff6666; color:white;">
                        Visitas
                    </v-card-title>
                    <v-card-text class="text-center">
                   
                        <h3 class="text-h3">{{ datos.visitas ? datos.visitas : 0 }}</h3>
                    </v-card-text>
                </v-card>
                
            </v-col>
            <v-col cols="12" sm="6">


            </v-col>
        </v-row>

    </v-container>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props:['datos']
}
</script>