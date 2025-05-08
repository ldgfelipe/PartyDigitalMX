<template>
<v-footer class="text-center  flex-column ga-2 py-4" color="red-lighten-1" style="position:relative; z-index:0;">
    <div class="d-flex ga-3">
     <v-btn
        v-for="(icon,index) in icons"
        :key="'icon'+index"
        :href="icon.url"
        target="_blank"
        variant="text"
        color="#ff6666"
        class="white--text"
      ><v-icon>{{ icon.icon }}</v-icon></v-btn>
    </div>

    <v-divider class="my-2" thickness="2" width="50"></v-divider>

    <div class="text-caption font-weight-regular opacity-60">
    </div>

    <v-divider></v-divider>

    <div class="pink--text text-caption font-weight-regular opacity-60">
      {{ new Date().getFullYear() }} — <strong>partyDigital</strong>
    </div>
  </v-footer>
</template>
<script>
//// carga datos del footer 
  export default {
    data: () => ({
      icons: [
        {
          icon:'mdi-facebook',
          url:"https://facebook.com"
        },
        {
          icon:'mdi-twitter',
          url:"https:x.com"
        },
        {
          icon:'mdi-linkedin',
          url:"https://linkedin.com"
        },
        {
          icon:'mdi-instagram',
          url:"https://instagram.com"
        }

      ],
    }),
  }
</script>