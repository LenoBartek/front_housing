<template>
  <div>
    <router-view v-slot="slotProps"> 
      <component :is="slotProps.Component"></component>
    </router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch('tryLogin');
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
