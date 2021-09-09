<template>
  <div id="app">
    <!-- <h1>{{ msg }}</h1> -->
    <List /> 
    <router-view />
  </div>
</template>

<script>
import List from "@/components/list.vue";
export default {
  name: "App",
  components: {
    List
  },
  data() {
    return {
      msg: "模板移动对齐"
    };
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
h1 {
  text-align: center;
}
</style>
