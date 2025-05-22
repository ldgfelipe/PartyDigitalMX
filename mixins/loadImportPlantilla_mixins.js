
export default {
    methods:{
        addcabecera() { /// carga datos de cabecera 
            var fonts = this.proptema ?  this.proptema.tema.importFonts : this.data.plantilla.tema.importFonts;
            if (fonts) {
                fonts.map((p) => {
                    var link = document.createElement('link');
                    link.href = p.href;
                    link.rel = p.rel;
                    link.className = "addertema"
                    document.head.appendChild(link);
                })

            }
        }
    },
  
}