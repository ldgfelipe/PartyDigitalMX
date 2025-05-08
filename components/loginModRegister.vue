<template>
    <v-card>
        <v-card-title>
            Crear tu cuenta
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12" md="6">
                   <h2> Regístrate</h2><br /><br />
                    <v-text-field label="Nombre*" required v-model="fullname" outlined></v-text-field>
                <v-text-field label="Correo*" required v-model="email" outlined></v-text-field>
                <v-text-field type="password" label="Contraseña*"  required  v-model="password" outlined></v-text-field>
                <v-text-field type="password" label="Confirmar Contraseña*" required v-model="cpassword" outlined></v-text-field>
                <v-alert color="red" v-if="msgerror" >
                    {{ msgerror }}
                </v-alert>
                <v-btn style="background-color:#ff6666; color:white;" @click="registrate()">Guardar</v-btn>
                </v-col>
                <v-col cols="12" md="6">
                    <h2>   Inicia sesion</h2><br /><br />
                    <v-text-field outlined @keyup.enter="iniciarSesion()" v-model="username" label="correo"></v-text-field>
                    <v-text-field outlined  @keyup.enter="iniciarSesion()" type="password" v-model="password" label="password"></v-text-field>
                    <v-alert color="red" v-if="msgerrorlogin" class="white--text" >{{ msgerrorlogin }}</v-alert>
                    <v-btn style="background-color:#ff6666; color:white;" @click="iniciarSesion()">Iniciar Sesión</v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>

</template>
<script>
import { mapMutations } from 'vuex' 
export default{
    data(){
        return {
            msgerror:"",
            fullname:"",
            email:"",
            password:"",
            cpassword:"",
            username:"",
            msgerrorlogin:""

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
                    
                    this.$emit('cerrarpop',false)
                })
            }catch(error){
                console.log(error)
            }
            }
            setTimeout(()=>{
                    this.msgerror=""
                },2000)
        },
        async iniciarSesion(){
        try{
        await this.$fireModule.auth().signInWithEmailAndPassword(this.username,this.password)
        .then((d)=>{
           this.$fireModule.firestore().collection('usuarios').where('regid','==',d.user.uid).get()
           .then((b)=>{
            console.log(b.user)
            this.updateDtUser(b.docs[0].data())
           })

            this.$emit('cerrarpop',false)
            
        })
    }catch(error){
        console.log(error)
        this.msgerrorlogin = "Usuario o contraseña incorrectos"
        setTimeout(()=>{
            this.msgerrorlogin = ""
        },2000)
    }
        },
    }
}

</script>