<template>
  <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <div v-if="!isLoading && getRates">
    <table class="styled-table">
      <thead>
        <tr>
          <th>Dane</th>
          <th>Opłaty (zł)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ogrzewanie (m²)</td>
          <td>{{ getRates.heatingM2 }}</td>
        </tr>
        <tr>
          <td>Fundusz renowacyjny</td>
          <td>{{ getRates.renovationFundM2 }}</td>
        </tr>
        <tr>
          <td>Wynajem (m²)??</td>
          <td>{{ getRates.rentRentM2 }}</td>
        </tr>
        <tr>
          <td>Wynajem (m²)??</td>
          <td>{{ getRates.rentPropertyM2 }}</td>
        </tr>
        <tr>
          <td>Eksploatacja (m²)</td>
          <td>{{ getRates.exploitationM2 }}</td>
        </tr>
        <tr>
          <td>Administracja (m²)</td>
          <td>{{ getRates.administrationM2 }}</td>
        </tr>
        <tr>
          <td>Ciepła woda</td>
          <td>{{ getRates.warmWaterPer }}</td>
        </tr>
        <tr>
          <td>Zimna woda</td>
          <td>{{ getRates.coldWaterPer }}</td>
        </tr>
        <tr>
          <td>Ścieki</td>
          <td>{{ getRates.sewagePer }}</td>
        </tr>
        <tr>
          <td>Śmieci</td>
          <td>{{ getRates.rubbishPer }}</td>
        </tr>
      </tbody>
    </table>
    <base-button mode="edit" @click="editToggle">Edytuj</base-button>
    <resident-popup-edit-rates
      v-if="editRates"
      :editToggle="editToggle"
      :rates="getRates"
      @status="reloadRates"
    >
    </resident-popup-edit-rates>
  </div>
</template>

<script>
import ResidentPopupEditRates from "./ResidentPopupEditRates.vue";
export default {
  components: {
    ResidentPopupEditRates,
  },
  data() {
    return {
      error: false,
      isLoading: false,
      editRates: false,
    };
  },
  created() {
    this.loadRates();
  },
  methods: {
    async loadRates() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("resident/loadRates");
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
    editToggle() {
      if (this.getRates) this.editRates = !this.editRates;
    },
    reloadRates(status) {
      if (status == "ok") {
        this.editToggle();
        this.loadRates();
      }
    },
  },
  computed: {
    getRates() {
      return this.$store.getters["resident/rates"];
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
