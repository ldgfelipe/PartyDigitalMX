<template>
    <v-container>
        <v-card max-width="400" class="ma-auto">
            <v-card-title style="background-color: #ff6666; color:white; text-align:center;">
                Regístrate 

            </v-card-title>
            <v-card-text class="pa-2">
                <v-text-field label="Nombre*" required v-model="fullname" outlined></v-text-field>
                <v-text-field label="Correo*" required v-model="email" outlined></v-text-field>
                <v-text-field type="password" label="Contraseña*"  required  v-model="password" outlined></v-text-field>
                <v-text-field type="password" label="Confirmar Contraseña*" required v-model="cpassword" outlined></v-text-field>
                <v-alert color="red" v-if="msgerror" >
                    {{ msgerror }}
                </v-alert>
                <v-btn style="background-color:#ff6666; color:white;" @click="registrate()">Guardar</v-btn> <v-btn
                        @click="RegistroConGoogle()" title="registrate con google"
                        style="background-color:#ff6666; color:white;"><v-icon>mdi-google</v-icon></v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
import {mapMutations} from 'vuex'
export default{
    data(){
        return {
            fullname:"",
            email:"",
            password:"",
            cpassword:"",
            msgerror:""
        }
    },
    methods:{
        ...mapMutations(['updateDtUser']),
        async registrate(){   
            if(this.password !== this.cpassword){
                this.msgerror="No coincide la contraseña y la confirmación "
               
            }else{
                try{
                await this.$fireModule.auth().createUserWithEmailAndPassword(this.email,this.password)
                .then((ms)=>{
                    var payload={
                        nombre:this.fullname,
                        email:this.email,
                        password:this.password,
                        regid:ms.user.uid,
                        lvl:0
                    }
                    this.$fireModule.firestore().collection('usuarios').add(payload)
                    this.updateDtUser(payload)
                    
                    this.$router.push('/dashboard')
                })
            }catch(error){
                console.log(error)
            }
            }
            setTimeout(()=>{
                    this.msgerror=""
                },2000)
        },
        async RegistroConGoogle(){
            
            try {
                const provider = new this.$fireModule.auth.GoogleAuthProvider()
                await this.$fire.auth.signInWithPopup(provider)
                    .then((dt) => {

                        var payload = {
                            nombre: dt.user.displayName,
                            email: dt.user.email,
                            tplog: 'google',
                            regid: dt.user.uid,
                            lvl: 0
                        }
                        this.$fireModule.firestore().collection('usuarios').add(payload)
                        this.updateDtUser(payload)

                          
                    this.$router.push('/dashboard')
                    })
                // here you can do what you want with the user data
                //this.$router.push('/') // that return from firebase
            } catch (e) {
                // handle the error
        
            }
        }
    }
}
</script>