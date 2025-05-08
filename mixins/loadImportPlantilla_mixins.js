import LoadComponentes from '@/components/componentes/LoadComponentes.vue'

import AreaFooter from '@/components/elementosPlantilla/areaFooter.vue';
export default {
    data(){
        return {

        }
    },
    methods:{
        addcabecera() { /// carga datos de cabecera 
            if (this.proptema.tema.importFonts) {
                this.proptema.tema.importFonts.map((p) => {
                    var link = document.createElement('link');
                    link.href = p.href;
                    link.rel = p.rel;
                    link.className = "addertema"
                    document.head.appendChild(link);
                })

            }
        }
    },
    components: {
        LoadComponentes,
        AreaFooter

    },
}