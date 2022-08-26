<template>
  <section>
    <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <half-page>
      <template #button>
        <base-button @click="this.loadFaults('false')">Odśwież</base-button>
        <base-button link :to="faultsFormLink">Dodaj Usterkę</base-button>
        <base-button :style="style_btn" @click="showFixedFaults">{{
          isFixed
        }}</base-button>
      </template>

      <template #left>
        <div>
          <div v-if="isLoading">
            <base-spinner> </base-spinner>
          </div>
          <div v-else-if="hasFaults">
            <table class="resident">
              <thead>
                <tr>
                  <th>Budynek
                  <i class="fa-solid fa-magnifying-glass" @click="searchToggle(0)"></i>
                  <td v-if="searchMode.building"><input type="text" class="search" placeholder="Szukaj..." v-model="searchBuilding"></td>
                  </th>

                  <th>Tytuł
                  <i class="fa-solid fa-magnifying-glass" @click="searchToggle(1)"></i>
                  <td v-if="searchMode.title"><input type="text" class="search" placeholder="Szukaj..." v-model="searchTitle"></td>
                  </th>

                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody>
              
              <tr v-for="fault in filteredFaults" :key="fault.id">
                <td>{{ fault.building.name }}</td>
                <td>{{ fault.title }}</td>
                <td>
                  <i class="fa-solid fa-circle-info" @click="detailsToggle(fault.id)"></i>
                  <i v-if="!fixed" class="fa-solid fa-screwdriver-wrench" @click="fixToggle(fault)"></i>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>

      <template #right>
        <div style="margin-left: 40%" v-if="isLoadingDetails">
            <base-spinner> </base-spinner>
        </div>

        <div v-if="getFaultDetails && getFaultImage && !isLoadingDetails">
          <p style="white-space: pre-wrap;" class="details">{{ getFaultDetails.description }}</p>
          <img :src="getFaultImage">
        </div>

        <fault-popup v-if="fixMode"
          :fault="currentFix"
          :cancelToggle="fixToggle"
          @status="reloadFaults">
        </fault-popup>
      </template>
    </half-page>
  </section>
</template>

<script>
import FaultPopup from './FaultPopup.vue'

export default {
  components: {
    FaultPopup
  },
  data() {
    return {
      error: null,
      isLoading: false,
      fixed: false,
      searchMode: { building: true, title: true },
      searchBuilding: "",
      searchTitle: "",
      currentFix: null,
      fixMode: false,
      isLoadingDetails: false,
    };
  },
  created() {
    this.loadFaults("false");
  },
  methods: {
    async loadFaults(fixed) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("fault/loadFaults", fixed);
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      this.isLoading = false;
    },
    async loadFaultDetails(id) {
      try {
        await this.$store.dispatch("fault/loadFaultDetails", id);
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
    },
    async loadFaultImage(id) {
      this.isLoadingDetails = true;
      try {
        await this.$store.dispatch("fault/loadFaultImage", id);
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      this.isLoadingDetails = false;
    },
    handleError() {
      this.error = null;
    },
    showFixedFaults() {
      this.fixed = !this.fixed;
    },
    searchToggle(mode) {
      if (mode == 0) {
        this.searchMode.building = !this.searchMode.building;
      } else if (mode == 1) {
        this.searchMode.title = !this.searchMode.title;
      } 
    },
    detailsToggle(id) {
      this.loadFaultDetails(id);
      this.loadFaultImage(id);
    },
    fixToggle(fault) {
      this.fixMode = !this.fixMode;
      this.currentFix = fault;
    },
    reloadFaults(status) {
      this.currentFix = null;
      if (status == "fix_ok") {
        this.fixToggle();
        this.loadFaults("false");
      }
      else if(status == "fix_error") {
        this.fixToggle();
      }
    },
  },
  computed: {
    getFaults() {
      return this.$store.getters["fault/faults"];
    },
    hasFaults() {
      return !this.isLoading && this.$store.getters["fault/hasFaults"];
    },
    getFaultDetails() {
      return this.$store.getters["fault/faultsDetails"];
    },
    getFaultImage() {
      return this.$store.getters["fault/faultsImage"];
    },
    faultsFormLink () {
      return this.$route.path + "/" + "addfault";
    },
    isFixed() {
      return this.fixed == false ? "Przejdź do naprawionych" : "Przejź do uszkodzonych";
    },
    style_btn() {
      if (this.fixed) {
        this.loadFaults("true");
        return "background-color: #7c7a77; border-color: #7c7a77; color: white;";
      } else if (!this.fixed) {
        this.loadFaults("false");
      }
      return "";
    },
    filteredFaults() {
      const faults = this.getFaults;
      if (faults) {
        return faults.filter((fault) => {
          return (
            fault.building.name.toLowerCase().includes(this.searchBuilding.replace(/\s/g, "").toLowerCase()) &&
            fault.title.toLowerCase().includes(this.searchTitle.replace(/\s/g, "").toLowerCase())
          );
        });
      } else return this.getFaults;
    },
  },
};
</script>

<style scoped>
.resident {
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
}

.resident th {
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.resident tbody tr:hover {
  background-color: #e0dbdb;
}

.resident td {
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  font-size: medium;
}

.resident thead td {
  text-align: center;
  border-bottom: none;
}

.fa-magnifying-glass:hover {
  color: #0e8148;
}

.fa-circle-info {
  color: rgb(84, 144, 194);
}

.fa-circle-info:hover {
  color: rgb(7, 84, 146);
}

.fa-screwdriver-wrench {
  color: #2a8658;
}

.fa-screwdriver-wrench:hover {
  color: rgb(34, 87, 43);
}

.search {
  position: relative;
  left: 45%;
}

.fa-solid {
  padding-left: 12px;
  cursor: pointer;
}

.details {
  text-align: left;
  margin: 25px;
}

img {
  max-width:100%;
  height: auto;
}
</style>
