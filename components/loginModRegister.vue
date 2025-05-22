<template>
    <v-card>
        <v-card-title style="background-color: #ff6666; color:#fff;">
            Crear tu cuenta <v-spacer></v-spacer>
            <v-btn style="background-color: #ff6666; color:#fff;" class="elevation-0"
                @click="$emit('cierraLogin', false)"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12" md="6">
                    <h2> Regístrate</h2><br /><br />
                    <v-text-field label="Nombre*" required v-model="fullname" outlined></v-text-field>
                    <v-text-field label="Correo*" required v-model="email" outlined></v-text-field>
                    <v-text-field type="password" label="Contraseña*" required v-model="password"
                        outlined></v-text-field>
                    <v-text-field type="password" label="Confirmar Contraseña*" required v-model="cpassword"
                        outlined></v-text-field>
                    <v-alert color="red" v-if="msgerror">
                        {{ msgerror }}
                    </v-alert>
                    <v-btn style="background-color:#ff6666; color:white;" @click="registrate()">Guardar</v-btn> <v-btn
                        @click="RegistroConGoogle()" title="registrate con google"
                        style="background-color:#ff6666; color:white;"><v-icon>mdi-google</v-icon></v-btn>
                </v-col>
                <v-col cols="12" md="6">
                    <h2> Inicia sesion</h2><br /><br />
                    <v-text-field outlined @keyup.enter="iniciarSesion()" v-model="username"
                        label="correo"></v-text-field>
                    <v-text-field outlined @keyup.enter="iniciarSesion()" type="password" v-model="password"
                        label="password"></v-text-field>
                    <v-alert color="red" v-if="msgerrorlogin" class="white--text">{{ msgerrorlogin }}</v-alert>
                    <v-btn style="background-color:#ff6666; color:white;" @click="iniciarSesion()">Iniciar
                        Sesión</v-btn> <v-btn @click="LoginConConGoogle()" title="Inicia sesión con google"
                        style="background-color:#ff6666; color:white;"><v-icon>mdi-google</v-icon></v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>

</template>
<script>
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            msgerror: "",
            fullname: "",
            email: "",
            password: "",
            cpassword: "",
            username: "",
            msgerrorlogin: ""

        }
    },
    methods: {
        ...mapMutations(['updateDtUser']),
        //// logion con cuenta de google
        async LoginConConGoogle() {
            try {
                const provider = new this.$fireModule.auth.GoogleAuthProvider()
                await this.$fire.auth.signInWithPopup(provider)
                    .then((d) => {
                    
                        this.$fireModule.firestore().collection('usuarios').where('regid', '==', d.user.uid).get()
                            .then((b) => {
                            
                                this.updateDtUser(b.docs[0].data())
                                this.$emit('cierrapasadata', b.docs[0].data())
                            })


                    })
            } catch (e) {
               
            }
        },
        //// registro con cuenta de google
        async RegistroConGoogle() {
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

                        this.$emit('cerrarpop', false)
                    })
                // here you can do what you want with the user data
                //this.$router.push('/') // that return from firebase
            } catch (e) {
                // handle the error
        
            }


        },

        //// registro con correo y contraseña
        async registrate() {
            if (this.password !== this.cpassword) {
                this.msgerror = "No coincide la contraseña y la confirmación "

            } else {
                try {
                    await this.$fireModule.auth().createUserWithEmailAndPassword(this.email, this.password)
                        .then((ms) => {
                            var payload = {
                                nombre: this.fullname,
                                email: this.email,
                                tplog: 'emailpass',
                                password: this.password,
                                regid: ms.user.uid,
                                lvl: 0
                            }
                            this.$fireModule.firestore().collection('usuarios').add(payload)
                            this.updateDtUser(payload)

                            this.$emit('cerrarpop', false)
                        })
                } catch (error) {
           
                }
            }
            setTimeout(() => {
                this.msgerror = ""
            }, 2000)
        },
        //// login con correo y contraseña
        async iniciarSesion() {
            try {
                await this.$fireModule.auth().signInWithEmailAndPassword(this.username, this.password)
                    .then((d) => {
               
                        this.$fireModule.firestore().collection('usuarios').where('regid', '==', d.user.id).get()
                            .then((b) => {

                                this.updateDtUser(b.docs[0].data())
                                 this.$emit('cierrapasadata', b.docs[0].data())
                            })

                 

                    })
            } catch (error) {
        
                this.msgerrorlogin = "Usuario o contraseña incorrectos"
                setTimeout(() => {
                    this.msgerrorlogin = ""
                }, 2000)
            }
        },
    }
}

</script>