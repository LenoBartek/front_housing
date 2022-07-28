<template>
  <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <body-frame class="body">
    <div class="text">
      <base-card>
        <div v-if="currentlyFlat">
          <h3>Aktualnie wybrany:</h3>
          <h3>Lokal {{ currentlyFlat.number }}</h3>
          <h3 v-if="currentlyFlat.building">
            Budynek {{ currentlyFlat.building.name }}
          </h3>
        </div>
        <div v-else>
          <h3>Wybierz lokal</h3>
        </div></base-card
      >
    </div>

    <input
      type="text"
      name="searchBar"
      placeholder="Nr. Mieszkania"
      v-model="searchQuery"
    />
    <div v-if="isLoading">
      <base-spinner> </base-spinner>
    </div>
    <div v-else-if="hasFlats">
      <table class="flats">
        <thead>
          <tr>
            <th>Budynek</th>
            <th>Mieszkanie</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="flat in this.filteredFlats"
            :key="flat.id"
            @click="selectedFlat(flat)"
          >
            <td v-if="flat.building">{{ flat.building.name }}</td>
            <td>Lokal {{ flat.number }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <base-button link :to="residentFlatLink" class="button" v-if="currentlyFlat"
      >Dodaj mieszkańca</base-button
    >
  </body-frame>
</template>

<script>
import BaseCard from "../ui/BaseCard.vue";
export default {
  components: { BaseCard },
  data() {
    return {
      error: null,
      currentlyFlat: null,
      searchQuery: "",
      isLoading: false,
    };
  },
  created() {
    this.loadFlats();
  },
  methods: {
    async loadFlats() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("resident/loadFlats");
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
    selectedFlat(flat) {
      this.currentlyFlat = flat;
    },
  },
  computed: {
    getFlats() {
      return this.$store.getters["resident/flats"];
    },
    filteredFlats() {
      const flats = this.getFlats;

      if (flats && this.searchQuery) {
        return flats.filter((flat) => {
          return (
            flat.number.toString().includes(this.searchQuery) &&
            flat.number.toString().length == this.searchQuery.length
          );
        });
      } else return this.getFlats;
    },
    residentFlatLink() {
      if (this.currentlyFlat) {
        return this.$route.path + "/" + this.currentlyFlat.id;
      } else {
        return this.$route.path;
      }
    },
    hasFlats() {
      return !this.isLoading && this.$store.getters["resident/hasFlats"];
    },
  },
};
</script>

<style scoped>
.flats {
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  top: 10px;
  left: 30%;
  width: 40%;
}
.body {
  margin: auto;
  width: 50%;
  padding: 10px;
  overflow: auto;
}

.flats td,
.flats th {
  border: 1px solid #ddd;
  padding: 8px;
}

.flats tr:nth-child(even) {
  background-color: #f2f2f2;
}

.flats tr:hover {
  background-color: #ddd;
}

.flats th {
  padding-top: 12px;
  padding-bottom: 12px;
  border: 1px solid #ddd;
  padding: 8px;
  text-decoration: none;
}

.text {
  position: fixed;
}

.button {
  position: fixed;
  right: 5%;
  bottom: 5%;
}
</style>
