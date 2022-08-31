<template>
  <section>
    <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <home-page> </home-page>

    <div v-if="isLoading">
      <base-spinner> </base-spinner>
    </div>

    <div v-if="!isLoading && getUserDetails">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Dane</th>
            <th>Opłaty (zł)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ogrzewanie</td>
            <td>{{ getUserDetails.fee.heating }}</td>
          </tr>
          <tr>
            <td>Fundusz renowacyjny</td>
            <td>{{ getUserDetails.fee.renovationFund }}</td>
          </tr>
          <tr>
            <td>Czynsz Wynajem</td>
            <td>{{ getUserDetails.fee.rent }}</td>
          </tr>
          <tr>
            <td>Eksploatacja</td>
            <td>{{ getUserDetails.fee.exploitation }}</td>
          </tr>
          <tr>
            <td>Administracja</td>
            <td>{{ getUserDetails.fee.administration }}</td>
          </tr>
          <tr>
            <td>Ciepła woda</td>
            <td>{{ getUserDetails.fee.warmWater }}</td>
          </tr>
          <tr>
            <td>Zimna woda</td>
            <td>{{ getUserDetails.fee.coldWater }}</td>
          </tr>
          <tr>
            <td>Ścieki</td>
            <td>{{ getUserDetails.fee.sewage }}</td>
          </tr>
          <tr>
            <td>Śmieci</td>
            <td>{{ getUserDetails.fee.rubbish }}</td>
          </tr>
          <tr>
            <td>Suma</td>
            <td style="color: green">{{ getUserDetails.fee.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      isLoading: false,
    };
  },
  created() {
    this.loadUserDetails();
  },
  methods: {
    async loadUserDetails() {
      if (this.$store.getters.userId) {
        this.isLoading = true;
        try {
          await this.$store.dispatch(
            "resident/loadUserDetails",
            this.$store.getters.userId
          );
        } catch (error) {
          this.error = error.message || "Coś poszło nie tak :)";
        }
        this.isLoading = false;
      }
    },
    handleError() {
      this.error = null;
    },
  },
  computed: {
    getUserDetails() {
      return this.$store.getters["resident/userDetails"];
    },
  },
};
</script>

<style scoped>
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
