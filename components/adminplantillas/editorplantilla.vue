<template>
    <v-row>
        <v-col cols="6" style=" padding:30px;">

            <div style="overflow: auto; height: 500px;">
                <v-alert color="grey" v-if="plantilla.uid">{{ plantilla.uid }}</v-alert>
                <v-file-input v-model="fondo" @change="onFileChange"></v-file-input>
                <v-label class="text-h1">Tema</v-label>
                <v-text-field v-model="plantilla.title" label="titulo de plantilla"></v-text-field>
                <v-textarea outlined v-model="plantilla.colorgral" label="Estilo de color general"></v-textarea>
                <v-row>
                    <v-col cols="10">
                        <v-select outlined v-model="fuentadd" :items="listafuentes" item-text="name"
                            item-value="url"></v-select>
                    </v-col>
                    <v-col cols="2">
                        <v-btn class="blue white--text elevation-0" @click="addfontplantilla()">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <ul>
                    <li v-for="(key, index) in fuentes" style="font-size:10px;">
                        {{ key.href }} <v-btn class="elevation-0 red white--text"
                            v-if="key.href !== 'https://fonts.googleapis.com' && key.href !== 'https://fonts.gstatic.com'"
                            @click="eliminafuente(index)"><v-icon>mdi-close</v-icon></v-btn>
                    </li>
                </ul>
                <v-btn class="blue white--text" @click="addcabecera()">Cargar Cabecera</v-btn>
                <v-btn class="red white--text" @click="LimpiarFuentes()">Limpiar Fuentes</v-btn>
                <hr /><br />
                <v-textarea outlined v-model="plantilla.tema.title" label="Titulo"></v-textarea>
                <v-textarea outlined v-model="plantilla.tema.subtitle" label="Subtitulo"></v-textarea>
                <v-textarea outlined v-model="plantilla.tema.text" label="Cuerpo de texto"></v-textarea>
                <v-textarea outlined v-model="plantilla.tema.boton" label="Boton"></v-textarea>
                <v-textarea outlined v-model="plantilla.tema.bgOpacity" label="Área de componente"></v-textarea>


                <v-select outlined v-model="plantilla.categoria" label="Seleccione la Categoría" :items="Categorias"
                    item-text="categoria" item-value="slug"></v-select>
                <v-text-field outlined v-model="plantilla.etapa" label="Seleccione la Etapa"></v-text-field>


                <v-alert color="red" class="white--text" v-if="mensajeError.length > 0">
                    <ul>
                        <li v-for="key in mensajeError">
                            {{ key }}
                        </li>
                    </ul>
                </v-alert>

                <v-btn style="background-color: #ff6666; color: white;" @click="GuardarPlantilla()">Guardar Plantilla
                    <v-icon>mdi-content-save</v-icon></v-btn>
            </div>

        </v-col>
        <v-col cols="6" style="height:500px;">


            <v-img :src="imageUrl" cover height="100%">

                <EspacioComponentes :props="plantilla.tema">
                    <testcomponent :props="plantilla.tema"></testcomponent>
                </EspacioComponentes>
            </v-img>
        </v-col>
    </v-row>
