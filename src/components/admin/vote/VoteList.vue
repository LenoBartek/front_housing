<template>
  <section>
    <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <half-page-60>
      <template #button>
        <base-button @click="reloadVotes">Odśwież</base-button>
        <base-button v-if="isAdmin" link :to="votesFormLink">Dodaj Głosowanie</base-button>
        <base-button :style="style_btn" @click="showFinishedVotes">{{
          isFinished
        }}</base-button>
      </template>

      <template #left>
        <div>
          <div v-if="isLoading">
            <base-spinner> </base-spinner>
          </div>
          <div v-else-if="hasVotes">
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
                  <td v-if="searchMode.title && !isAdmin"><input type="text" size="17" style="position: relative; left: 6vw;" placeholder="Szukaj..." v-model="searchTitle"></td>
                  </th>

                  <th>Za</th>
                  <th>Przeciw</th>
                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody>

              <template v-if="!isAdmin">
              <tr v-for="vote in filteredVotes" :key="vote.id"> 
                <td>{{ vote.title }}</td>
                <td style="color: green">{{ vote.upVote }}</td>
                <td style="color: red">{{ vote.downVote }}</td>
                <td>
                  <i class="fa-solid fa-circle-info" @click="detailsToggle(vote.id)"></i>
                  <i v-if="!this.finished" class="fa-solid fa-thumbs-up" @click="voteUp(vote.id)"></i>
                  <i v-if="!this.finished" class="fa-solid fa-thumbs-down" @click="voteDown(vote.id)"></i>
                </td>
              </tr>
              </template>

              <template v-else-if="isAdmin">
              <tr v-for="vote in filteredVotes" :key="vote.id">
                <td>{{ vote.building.name }}</td>
                <td>{{ vote.title }}</td>
                <td style="color: green">{{ vote.upVote }}</td>
                <td style="color: red">{{ vote.downVote }}</td>
                <td>
                  <i class="fa-solid fa-circle-info" @click="detailsToggle(vote.id)"></i>
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

        <div v-if="getVoteDetails && getVotePdf && !isLoadingDetails">
          <p>Tytuł: {{ getVoteDetails.title }}</p>
          <p>Data zakończenia: {{ getVoteDetails.dateFinish }}</p>
          <p class="details">{{ getVoteDetails.description }}</p>
          <i class="fa-solid fa-file-pdf" @click="showPDF"></i>
        </div>

      </template>
    </half-page-60>
  </section>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      error: null,
      isLoading: false,
      finished: false,
      searchMode: { building: true, title: true },
      searchBuilding: "",
      searchTitle: "",
      isLoadingDetails: false,
    };
  },
  methods: {
    async loadVotes(finished) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("vote/loadVotes", finished);
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      this.isLoading = false;
    },
    async loadVotesForUsers(finished) {
      if(this.getBuildingId) {
        this.isLoading = true;
        try {
          await this.$store.dispatch("vote/loadVotesForUsers",
           {finished: finished, buildingId: this.getBuildingId });
        }   catch (error) {
         this.error = error.message || "Coś poszło nie tak :)";
        }
        this.isLoading = false;
      }
    },
    async loadVoteDetails(id) {
      try {
        await this.$store.dispatch("vote/loadVoteDetails", id);
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
    },
    async loadVotePdf(id) {
      this.isLoadingDetails = true;
      try {
        await this.$store.dispatch("vote/loadVotePdf", id);
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      this.isLoadingDetails = false;
    },
    async castVote(vote, voteId) {
      if(this.$store.getters.userId) {
        try {
          await this.$store.dispatch("vote/castVote",
          {vote: vote, voteId: voteId, userId: this.$store.getters.userId});
        }   catch (error) {
          this.error = error.message || "Coś poszło nie tak :)";
        }
        if (!this.error) this.reloadVotes();
      }
    },
    handleError() {
      this.error = null;
    },
    showFinishedVotes() {
      this.finished = !this.finished;
    },
    searchToggle(mode) {
      if (mode == 0) {
        this.searchMode.building = !this.searchMode.building;
      } else if (mode == 1) {
        this.searchMode.title = !this.searchMode.title;
      } 
    },
    detailsToggle(id) {
      this.loadVoteDetails(id);
      this.loadVotePdf(id);
    },
    showPDF() {
      window.open(this.getVotePdf);
    },
    voteUp(id) {
      this.castVote('true', id)
    },
    voteDown(id) {
      this.castVote('false', id)
    },
    reloadVotes() {
      if (this.finished) {
        if(this.isAdmin == true) this.loadVotes("true");
        else if (this.isAdmin == false) this.loadVotesForUsers("true");

      } else if (!this.finished) {
        if(this.isAdmin == true) this.loadVotes("false");
        else if (this.isAdmin == false) this.loadVotesForUsers("false");
      }
    }

  },
  computed: {
    getVotes() {
      return this.$store.getters["vote/votes"];
    },
    hasVotes() {
      return !this.isLoading && this.$store.getters["vote/hasVotes"];
    },
    getVoteDetails() {
      return this.$store.getters["vote/voteDetails"];
    },
    getVotePdf() {
      return this.$store.getters["vote/votePdf"];
    },
    votesFormLink () {
      return this.$route.path + "/" + "addvote";
    },
    isFinished() {
      return this.finished == false ? "Przejź do zakończonych" : "Przejdź do aktualnych";
    },
    style_btn() {
      if (this.finished) {
        if(this.isAdmin == true) this.loadVotes("true");
        else if (this.isAdmin == false) this.loadVotesForUsers("true");
        return "background-color: #7c7a77; border-color: #7c7a77; color: white;";
      } else if (!this.finished) {
        if(this.isAdmin == true) this.loadVotes("false");
        else if (this.isAdmin == false) this.loadVotesForUsers("false");
      }
      return "";
    },
    filteredVotes() {
      const votes = this.getVotes;

      if(votes && this.isAdmin) {
        return votes.filter((vote) => {
          return (
            vote.building.name.toLowerCase().includes(this.searchBuilding.replace(/\s/g, "").toLowerCase()) &&
            vote.title.toLowerCase().includes(this.searchTitle.toLowerCase())
          );
        });
      }
      else if(votes && !this.isAdmin) {
        return votes.filter((vote) => {
          return (
            vote.title.toLowerCase().includes(this.searchTitle.toLowerCase())
          );
        });
      }
      else return votes;
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

.fa-thumbs-up {
  color: rgb(80, 160, 73);
}

.fa-thumbs-up:hover {
  color: rgb(30, 129, 21);
}

.fa-thumbs-down {
  color: rgb(187, 80, 103);
}

.fa-thumbs-down:hover {
  color: rgb(182, 21, 56);
}

.fa-file-pdf {
  position: relative;
  color: rgb(207, 90, 90);
  font-size: 50px;
  margin-left: 0px;
  left: 240px;
}

.fa-file-pdf:hover {
  color: rgb(192, 36, 36);
}

.search {
  position: relative;
  left: 33%;
}

.fa-solid {
  padding-left: 12px;
  cursor: pointer;
}

.details {
  text-align: left;
  width: 29vw;
  margin: 25px;
  white-space: pre-wrap;
}

img {
  max-width:100%;
  height: auto;
}
</style>
