<template>
    <v-container>
        <v-btn color="#ff6666" class="white--text" @click="listaplan = true">Ver plantillas</v-btn>

        <v-dialog v-model="listaplan" fullscreen persitent>
            <v-card>
                <v-card-title style="background-color: #ff6666; color: white;">
                    Listado de plantillas <v-spacer></v-spacer><v-btn class="white pink--text"
                        @click="creaNuevaPlantilla()"><v-icon>mdi-plus</v-icon></v-btn> <v-btn class="white pink--text"
                        @click="listaplan = false"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-title>
                <v-card-text>
                   <v-data-table :headers="cabecera" :items="plantillas">
                    <template v-slot:item.action="{ item }">
                        <v-btn class="yellow black--text" @click="editaplantilla(item)"><v-icon>mdi-layers-edit</v-icon></v-btn>
                    </template>


                   </v-data-table> 

                    <v-dialog v-model="addplantilla" max-width="500" fullscreen persistant>
                        
                        <v-card>
                            <v-card-title style="background-color: #ff6666; color: white;">
                                Crea Nueva Plantilla<v-spacer></v-spacer> <v-btn
                                    @click="addplantilla = false"><v-icon>mdi-close</v-icon></v-btn>
                            </v-card-title>
                            <v-card-text>
                              <!----componente editor de plantilla-->
                              <editorplantilla @cerrarVentana="cerrarVentana" :editar="plantillaselect"></editorplantilla>
                            </v-card-text>
                        </v-card>
                    
                    </v-dialog>


                </v-card-text>

            </v-card>
        </v-dialog>

    </v-container>
</template>
<script>
import editorplantilla from '@/components/adminplantillas/editorplantilla.vue';
export default {
    data() {
        return {
            listaplan: false,
            plantillas: [],
            plantillaselect:{},
            cabecera:[
            {
                    title:'UID',
                    value:'uid',
                    key:'uid'
                },
                {
                    title:'Nombre',
                    value:'title',
                    key:'title'
                },
                {
                    title:'Categoria',
                    value:'categoria',
                    key:'categoria'
                },
                {
                    title:'Acciones',
                    value:'action',
                    key:'action'
                }
            ],
            addplantilla: false
        }
    },
    mounted(){
        this.cargaPlantillas()
    },
    methods: {
        creaNuevaPlantilla(){
            this.plantillaselect={
                urlImagen: '',
                tema: {
                    title: 'font-size:36px;color:#9E6F08; font-weghit:bold; font-family:Time New Roman; font-family: "Bungee Tint", sans-serif;',
                    subtitle: 'color:#916609; font-family: "Roboto", sans-serif;font-size:24px;',
                    text: 'color:#000000;font-family:  "Playwrite MX Guides", cursive; font-size:14px;',
                    bgOpacity: 'background:rgba(240,194,204,0.8)',
                    boton: "background-color:pink; border:solid 1px purple; box-shadow:0px 0px 10px #000;",
                    importFonts: [{
                        rel: "preconnect",
                        href: "https://fonts.googleapis.com",
                    },
                    {
                        rel: "preconnect",
                        href: "https://fonts.gstatic.com"
                    },
                    ],

                },
                title: '',
                categoria: '',
                etapa: 3
            }
            this.addplantilla=true
        },
    editaplantilla(item){
        this.addplantilla=true
        this.plantillaselect=item
    },
     cerrarVentana(evt){
        this.addplantilla=evt
        this.cargaPlantillas();
     },
     cargaPlantillas(){
        this.plantillas=[]
        try{
            this.$fireModule.firestore().collection('plantillas').get()
            .then((querySnapshot)=>{
                querySnapshot.forEach((doc) => {
                    let payload={
                        uid:doc.id,
                        ...doc.data()
                    }
            this.plantillas.push(payload)
        });
            })
        }catch(error){
            console.log(error)
        }   
     }
    },
    components:{
        editorplantilla
    }
}
</script>