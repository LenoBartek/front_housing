<template>
  <form @submit.prevent="submitForm">
    <div :class="{ invalid: !heatingM2.isValid }">
      <label for="heatingM2">Ogrzewanie</label>
      <input
        type="number"
        step="0.01"
        id="heatingM2"
        v-model.trim="heatingM2.val"
        @blur="clearValidity('heatingM2')"
      />
    </div>
    <div :class="{ invalid: !renovationFundM2.isValid }">
      <label for="renovationFundM2">Fundusz renowacyjny</label>
      <input
        type="number"
        step="0.01"
        id="renovationFundM2"
        v-model.trim="renovationFundM2.val"
        @blur="clearValidity('renovationFundM2')"
      />
    </div>
    <div :class="{ invalid: !rentRentM2.isValid }">
      <label for="rentRentM2">Czynsz wynajem (m²)</label>
      <input
        type="number"
        step="0.01"
        id="rentRentM2"
        v-model.trim="rentRentM2.val"
        @blur="clearValidity('rentRentM2')"
      />
    </div>
    <div :class="{ invalid: !rentPropertyM2.isValid }">
      <label for="rentPropertyM2">Czynsz własność (m²)</label>
      <input
        type="number"
        step="0.01"
        id="rentPropertyM2"
        v-model.trim="rentPropertyM2.val"
        @blur="clearValidity('rentPropertyM2')"
      />
    </div>
    <div :class="{ invalid: !exploitationM2.isValid }">
      <label for="exploitationM2">Eksploatacja (m²)</label>
      <input
        type="number"
        step="0.01"
        id="exploitationM2"
        v-model.trim="exploitationM2.val"
        @blur="clearValidity('exploitationM2')"
      />
    </div>
    <div :class="{ invalid: !administrationM2.isValid }">
      <label for="administrationM2">Administracja (m²)</label>
      <input
        type="number"
        step="0.01"
        id="administrationM2"
        v-model.trim="administrationM2.val"
        @blur="clearValidity('administrationM2')"
      />
    </div>
    <div :class="{ invalid: !warmWaterPer.isValid }">
      <label for="warmWaterPer">Ciepła woda</label>
      <input
        type="number"
        step="0.01"
        id="warmWaterPer"
        v-model.trim="warmWaterPer.val"
        @blur="clearValidity('warmWaterPer')"
      />
    </div>
    <div :class="{ invalid: !coldWaterPer.isValid }">
      <label for="coldWaterPer">Zimna woda</label>
      <input
        type="number"
        step="0.01"
        id="coldWaterPer"
        v-model.trim="coldWaterPer.val"
        @blur="clearValidity('coldWaterPer')"
      />
    </div>
    <div :class="{ invalid: !sewagePer.isValid }">
      <label for="sewagePer">Ścieki</label>
      <input
        type="number"
        step="0.01"
        id="sewagePer"
        v-model.trim="sewagePer.val"
        @blur="clearValidity('sewagePer')"
      />
    </div>
    <div :class="{ invalid: !rubbishPer.isValid }">
      <label for="rubbishPer">Śmieci</label>
      <input
        type="number"
        step="0.01"
        id="rubbishPer"
        v-model.trim="rubbishPer.val"
        @blur="clearValidity('rubbishPer')"
      />
    </div>

    <p v-if="!formIsValid">Uzupełnij poprawnie dane!</p>
    <div v-if="!this.editToggle">
      <base-button>Dodaj</base-button>
    </div>
    <div v-else-if="this.editToggle">
      <base-button>Zatwierdź</base-button>
      <base-button mode="delete" @click="this.editToggle">Anuluj</base-button>
    </div>
  </form>
</template>

<script>
export default {
  emits: ["save-rates-data"],
  props: [
    "heatingM22",
    "renovationFundM22",
    "rentRentM22",
    "rentPropertyM22",
    "exploitationM22",
    "administrationM22",
    "warmWaterPer2",
    "coldWaterPer2",
    "sewagePer2",
    "rubbishPer2",
    "editToggle",
  ],
  data() {
    return {
      heatingM2: {
        val: this.heatingM22 ? this.heatingM22 : null,
        isValid: true,
      },
      renovationFundM2: {
        val: this.renovationFundM22 ? this.renovationFundM22 : null,
        isValid: true,
      },
      rentRentM2: {
        val: this.rentRentM22 ? this.rentRentM22 : null,
        isValid: true,
      },
      rentPropertyM2: {
        val: this.rentPropertyM22 ? this.rentPropertyM22 : null,
        isValid: true,
      },
      exploitationM2: {
        val: this.exploitationM22 ? this.exploitationM22 : null,
        isValid: true,
      },
      administrationM2: {
        val: this.administrationM22 ? this.administrationM22 : null,
        isValid: true,
      },
      warmWaterPer: {
        val: this.warmWaterPer2 ? this.warmWaterPer2 : null,
        isValid: true,
      },
      coldWaterPer: {
        val: this.coldWaterPer2 ? this.coldWaterPer2 : null,
        isValid: true,
      },
      sewagePer: {
        val: this.sewagePer2 ? this.sewagePer2 : null,
        isValid: true,
      },
      rubbishPer: {
        val: this.rubbishPer2 ? this.rubbishPer2 : null,
        isValid: true,
      },

      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;

      if (!this.heatingM2.val || this.heatingM2.val < 0.01) {
        this.heatingM2.isValid = false;
        this.formIsValid = false;
      }
      if (!this.renovationFundM2.val || this.renovationFundM2.val < 0.01) {
        this.renovationFundM2.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rentRentM2.val || this.rentRentM2.val < 0.01) {
        this.rentRentM2.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rentPropertyM2.val || this.rentPropertyM2.val < 0.01) {
        this.rentPropertyM2.isValid = false;
        this.formIsValid = false;
      }
      if (!this.exploitationM2.val || this.exploitationM2.val < 0.01) {
        this.exploitationM2.isValid = false;
        this.formIsValid = false;
      }
      if (!this.administrationM2.val || this.administrationM2.val < 0.01) {
        this.administrationM2.isValid = false;
        this.formIsValid = false;
      }
      if (!this.warmWaterPer.val || this.warmWaterPer.val < 0.01) {
        this.warmWaterPer.isValid = false;
        this.formIsValid = false;
      }
      if (!this.coldWaterPer.val || this.coldWaterPer.val < 0.01) {
        this.coldWaterPer.isValid = false;
        this.formIsValid = false;
      }
      if (!this.sewagePer.val || this.sewagePer.val < 0.01) {
        this.sewagePer.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rubbishPer.val || this.rubbishPer.val < 0.01) {
        this.rubbishPer.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formDataRates = {
        heatingM2: this.heatingM2.val,
        renovationFundM2: this.renovationFundM2.val,
        rentRentM2: this.rentRentM2.val,
        rentPropertyM2: this.rentPropertyM2.val,
        exploitationM2: this.exploitationM2.val,
        administrationM2: this.administrationM2.val,
        warmWaterPer: this.warmWaterPer.val,
        coldWaterPer: this.coldWaterPer.val,
        sewagePer: this.sewagePer.val,
        rubbishPer: this.rubbishPer.val,
      };

      this.$emit("save-rates-data", formDataRates);
    },
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #a39dac;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
