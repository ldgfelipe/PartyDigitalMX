<template>
<div>
  <v-btn   @click="showmenucomp=true" title="Componentes" ><v-icon>mdi-package</v-icon></v-btn>
<v-list v-if="showmenucomp" style="position:fixed; left:0px; top:0px; z-index:99999999999999999999999999999999999999999999;">
  <v-btn @click="showmenucomp=false" ><v-icon>mdi-close</v-icon></v-btn>
  <v-list-subheader>Componentes </v-list-subheader>
  <v-list-item v-for="(item, index) in componentes" :key="index">
    {{ item.nombre }} <v-checkbox v-model="item.estado"></v-checkbox>
    </v-list-item>
  </v-list>
</div>
</template>
<script>
export default {
  data() {
    return {
      showmenucomp:false
    }
  },
  props:['componentes']
}

</script>
<style scope>

</style>