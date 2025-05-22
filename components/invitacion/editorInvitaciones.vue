<template>
    <v-card>
        <v-card-title style="background-color:#ff6666;" class="pa-4 white--text">

            <span :class="'text-' + colortxt">Categoría: {{ plantilla.categoria }} Tema: {{ plantilla.title }}</span>
            <v-spacer></v-spacer>

            <v-btn @click="$emit('cierraeditor', false)" class="elevation-0 white--text"
                color="#ff6666"><v-icon>mdi-close</v-icon></v-btn>

        </v-card-title>
        <v-card-text class="pa-0 ma-0">
            <v-toolbar>


                <v-btn style="background-color:#ff6666; color:white;"
                    @click="showmenucomp === true ? showmenucomp = false : showmenucomp = true"
                    title="Componentes"><v-icon>mdi-package</v-icon></v-btn>
                <v-btn style="background-color:#ff6666; color:white;" title="Guardara Invitación"
                    @click="guardarInvitacion()"><v-icon>mdi-content-save</v-icon></v-btn>
                <v-btn style="background-color:#ff6666; color:white;" title="Previsualizar"
                    @click="VerPrevisualizacion()"><v-icon>mdi-eye</v-icon></v-btn>
                <v-btn style="background-color:#ff6666; color:white;" title="Configuración de Invitación"
                    @click="VerConfiguracion()"><v-icon>mdi-cog</v-icon></v-btn>
                <v-spacer></v-spacer>
             <v-chip style="background-color: #ff6666; color:white;">{{infoInvitacion.plan==='basico' ?  'Plan Básico' : 'Plan Premium'}}</v-chip>
                <v-btn v-if="!infoInvitacion.idpago" class="elevation-0" @click="showprice = true">Seleccione el plan</v-btn>
                <v-spacer></v-spacer>

                <div v-if="!this.infoInvitacion.statuspay">
                    <v-btn v-if="this.infoInvitacion.uid" @click="PublicarInvitacion()">Publica Ahora</v-btn>
                </div>
                <div v-if="this.infoInvitacion.statuspay && this.infoInvitacion.statuspay === true">
                    <v-btn style="background-color:#ff6666; color:white;" @click="verEstadistias()"
                        title="Ver Estadisticas y Datos de la Invitación"><v-icon>mdi-chart-box-multiple</v-icon></v-btn>
                    <v-chip color="green" class="white--text"> Invitación Publicada</v-chip>
                </div>
            </v-toolbar>

            <div v-if="showmenucomp">
                <v-list>
                    Componentes
                    <v-list-item v-for="(item, index) in componentes" :key="index">
                        {{ item.nombre }} <v-checkbox v-model="item.estado"></v-checkbox>
                    </v-list-item>
                </v-list>
            </div>

            <div style="width:100%; max-width:100%; max-height:600px;  min-height:500px; height:100%; overflow: auto;">


                <!----carga plantilla --->
                <plantillaInvitacion :proptema="plantilla" :componentes="componentes" :mode="preMode">
                </plantillaInvitacion>

            </div>
            <!----    <v-alert  style="display:block; position:fixed; bottom:0px; width:100%; height:100px; overflow: auto; opacity:0.7;">
                             
                            </v-alert>--->

            <v-dialog v-model="preMode" fullscreen persistent>
                <!----carga componente previewmode-->
                <PreviewMode :infoInvitacion="infoInvitacion" :previewMode="preMode" @cerrarPreview="preMode = false">
                </PreviewMode>
            </v-dialog>
            <v-dialog v-model="logmodreg" persistent max-width="1200px">
                <LoginModRegister @cerrarpop="loginregister" @cierraLogin="logmodreg = false"
                    @cierrapasadata="cierrapasaDatos"></LoginModRegister>
            </v-dialog>


            <v-dialog v-model="configuracion" max-width="800">
                <v-card>
                    <v-card-title style="background-color:#ff6666; color:white; ">
                        Configuración de Invitación
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field label="Nombre de Invitación"
                                        v-model="infoInvitacion.nombreInvitacion"></v-text-field>
                                    <h4 class="text-h4">Fecha del Evento</h4>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-date-picker color="#ff6666" label="Fecha del Evento"
                                        v-model="infoInvitacion.fecha" locale="es-MX"></v-date-picker>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <h4 class="text-h4">Hora del Evento</h4>
                                    <v-time-picker v-model="infoInvitacion.hora" color="#ff6666" ampm-in-title
                                        format="ampm" full-width scrollable use-seconds></v-time-picker>
                                </v-col>
                            </v-row>
                            <hr />
                            <v-alert color="red" v-if="mensajeconfig" class="white--text">{{ mensajeconfig }}</v-alert>

                            <v-btn style="background-color:#ff6666; color:white; " title="Guardara Invitación"
                                @click="guardarConfigInvitacion()"><v-icon>mdi-content-save</v-icon></v-btn>
                        </v-container>
                    </v-card-text>
                </v-card>

            </v-dialog>

            <v-dialog v-model="mensaje" persistent max-width="1200px">
                <v-card>
                    <v-card-text>
                        <v-progress-circular indeterminate :rotate="360" :size="100" :width="15" color="#ff6666"
                            v-if="!mensajealert">

                        </v-progress-circular>

                        <v-alert v-if="mensajealert" class="text-center">
                            <v-img src="logo_PD.png" style="margin:0 auto; width:100%; max-width: 150px;"></v-img>
                            <h3 class="text-h3" style="color:#ff6666;">{{ mensajealert }}</h3>
                        </v-alert>

                    </v-card-text>
                </v-card>
            </v-dialog>

            <v-dialog v-model="publicar" max-width="600">
                <MediosdePago :idinv="infoInvitacion.uid" :dominio="dominio" :plan="infoInvitacion.plan"></MediosdePago>
            </v-dialog>


            <v-dialog v-model="estad" fullscreen>
                <v-card>
                    <v-card-title style="background-color: #ff6666; color:white; ">
                        Estadisticas <v-spacer></v-spacer> <v-btn
                            @click="estad = false"><v-icon>mdi-close</v-icon></v-btn>
                    </v-card-title>
                    <v-card-text>

                        <Estadisticas :datos="infoInvitacion"></Estadisticas>
                    </v-card-text>
                </v-card>

            </v-dialog>

            <v-dialog v-model="showprice" max-width="1000">
                <v-card>
                    <v-card-title style="background-color: #ff6666; color:white;">
                        Precios de Invify
                    </v-card-title>
                    <v-card-text style="text-align: center;">

                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <h5 class="text-h5"> 🟢 Plan Básico – $299 MXN (Pago único por evento)</h5>
                                Ideal para eventos sencillos, con funciones esenciales.
                                <div style="text-align: left;">
                                    <ul>
                                        Componentes incluidos:
                                        <li>
                                            ✅ Encabezado con nombre del evento
                                        </li>
                                        <li>
                                            ✅ Fecha, hora y lugar
                                        </li>
                                        <li>
                                            ✅ Mapa con enlace a Google Maps
                                        </li>
                                        <li>
                                            ✅ Contador regresivo
                                        </li>
                                        <li>
                                            ✅ Botón de confirmación vía WhatsApp
                                        </li>
                                        <li>
                                            ✅ Imagen de portada o fondo animado
                                        </li>
                                        <li>
                                            ✅ Frase destacada o mensaje de bienvenida
                                        </li>
                                        <li>
                                            ✅ Música de fondo
                                        </li>
                                        <li>
                                            ✅ Soporte por correo electrónico
                                        </li>

                                    </ul>
                                </div>


                                <v-btn @click="selectPlan('basico')" style="background-color: #ff6666; color:white;">Seleccionar</v-btn>

                            </v-col>
                            <v-col cols="12" sm="6" md="6">


                                <h5 class="text-h5"> 🔵 Plan Premium – $599 MXN (Pago único por evento)</h5>
                                Para quienes desean una experiencia más completa y profesional.
                                <div style="text-align: left;">
                                    <ul>
                                        Componentes incluidos:
                                        <li>
                                            ✅ Encabezado con nombre del evento
                                        </li>
                                        <li>
                                            ✅ Fecha, hora y lugar
                                        </li>
                                        <li>
                                            ✅ Mapa con enlace a Google Maps
                                        </li>
                                        <li>
                                            ✅ Contador regresivo
                                        </li>
                                        <li>
                                            ✅ Botón de confirmación vía WhatsApp
                                        </li>
                                        <li>
                                            ✅ Imagen de portada o fondo animado
                                        </li>
                                        <li>
                                            ✅ Frase destacada o mensaje de bienvenida
                                        </li>
                                        <li>
                                            ✅ Música de fondo
                                        </li>
                                        <li>
                                            ✅ Soporte por correo electrónico
                                        </li>
                                        <li>

                                            ✅ Sección de galería de fotos o carrusel
                                        </li>
                                        <li>
                                            ✅ Itinerario del evento (agenda)
                                        </li>
                                        <li>
                                            ✅ Formulario de confirmación con campos personalizados
                                        </li>
                                        <li>
                                            ✅ Registro de asistentes en base de datos
                                        </li>
                                        <li>
                                            ✅ Generación de códigos QR únicos por invitado
                                        </li>
                                        <li>
                                            ✅ Validación de acceso mediante escaneo del QR
                                        </li>
                                        <li>
                                            ✅ Lista de regalos o enlace a mesa de regalos
                                        </li>
                                        <li>
                                            ✅ Asignación de mesas
                                        </li>
                                        <li>
                                            ✅ Reproductor de video (mensaje o invitación especial)
                                        </li>
                                        <li>
                                            ✅ Módulo de agradecimiento o despedida
                                        </li>
                                        <li>
                                            ✅ URL amigable personalizada (ej: app.com/invitacion/boda-luis-y-maria)
                                        </li>
                                        <li>
                                            ✅ Soporte prioritario (chat + correo)
                                        </li>
                                    </ul>
                                </div>


 <v-btn @click="selectPlan('premium')" style="background-color: #ff6666; color:white;">Seleccionar</v-btn>


                            </v-col>
                        </v-row>

                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-card-text>
    </v-card>
