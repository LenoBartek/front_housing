<template>
  <section>
    <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <button-header>
      <template #button>
        <base-button @click="loadUsers">Odśwież</base-button>
        <base-button link :to="residentFormLink">Dodaj mieszkańca</base-button>
        <base-button :style="style_btn" @click="ratesToggle">Stawki</base-button>
      </template>

      <div v-if="showRates">
        <resident-rates> </resident-rates>
      </div>
      <div v-if="!showRates">
        <div v-if="isLoading">
          <base-spinner> </base-spinner>
        </div>
        <div v-else-if="hasUsers">
          <table class="resident">
            <thead>
              <tr>
                <th>
                  Naswisko/Imie
                  <i class="fa-solid fa-magnifying-glass" @click="searchToggle(0)"></i>
                  <td v-if="searchMode.name"><input type="text" class="search" placeholder="Szukaj..." v-model="searchName"></td>
                </th>
                <th>Numer telefonu
               <i class="fa-solid fa-magnifying-glass" @click="searchToggle(1)"></i>
                  <td v-if="searchMode.phoneNumber"><input type="text" class="search" placeholder="Szukaj..." v-model="searchPhoneNumber"></td>
                </th>
                <th>Email
                  <i class="fa-solid fa-magnifying-glass" @click="searchToggle(2)"></i>
                  <td v-if="searchMode.email"><input type="text" class="search" placeholder="Szukaj..." v-model="searchEmail"></td>
                </th>
                <th>Login
                  <i class="fa-solid fa-magnifying-glass" @click="searchToggle(3)"></i>
                  <td v-if="searchMode.login"><input type="text" class="search" placeholder="Szukaj..." v-model="searchLogin"></td>
                </th>
                <th>Akcje</th>         
              </tr>
            </thead>
            <tbody>
              <template v-for="user in filteredUsers" :key="user.id">
              <tr v-if="!hiddenDeletedUser(user.id)">
                <td>{{ user.lastname + " " + user.firstname }}</td>
                <td>{{ user.phoneNumber }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.username }}</td>
                <td>
                  <i class="fa-solid fa-circle-info" @click="detailsToggle(user.id)"></i>
                  <i class="fa-solid fa-pen-to-square" @click="editToggle(user)"></i>
                  <i class="fa-solid fa-trash" @click="deleteToggle(user)"></i> 
                </td>
              </tr>
              <tr v-if="currentDetails = showDetails(user.id)" class="details-hover">
                <td colspan="5">
                  <table class="resident">
                   <thead>
                     <tr>
                       <th>Budynek</th>
                       <th>Mieszkanie</th>
                       <th>Umowa</th>
                       <th>Opłaty(zł)</th>
                      </tr>
                   </thead>
                   <tbody>
                      <tr>
                       <td class="table-position" valign = "top">
                        <table class="details">
                          <tr>
                            <td>Nazwa</td>
                            <td>{{currentDetails.building.name}}</td>
                          </tr>
                          <tr>
                            <td>Numer</td>
                            <td>{{currentDetails.building.number}}</td>
                          </tr>
                          <tr>
                            <td>Miasto</td>
                            <td>{{currentDetails.building.town}}</td>
                          </tr>
                          <tr>
                            <td>Ulica</td>
                            <td>{{currentDetails.building.street}}</td>
                          </tr>
                          <tr>
                            <td>Kod pocztowy</td>
                            <td>{{currentDetails.building.zipCode}}</td>
                          </tr>
                        </table>
                       </td>
                       <td valign = "top">
                        <table class="details">
                          <tr>
                            <td>Numer</td>
                            <td>{{currentDetails.flat.number}}</td>
                          </tr>
                         <tr>
                            <td>Piętro</td>
                            <td>{{currentDetails.flat.storey}}</td>
                          </tr>
                          <tr>
                            <td>Numer klatki schodowej</td>
                            <td>{{currentDetails.flat.nrStaircase}}</td>
                          </tr>
                          <tr>
                            <td>Powierzchnia (m²)</td>
                            <td>{{currentDetails.flat.areaM2}}</td>
                          </tr>
                        </table>
                       </td>
                       <td valign = "top">
                        <table class="details">
                         <tr>
                            <td>Rodzaj umowy</td>
                            <td>{{currentDetails.contract.type == "LEASE_AGREEMENT" ? "Wynajem" : "Na własność"}}</td>
                          </tr>
                          <tr>
                            <td>Ilość osób</td>
                            <td>{{currentDetails.contract.amountPeople}}</td>
                          </tr>
                          <tr>
                            <td v-if="currentDetails.contract.type == 'LEASE_AGREEMENT'">Rozpoczęcie najmu</td>
                            <td v-if="currentDetails.contract.type == 'OWNERSHIP_AGREEMENT'">Umowa od</td>
                            <td>{{ formatDate(currentDetails.contract.startTime) }}</td>
                          </tr>
                          <tr>
                            <td v-if="currentDetails.contract.type == 'LEASE_AGREEMENT'">Zakończenie najmu</td>
                            <td v-if="currentDetails.contract.type == 'LEASE_AGREEMENT'">{{ formatDate(currentDetails.contract.finishTime) }}</td>
                          </tr>
                        </table>
                       </td>
                       <td valign = "top">
                        <table class="details">
                          <tr>
                            <td>Ogrzewanie</td>
                            <td>{{currentDetails.fee.heating}}</td>
                          </tr>
                          <tr>
                            <td>Fundusz renowacyjny</td>
                            <td>{{currentDetails.fee.renovationFund}}</td>
                          </tr>
                          <tr>
                            <td>Czynsz</td>
                            <td>{{currentDetails.fee.rent}}</td>
                          </tr>
                          <tr>
                            <td>Eksploatacja</td>
                            <td>{{currentDetails.fee.exploitation}}</td>
                          </tr>
                          <tr>
                            <td>Administracja </td>
                            <td>{{currentDetails.fee.administration}}</td>
                          </tr>
                          <tr>
                            <td>Ciepła woda</td>
                            <td>{{currentDetails.fee.warmWater}}</td>
                          </tr>
                          <tr>
                            <td>Zimna woda</td>
                            <td>{{currentDetails.fee.coldWater}}</td>
                          </tr>
                          <tr>
                            <td>Ścieki</td>
                            <td>{{currentDetails.fee.sewage}}</td>
                          </tr>
                          <tr>
                            <td>Śmieci</td>
                            <td>{{currentDetails.fee.rubbish}}</td>
                          </tr>
                          <tr>
                            <td>Suma</td>
                            <td style="color: green">{{currentDetails.fee.total}}</td>
                          </tr>
                        </table>
                       </td>
                      </tr>
                   </tbody>
                  </table>
                </td>
              </tr> 
              </template>
            </tbody>
          </table>
          <resident-popup-edit
            v-if="editUser && this.currentUser"
            :editToggle="editToggle"
            :user ="this.currentUser"
            @status="reloadUsers"
            >  
          </resident-popup-edit>

          <resident-popup-delete
            v-if="deleteUser && this.currentUser"
            :deleteToggle="deleteToggle"
            :user="this.currentUser"
            @status="reloadUsers"
            > </resident-popup-delete>
        </div>
      </div>
    </button-header>
  </section>
