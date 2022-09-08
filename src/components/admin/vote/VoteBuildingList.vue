<template>
  <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <div v-if="!addFaults">
    <body-frame class="body">
      <div class="text">
        <base-card>
          <div v-if="currentlyBuilding">
            <h3>Aktualnie wybrany:</h3>
            <h3>Budynek {{ currentlyBuilding.name }}</h3>
          </div>
          <div v-else>
            <h3>Wybierz Budynek</h3>
          </div></base-card
        >
      </div>

      <input
        type="text"
        name="searchBar"
        placeholder="Nazwa budynku"
        v-model="searchQuery"
      />
      <div v-if="isLoading">
        <base-spinner> </base-spinner>
      </div>
      <div v-else-if="hasBuilding">
        <table class="flats">
          <thead>
            <tr>
              <th>Budynek</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="building in this.filteredBuilding"
              :key="building.id"
              @click="selectedBuilding(building)"
            >
              <td>{{ building.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <base-button
        @click="addFaultsToggle"
        class="button"
        v-if="currentlyBuilding"
        >Dodaj Głosowanie</base-button
      >
    </body-frame>
  </div>
  <div v-else-if="addFaults">
    <h2>Dodawanie Głosowania</h2>
    <base-card>
      <vote-form @save-data-vote="saveData"> </vote-form>
    </base-card>
  </div>
</template>

<script>
import VoteForm from "./VoteForm.vue";

export default {
  components: {
    VoteForm,
  },
  data() {
    return {
      error: null,
      currentlyBuilding: null,
      searchQuery: "",
      isLoading: false,
      addFaults: false,
    };
  },
  created() {
    this.loadBuildings();
  },
  methods: {
    async loadBuildings() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("immovable/loadBuildings");
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      this.isLoading = false;
    },
    async saveData(data) {
      data.building_id = this.currentlyBuilding.id;
      try {
        await this.$store.dispatch("vote/addVote", data);
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      if (!this.getVoteError) this.$router.replace("/votes");
      else this.error = this.getVoteError;
    },
    handleError() {
      this.error = null;
      this.$store.commit("vote/setVotesError", null);
    },
    selectedBuilding(building) {
      this.currentlyBuilding = building;
    },
    addFaultsToggle() {
      this.addFaults = !this.addFaults;
    },
  },
  computed: {
    getBuilding() {
      return this.$store.getters["immovable/nodes_2"];
    },
    getVoteError() {
      return this.$store.getters["vote/voteError"];
    },
    filteredBuilding() {
      const buildings = this.getBuilding;

      if (buildings && this.searchQuery) {
        return buildings.filter((building) => {
          return building.name
            .toLowerCase()
            .includes(this.searchQuery.replace(/\s/g, "").toLowerCase());
        });
      } else return this.getBuilding;
    },
    hasBuilding() {
      return !this.isLoading && this.$store.getters["immovable/hasNodes"];
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
  width: 65%;
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
