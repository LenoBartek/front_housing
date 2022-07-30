<template>
  <section>
    <home-page> </home-page>
  </section>

  <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <div v-if="!isLoading && getUser">
    <table class="styled-table">
      <thead>
        <tr>
          <th>Dane</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Imie</td>
          <td>{{ getUser.firstname }}</td>
        </tr>
        <tr>
          <td>Nazwisko</td>
          <td>{{ getUser.lastname }}</td>
        </tr>
        <tr>
          <td>Login</td>
          <td>{{ getUser.username }}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{{ getUser.email }}</td>
        </tr>
        <tr>
          <td>Numer telefonu</td>
          <td>{{ getUser.phoneNumber }}</td>
        </tr>
        <tr>
          <td>Hasło</td>
          <td>******</td>
        </tr>
      </tbody>
    </table>
    <base-button mode="edit" @click="editToggle">Edytuj</base-button>
    <account-popup-edit
      v-if="editUser && getUser"
      :editToggle="editToggle"
      :user="getUser"
      @status="reloadUser"
    >
    </account-popup-edit>
  </div>
</template>

<script>
import AccountPopupEdit from "../../components/admin/account/AccountPopupEdit.vue";
export default {
  components: {
    AccountPopupEdit,
  },
  data() {
    return {
      error: false,
      isLoading: false,
      editUser: false,
    };
  },
  created() {
    this.loadUser();
  },
  methods: {
    async loadUser() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("account/loadUser");
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
    editToggle() {
      if (this.getUser) this.editUser = !this.editUser;
    },
    reloadUser(status) {
      if (status == "ok") {
        this.editToggle();
        this.loadUser();
      }
    },
  },
  computed: {
    getUser() {
      return this.$store.getters["account/user"];
    },
  },
};
</script>

<style scoped>
.user {
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  top: 10px;
  left: 30%;
  width: 40%;
}

.user th {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.user td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: medium;
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
