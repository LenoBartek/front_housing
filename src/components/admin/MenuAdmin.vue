<template>
  <div class="sidebar">
    <ul>
      <li><a class="active" href="#Nieruchomosci">Nieruchomosci</a></li>
      <li><a href="#Liczniki">Liczniki</a></li>
      <li><a href="#Next">Next</a></li>
      <li><a href="#Next">Next</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'MenuAdmin',
  components: {},
}
</script>
<style scoped>

.sidebar{
  height: 80vh;
  width: 15vw;
  float: left;
  font-size: 20px;
  background-color: #f1f1f1;
  box-sizing: border-box;
  display: inline-block;
}

.sidebar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.sidebar li a {
  display: block;
  color: #000;
  padding: 15px;
  border-bottom: 1px solid #bdb8d7;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  border-top: 1px solid rgba(255,255,255,0.05);
}

.sidebar li a.active {
  background-color: #04AA6D;
  color: white;
}

.sidebar li a:hover:not(.active) {
  background-color: #555;
  color: white;
}
</style>
