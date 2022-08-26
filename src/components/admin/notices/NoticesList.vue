<template>
  <section>
    <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <half-page>
      <template #button>
        <base-button @click="loadNotices('false')">Odśwież</base-button>
        <base-button link :to="noticesFormLink">Dodaj Ogłoszenie</base-button>
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
              
              <tr v-for="notice in filteredNotices" :key="notice.id">
                <td>{{ notice.building.name }}</td>
                <td>{{ notice.title }}</td>
                <td>
                  <i class="fa-solid fa-circle-info" @click="detailsToggle(notice.id)"></i>
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

        <div v-if="getNoticesDetails && !isLoadingDetails">
          <p style="white-space: pre-wrap;" class="details">{{ getNoticesDetails.description }}</p>
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
      searchMode: { building: true, title: true },
      searchBuilding: "",
      searchTitle: "",
      isLoadingDetails: false,
    };
  },
  created() {
    this.loadNotices("false");
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
      } 
    },
    detailsToggle(id) {
      this.loadNoticeDetails(id);
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
        this.loadNotices("true");
        return "background-color: #7c7a77; border-color: #7c7a77; color: white;";
      } else if (!this.archived) {
        this.loadNotices("false");
      }
      return "";
    },
    filteredNotices() {
      const notices = this.getNotices;
      if (notices) {
        return notices.filter((notice) => {
          return (
            notice.building.name.toLowerCase().includes(this.searchBuilding.replace(/\s/g, "").toLowerCase()) &&
            notice.title.toLowerCase().includes(this.searchTitle.replace(/\s/g, "").toLowerCase())
          );
        });
      } else return this.getNotices;
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

.search {
  position: relative;
  left: 45%;
}

.fa-solid {
  padding-left: 5px;
  cursor: pointer;
}

.details {
  text-align: left;
  margin: 25px;
}

</style>
