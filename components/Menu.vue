<template>
<div style="z-index: 1000; width:100%; max-width:200px; height:100%; position:absolute; top:0px; left:0px; overflow:auto;  ">
  <v-btn  v-if="!showmenucomp" @click="showmenucomp=true" style="top:50px;"><v-icon>mdi-arrow-right</v-icon></v-btn>
<v-list v-if="showmenucomp">
  <v-list-subheader>Componentes <v-btn @click="showmenucomp=false" ><v-icon>mdi-arrow-left</v-icon></v-btn></v-list-subheader>
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