</template>

<script>
import ResidentRates from "./ResidentRates";
import ResidentPopupEdit from "./ResidentPopupEdit.vue";
import ResidentPopupDelete from "./ResidentPopupDelete"

export default {
  components: {
    ResidentRates,
    ResidentPopupEdit,
    ResidentPopupDelete,
  },
  data() {
    return {
      showRates: false,
      error: null,
      isLoading: false,
      editUser: false,
      deleteUser: false,
      currentUser: null,
      searchMode: { name: true, phoneNumber: true, email: true, login: true },
      searchName: "",
      searchPhoneNumber: "",
      searchEmail: "",
      searchLogin: "",
      usersDetails: [],
      usersDelete: [],
    };
  },
  created() {
    this.loadUsers();
  },
  methods: {
    async loadUsers() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("resident/loadUsers");
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      this.isLoading = false;
    },
    async loadUserDetails(id) {
      try {
        await this.$store.dispatch("resident/loadUserDetails", id);
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
    },
    ratesToggle() {
      this.showRates = !this.showRates;
    },
    handleError() {
      this.error = null;
    },
    editToggle(user) {
      this.editUser = !this.editUser;
      this.currentUser = user;
    },
    deleteToggle(user) {
      this.deleteUser = !this.deleteUser;
      this.currentUser = user;
    },
    hiddenDeletedUser (id) {
      if(this.usersDelete.indexOf(id) === -1){
        return false
      } 
      else{
        const index = this.usersDetails.indexOf(id)
        if (index !== -1) {
          this.usersDetails.splice(index, 1);
        }
        return true;
      }  
    },
    reloadUsers(status) {
      this.currentUser = null;
      if (status == "edit_ok") {
        this.editToggle();
        this.loadUsers();
      }
      else if(status == "edit_error") {
        this.editToggle();
      }
      else if(status.status == "delete_ok") {
        this.usersDelete.push(status.id)
        this.deleteToggle();
      }
      else if (status == "delete_error") {
        this.deleteToggle();
      }
    },
    detailsToggle(id) {
      var index = -1;
      var flag = false;

      if (this.usersDetails.indexOf(id) === -1) {
        this.usersDetails.push(id);
        
        if(this.hasUsersDetails) {
          const usersDetails = this.getUsersDetails;
          for(const key in usersDetails) {
            if(usersDetails[key].user.id == id) {
                flag = true;
                break;
              }
          }
        }
        if(!flag) {
          this.loadUserDetails(id);
        }
      } 
      else {
        (index = this.usersDetails.indexOf(id));
      } 
      if (index !== -1) {
        this.usersDetails.splice(index, 1);
      }
    },
    showDetails(id) {
      if(this.usersDetails.indexOf(id) === -1) {
        return false;
      }
      else {
        var user;
        const usersDetails = this.getUsersDetails;
        for(const key in usersDetails) {
            if(usersDetails[key].user.id == id) {
                user = usersDetails[key];
                break;
              }
          }
        return user;
      }
    },
    formatDate(date) {
      const date2 = new Date(date);

      var month = "" + (date2.getMonth() + 1),
        day = "" + date2.getDate(),
        year = date2.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [day, month, year].join(".");
    },
    searchToggle(mode) {
      if (mode == 0) {
        this.searchMode.name = !this.searchMode.name;
      } else if (mode == 1) {
        this.searchMode.phoneNumber = !this.searchMode.phoneNumber;
      } else if (mode == 2) {
        this.searchMode.email = !this.searchMode.email;
      } else if (mode == 3) {
        this.searchMode.login = !this.searchMode.login;
      }
    },
  },
  computed: {
    residentFormLink() {
      return this.$route.path + "/" + "addresident";
    },
    hasUsers() {
      return !this.isLoading && this.$store.getters["resident/hasUsers"];
    },
    getUsers() {
      return this.$store.getters["resident/users"];
    },
    hasUsersDetails() {
      return !this.isLoading && this.$store.getters["resident/hasUsersDetails"];
    },
    getUsersDetails() {
      return this.$store.getters["resident/usersDetails"];
    },
    filteredUsers() {
      const users = this.getUsers;
      if (users) {
        return users.filter((user) => {
          return (
            (user.lastname + " " + user.firstname).toLowerCase().includes(this.searchName.toLowerCase()) &&
            (user.phoneNumber + "").toLowerCase().includes(this.searchPhoneNumber.replace(/\s/g, "").toLowerCase()) &&
            user.email.toLowerCase().includes(this.searchEmail.replace(/\s/g, "").toLowerCase()) &&
            user.username.toLowerCase().includes(this.searchLogin.replace(/\s/g, "").toLowerCase())
          );
        });
      } else return this.getUsers;
    },
    style_btn() {
      if (this.showRates) return "background-color: #7c7a77; border-color: #7c7a77; color: white;";
      return "";
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

.details {
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  top: 10px;
  width: 100%;
  border: 1px solid rgb(165, 163, 163);
}

.details td {
  padding: 8px;
  text-align: left;
  font-size: medium;
  color: rgb(57, 65, 65);
}

.details-hover th {
  background-color: #f1f1f1;
}

.details-hover tr{
  background-color: #f1f1f1;
}

.details-hover td {
  background-color: #f1f1f1;
  border-bottom: none;
}

.fa-solid {
  padding-left: 18px;
  cursor: pointer;
}

.fa-pen-to-square {
  color: #df9848;
}

.fa-pen-to-square:hover {
  color: #be6b0b;
}

.fa-trash {
  color: #c95757;
}

.fa-trash:hover {
  color: #b11b1b;
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

.button {
  position: fixed;
  right: 5%;
  bottom: 5%;
}

.styled-table {
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  top: 10px;
  left: 30%;
  width: 40%;
  margin: 25px 0;
  font-size: 0.9em;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: center;
}

.styled-table th,
.styled-table td {
  padding: 10px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

.styled-table tbody tr.active-row {
  font-weight: bold;
  color: #009879;
}
</style>
