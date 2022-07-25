<template>
  <div class="sidebar">
    <ul>
      <li v-for="mem in members"  :key="mem.id">
        <a :class="{ active: (mem.id === active)  }" v-on:click="selectMember(mem.id)">
          {{ mem.category}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import store from '../../store/index'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'MenuAdmin',
  data() {
    return {
      active: store.getters.activeTabId,
      members: [
        {id: 1, category: 'Nieruchomosci', path: '/immovable'},
        {id: 2, category: 'Mieszkańcy' , path: '/resident'},
        {id: 3, category: 'Głosowania', path: '/immovable'},
        {id: 4, category: 'Usterki', path: '/immovable'}
      ]
    }
  },
  methods: {
    selectMember: function (id) {
      store.commit('setActiveTabId',id);
      this.active = id;
      this.$router.push(this.members[id-1].path);
    }
  }
}
</script>
<style scoped>

.sidebar{
  position: absolute;
  left: 0%;
  height: 80vh;
  width: 15vw;
  font-size: 20px;
  background-color: #f1f1f1;
  box-sizing: border-box;
  display: inline-block;
}

/* @media all and (max-width: 980px) {
    #element{
        margin-left: 0px;
        left: 220px;
    }
} */

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

.active {
  color: white;
  background-color: green;
}

.sidebar li a:hover:not(.active) {
  background-color: #555;
  color: white;
}
</style>