</template>
<script>
///import testcomponent from '@/components/componentes/testcomponent.vue'
import EspacioComponentes from '@/components/elementosPlantilla/espacioComponentes.vue';
import categorias from '@/schemas/categoriasSh'
export default {

    data() {
        return {
            uid: "",
            imageUrl: "",
            Categorias: categorias,
            plantilla: {},
            listafuentes: [
                {
                    name: 'Playwrite MX Guides, cursive',
                    url: 'https://fonts.googleapis.com/css2?family=Playwrite+MX+Guides&display=swap'
                },
                {
                    name: 'Bungee Tint, sans-serif',
                    url: 'https://fonts.googleapis.com/css2?family=Bungee+Tint&display=swap'
                },
                {
                    name: 'Cal Sans, sans-serif',
                    url: 'https://fonts.googleapis.com/css2?family=Cal+Sans&display=swap'
                },
                {
                    name: 'Coral Pixels, serif',
                    url: 'https://fonts.googleapis.com/css2?family=Coral+Pixels&display=swap'
                },
                {
                    name: 'Tagesschrift, system-ui',
                    url: 'https://fonts.googleapis.com/css2?family=Tagesschrift&display=swap'
                },
                {
                    name: 'Quicksand, sans-serif',
                    url: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap'
                },
                {
                    name: 'Dancing Script, cursive',
                    url: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap'
                },
                {
                    name: 'Pacifico, cursive',
                    url: 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap'
                },
                {
                    name: 'Caveat, cursive',
                    url: 'https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap'
                },
                {
                    name: 'Playwrite AU SA, cursive',
                    url: 'https://fonts.googleapis.com/css2?family=Playwrite+AU+SA:wght@100..400&display=swap'
                },
                {
                    name: 'Creepster, system-ui',
                    url: 'https://fonts.googleapis.com/css2?family=Creepster&display=swap'
                }

            ],
            fuentes: [
                {
                    rel: "preconnect",
                    href: "https://fonts.googleapis.com",
                },
                {
                    rel: "preconnect",
                    href: "https://fonts.gstatic.com"
                }
            ],
            fuentadd: "",
            mensajeError: [],
            fondo: null
        }
    },
    mounted() {
        this.plantilla.tema.importFonts = this.fuentes
    },
    methods: {
        createImage(file) {
            const reader = new FileReader();

            reader.onload = e => {
                this.imageUrl = e.target.result;

            };
            reader.readAsDataURL(file);
        },
        async onFileChange(file) {
            if (!file) {
                return;
            }
            await this.createImage(file);
        },
        eliminafuente(p) {
            console.log(p)
            this.fuentes.splice(p, 1)
        },
        addfontplantilla() {
            this.fuentes.push({
                rel: 'stylesheet',
                href: this.fuentadd
            })
            this.plantilla.tema.importFonts = this.fuentes
        },
        addcabecera() { /// carga datos de cabecera 
            if (this.plantilla.tema.importFonts) {
                this.plantilla.tema.importFonts.map((p) => {
                    var link = document.createElement('link');
                    link.href = p.href;
                    link.rel = p.rel;
                    link.className = "addertema"
                    document.head.appendChild(link);
                })

            }
        },
        
        LimpiarFuentes() {
            var remtema = document.getElementsByClassName('addertema')

            for (var i = 0; i < remtema.length + 1.; i++) {
                if (remtema[i]) {
                    remtema[i].remove()
                }
            }
        },
        validaForms() {
            this.mensajeError = []
            if (!this.plantilla.title) {
                this.mensajeError.push('Requiere ingresar el titulo de la plantilla')
            }
            if (!this.plantilla.uid && !this.plantilla.tema.urlImagen) {
                this.mensajeError.push('Requiere seleccionar la imagen de fondo')
            }
            if (!this.plantilla.tema.title) {
                this.mensajeError.push('Requiere ingresar estilo de Titulo')
            }
            if (!this.plantilla.tema.subtitle) {
                this.mensajeError.push('Requiere ingresar estilo de Subtitulo')
            }
            if (!this.plantilla.tema.text) {
                this.mensajeError.push('Requiere ingresar estilo de Cuerpo de Texto')
            }
            if (!this.plantilla.tema.bgOpacity) {
                this.mensajeError.push('Requiere ingresar estilo de Area de componente')
            }
            if (this.mensajeError.length > 0) {
                setTimeout(() => {
                    this.mensajeError = []
                }, 3000)
            }
        },
        SubeImagenYGuarda() {
            try {

                //// sube archivo a storage 
                const storageRef = this.$fire.storage.ref()
                var UploadTask = storageRef.child('imagen/' + this.fondo.name).put(this.fondo);

                UploadTask.on('state_changed', (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    /*switch (snapshot.state) {
                        case this.$fire.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case this.$fire.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }*/

                },
                    (error) => {
                        console.log(error)
                    },
                    () => {


                        UploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            this.plantilla.urlImagen = downloadURL

                            //// guarda en la base de datos la plantilla 

                            this.GuardaenBasePlantilla()
                        })
                    })

                /// guarda información de en base de datos*/


            } catch (error) {
                console.log(error)
            }
        },
        actualizaBasePlantilla() {
            console.log('actualiza base')
            this.$fireModule.firestore().collection('plantillas').doc(this.plantilla.uid).update(this.plantilla)
        },
        async GuardarPlantilla() {
            this.validaForms()

            if (!this.plantilla.uid) {
                if (this.fondo) {
                    this.SubeImagenYGuarda()
                }
            } else {
                if (this.fondo) {
                    ///elimina imagen anterior

                    /// actualiza imagen de base 
                } else {
                    ////solo actualiza datos de base 
                    this.actualizaBasePlantilla()
                }

            }
        },
        GuardaenBasePlantilla() {

            this.$fireModule.firestore().collection('plantillas').add(this.plantilla)
            this.$emit('cerrarVentana', false);

        }
    },

    components: {
        testcomponent,
        EspacioComponentes
    },
    props: ['editar'],
    watch: {
        editar: {
            immediate: true,
            handler(val, oldVal) {
                if (this.editar) {
                    this.plantilla = this.editar
                    this.fuentes = this.editar.tema.importFonts
                    this.imageUrl = this.editar.urlImagen
                }
            }
        }
    }


}
</script>