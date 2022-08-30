<template>
  <section>
    <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <half-page>
      <template #button>
        <base-button @click="reloadNotices">Odśwież</base-button>
        <base-button v-if="isAdmin" link :to="noticesFormLink">Dodaj Ogłoszenie</base-button>
        <base-button :style="style_btn" @click="showArchivedNotices">{{
          isArchived
        }}</base-button>
      </template>

      <template #left>
        <div>
          <div v-if="isLoading">
            <base-spinner> </base-spinner>
          </div>
          <div v-else-if="hasNotices">
            <table class="resident">
              <thead>
                <tr>
                  <th v-if="isAdmin">Budynek
                  <i class="fa-solid fa-magnifying-glass" @click="searchToggle(0)"></i>
                  <td v-if="searchMode.building"><input type="text" size="17" class="search" placeholder="Szukaj..." v-model="searchBuilding"></td>
                  </th>

                  <th>Tytuł
                  <i class="fa-solid fa-magnifying-glass" @click="searchToggle(1)"></i>
                  <td v-if="searchMode.title && isAdmin"><input type="text" size="17" class="search" placeholder="Szukaj..." v-model="searchTitle"></td>
                  <td v-if="searchMode.title && !isAdmin"><input type="text" size="17" style="position: relative; left: 3vw;" placeholder="Szukaj..." v-model="searchTitle"></td>
                  </th>

                  <th>Data archiwizacji
                  <i class="fa-solid fa-magnifying-glass" @click="searchToggle(2)"></i>
                  <td v-if="searchMode.executionDate"><input type="text" size="17" class="search" placeholder="Szukaj..." v-model="searchExecutionDate"></td>
                  </th>

                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody>
              
              <template v-if="!isAdmin"> 
              <tr v-for="notice in filteredNotices" :key="notice.id">
                <td>{{ notice.title }}</td>
                <td>{{ notice.executionDate }}</td>
                <td>
                  <i class="fa-solid fa-circle-info" @click="detailsToggle(notice.id)"></i>
                </td>
              </tr>
              </template>

              <template v-else-if="isAdmin"> 
              <tr v-for="notice in filteredNotices" :key="notice.id">
                <td>{{ notice.building.name }}</td>
                <td>{{ notice.title }}</td>
                <td>{{ notice.executionDate }}</td>
                <td>
                  <i class="fa-solid fa-circle-info" @click="detailsToggle(notice.id)"></i>
                </td>
              </tr>
              </template>

              </tbody>
            </table>
          </div>
        </div>
      </template>

      <template #right>
        <div style="margin-left: 40%" v-if="isLoadingDetails">
            <base-spinner> </base-spinner>
        </div>

        <div v-if="getNoticesDetails && !isLoadingDetails">
          <p>Tytuł: {{ getNoticesDetails.title }}</p>
          <p>Data zakończenia: {{ getNoticesDetails.executionDate }}</p>
          <p class="details">{{ getNoticesDetails.description }}</p>
        </div>
      </template>

    </half-page>
  </section>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      isLoading: false,
      archived: false,
      searchMode: { building: true, title: true, executionDate: true },
      searchBuilding: "",
      searchTitle: "",
      searchExecutionDate: "",
      isLoadingDetails: false,
    };
  },
  methods: {
    async loadNotices(archived) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("notices/loadNotices", archived);
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      this.isLoading = false;
    },
    async loadNoticesForUsers(archived) {
      if(this.getBuildingId) {
        this.isLoading = true;
        try {
          await this.$store.dispatch("notices/loadNoticesForUsers",
           {archived: archived, buildingId: this.getBuildingId });
        } catch (error) {
          this.error = error.message || "Coś poszło nie tak :)";
        }
        this.isLoading = false;
      }
    },
    async loadNoticeDetails(id) {
      this.isLoadingDetails = true;
      try {
        await this.$store.dispatch("notices/loadNoticeDetails", id);
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      this.isLoadingDetails = false;
    },
    handleError() {
      this.error = null;
    },
    showArchivedNotices() {
      this.archived = !this.archived;
    },
    searchToggle(mode) {
      if (mode == 0) {
        this.searchMode.building = !this.searchMode.building;
      } else if (mode == 1) {
        this.searchMode.title = !this.searchMode.title;
      } else if (mode == 2) {
        this.searchMode.executionDate = !this.searchMode.executionDate;
      }
    },
    detailsToggle(id) {
      this.loadNoticeDetails(id);
    },
    reloadNotices() {
      if (this.archived) {
        if(this.isAdmin == true) this.loadNotices("true");
        else if (this.isAdmin == false) this.loadNoticesForUsers("true");

      } else if (!this.archived) {
        if(this.isAdmin == true) this.loadNotices("false");
        else if (this.isAdmin == false) this.loadNoticesForUsers("false");
      }
    }
  },
  computed: {
    getNotices() {
      return this.$store.getters["notices/notices"];
    },
    hasNotices() {
      return !this.isLoading && this.$store.getters["notices/hasNotices"];
    },
    getNoticesDetails() {
      return this.$store.getters["notices/noticesDetails"];
    },
    noticesFormLink () {
      return this.$route.path + "/" + "addnotice";
    },
    isArchived() {
      return this.archived == false ? "Przejdź do zarchiwizowanych" : "Przejź do aktualnych";
    },
    style_btn() {
      if (this.archived) {
        if(this.isAdmin == true) this.loadNotices("true");
        else if (this.isAdmin == false) this.loadNoticesForUsers("true");
        return "background-color: #7c7a77; border-color: #7c7a77; color: white;";
      } else if (!this.archived) {
        if(this.isAdmin == true) this.loadNotices("false");
        else if (this.isAdmin == false) this.loadNoticesForUsers("false");
      }
      return "";
    },
    filteredNotices() {
      const notices = this.getNotices;

      if (notices && this.isAdmin) {
        return notices.filter((notice) => {
          return (
            notice.building.name.toLowerCase().includes(this.searchBuilding.replace(/\s/g, "").toLowerCase()) &&
            notice.title.toLowerCase().includes(this.searchTitle.toLowerCase()) &&
            notice.executionDate.toLowerCase().includes(this.searchExecutionDate.replace(/\s/g, "").toLowerCase())
          );
        });
      } else if (notices && !this.isAdmin) {
        return notices.filter((notice) => {
          return (
            notice.title.toLowerCase().includes(this.searchTitle.toLowerCase()) &&
            notice.executionDate.toLowerCase().includes(this.searchExecutionDate.replace(/\s/g, "").toLowerCase())
          );
        });
      }
      else return notices;
    },
    isAdmin() {
      return this.$store.getters.role == "ADMIN" ? true : false;
    },
    getBuildingId() {
      return this.$store.getters.buildingId;
    }
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

.search {
  position: relative;
  left: 20px;
}

.fa-solid {
  padding-left: 5px;
  cursor: pointer;
}

.details {
  text-align: left;
  margin: 25px;
  white-space: pre-wrap;
  width: 37vw;
}

</style>
