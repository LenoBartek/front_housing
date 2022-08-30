<template>
  <div class="sidebar">
    <ul>
      <li v-for="mem in members" :key="mem.id">
        <a
          :class="{ active: mem.id === active }"
          @click="selectMember(mem.id)"
          v-if="isAdmin"
        >
          {{ mem.category }}
        </a>
        <a
          :class="{ active: mem.id === active }"
          @click="selectMember(mem.id)"
          v-else-if="
            (mem.category == 'Głosowania' ||
              mem.category == 'Ogłoszenia' ||
              mem.category == 'Usterki') &&
            !isAdmin
          "
        >
          {{ mem.category }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import store from "../../store/index";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "MenuAdmin",
  data() {
    return {
      active: store.getters.activeTabId,
      members: [
        { id: 1, category: "Nieruchomosci", path: "/immovables" },
        { id: 2, category: "Mieszkańcy", path: "/residents" },
        { id: 3, category: "Głosowania", path: "/votes" },
        { id: 4, category: "Ogłoszenia", path: "/notices" },
        { id: 5, category: "Usterki", path: "/faults" },
      ],
    };
  },

  methods: {
    selectMember: function (id) {
      store.commit("setActiveTabId", id);
      this.active = id;
      this.$router.push(this.members[id - 1].path);
    },
  },
  computed: {
    isAdmin() {
      return this.$store.getters.role == "ADMIN" ? true : false;
    },
  },
};
</script>
<style scoped>
.sidebar {
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  cursor: default;
  text-decoration: none;
}

.active {
  color: white;
  background-color: #4f925b;
}

.sidebar li a:hover:not(.active) {
  background-color: #555;
  color: white;
}
</style>
