<template>
  <section>
    <button-header>
      <template #button>
        <base-button link :to="residentFormLink">Dodaj mieszkańca</base-button>
        <base-button @click="ratesToggle">Stawki</base-button>
      </template>

      <div v-if="showRates">
        <resident-rates> </resident-rates>
      </div>
      <div v-if="!showRates">
        <table class="rates">
          <thead>
            <tr>
              <th>Imie</th>
              <th>Naswisko</th>
              <th>Numer telefonu</th>
              <th>Login</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ogrzewanie (m²)</td>
              <td>{{}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </button-header>
  </section>
</template>

<script>
import ResidentRates from "./ResidentRates";

export default {
  components: {
    ResidentRates,
  },
  data() {
    return {
      showRates: false,
    };
  },
  methods: {
    ratesToggle() {
      this.showRates = !this.showRates;
    },
  },
  computed: {
    residentFormLink() {
      return this.$route.path + "/" + "addresident";
    },
  },
};
</script>

<style scoped>
.rates {
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  top: 10px;
  left: 30%;
  width: 40%;
}

.rates th {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.rates td {
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