</template>
<script>
import Estadisticas from '@/components/invitacion/estadisticas.vue'
import MediosdePago from '@/components/invitacion/MediosdePago.vue'
import PreviewMode from '@/components/invitacion/previewMode.vue';
import plantillaInvitacion from '@/components/plantillaInvitacion.vue';
import LoginModRegister from '@/components/loginModRegister.vue'
import { mapState } from 'vuex'
export default {
    name: "EditorInvitaciones",
    data() {
        return {
            showmenucomp: false,
            colortxt: 'red',
            preMode: false,
            logmodreg: false,
            configuracion: false,
            mensaje: false,
            mensajealert: "",
            mensajeconfig: "",
            publicar: false,
            estad: false,
            showprice: false,
            dominio:""
        }
    },
    computed: {
        ...mapState(['dtUser', 'is_login']),
       
    },
    methods: {
        selectPlan(p){
            this.infoInvitacion.plan=p
            this.showprice=false
        },
        verEstadistias() {
            this.estad = true
        },
        PublicarInvitacion() {

            this.publicar = true
        },
        VerPrevisualizacion() {
            if (this.infoInvitacion.uid) {
                window.open('/invitacion/' + this.infoInvitacion.uid, '_blank');
            } else {
                this.preMode = true
                this.componentes.map((e) => {
                    e.edit = false
                })
            }
        },
        VerConfiguracion() {
            this.configuracion = true
        },
        guardarConfigInvitacion() {

            if (this.infoInvitacion.nombreInvitacion && this.infoInvitacion.fecha && this.infoInvitacion.hora) {
                this.configuracion = false
                this.guardarInvitacion()
            } else {
                this.mensajeconfig = "Debe ingresar el nombre de la invitación y la fecha"
            }
        },
        async registraInvitacion() {


            this.mensaje = true
            if (this.infoInvitacion.uid) {

                await this.$fireModule.firestore().collection('invitaciones').doc(this.infoInvitacion.uid).update(this.infoInvitacion)
                    .then((e) => {

                        this.mensajealert = "Invitación actualizada"
                    })
            } else {

                await this.$fireModule.firestore().collection('invitaciones').add(this.infoInvitacion)
                    .then((res) => {
                        this.mensajealert = "Invitación Guardada"
                        this.infoInvitacion.uid = res.id
                    })

            }


            setTimeout(() => {
                this.mensajealert = ""
                this.mensaje = false
            }, 3000)

        },
        guardarInvitacion() {

            if (!this.infoInvitacion.nombreInvitacion) {
                this.configuracion = true
            } else {

                if (!this.is_login) {
                    this.logmodreg = true
                } else {
                    this.infoInvitacion.userId = this.dtUser.regid
                    this.registraInvitacion()
                }
            }
        },
        cierrapasaDatos(evt) {
            this.infoInvitacion.userId = evt.regid
            this.registraInvitacion()
            this.logmodreg = false
        },
        loginregister(evt) {
            this.logmodreg = false
            this.registraInvitacion()
        }
    },
    created(){
        var port=window.location.hostname==='localhost' ? ':8000' : '';
        this.dominio = window.location.protocol+'//'+window.location.hostname+port;
        console.log(this.dominio)
    },
    props: ['plantilla', 'componentes', 'infoInvitacion'],
    components: {
        PreviewMode,
        plantillaInvitacion,
        LoginModRegister,
        MediosdePago,
        Estadisticas
    }

}
</script>