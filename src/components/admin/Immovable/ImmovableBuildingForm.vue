<template>
  <form @submit.prevent="submitForm">
    <div :class="{ invalid: !name.isValid }">
      <label for="name">Nazwa Budynku</label>
      <input
        type="text"
        id="name"
        v-model.trim="name.val"
        @blur="clearValidity('name')"
      />
    </div>
    <div :class="{ invalid: !town.isValid }">
      <label for="town">Miasto</label>
      <input
        type="text"
        id="town"
        v-model.trim="town.val"
        @blur="clearValidity('town')"
      />
    </div>
    <div :class="{ invalid: !street.isValid }">
      <label for="street">Ulica</label>
      <input
        type="text"
        id="street"
        v-model.trim="street.val"
        @blur="clearValidity('street')"
      />
    </div>
    <div :class="{ invalid: !number.isValid }">
      <label for="number">Numer Budynku</label>
      <input
        type="text"
        id="number"
        v-model.trim="number.val"
        @blur="clearValidity('number')"
      />
    </div>
    <div :class="{ invalid: !zipCode.isValid }">
      <label for="zipCode">Kod pocztowy </label>
      <input
        type="text"
        id="zipCode"
        v-model.trim="zipCode.val"
        @blur="clearValidity('zipCode')"
      />
    </div>
    <div :class="{ invalid: !yearConstruction.isValid }">
      <label for="yearConstruction">Rok Budowy</label>
      <input
        type="number"
        id="yearConstruction"
        v-model.trim="yearConstruction.val"
        @blur="clearValidity('yearConstruction')"
      />
    </div>
    <div :class="{ invalid: !areaM2.isValid }">
      <label for="areaM2">Powierzchnia (m²)</label>
      <input
        type="number"
        id="areaM2"
        v-model.trim="areaM2.val"
        @blur="clearValidity('areaM2')"
      />
    </div>
    <div :class="{ invalid: !numberStoreys.isValid }">
      <label for="numberStoreys">Liczba kondygnacji</label>
      <input
        type="number"
        id="numberStoreys"
        v-model.trim="numberStoreys.val"
        @blur="clearValidity('numberStoreys')"
      />
    </div>
    <div :class="{ invalid: !flatsPerStorey.isValid }">
      <label for="flatsPerStorey">Ilość mieszkań na piętrze</label>
      <input
        type="number"
        id="flatsPerStorey"
        v-model.trim="flatsPerStorey.val"
        @blur="clearValidity('flatsPerStorey')"
      />
    </div>
    <div :class="{ invalid: !staircase.isValid }">
      <label for="staircase">Ilość klatek schodowych</label>
      <input
        type="number"
        id="staircase"
        v-model.trim="staircase.val"
        @blur="clearValidity('staircase')"
      />
    </div>

    <p v-if="!formIsValid">Uzupełnij poprawnie dane!</p>
    <div>
      <base-button>Dodaj</base-button>
    </div>
  </form>
</template>

<script>
export default {
  emits: ["save-data-building"],
  data() {
    return {
      name: {
        val: "",
        isValid: true,
      },
      town: {
        val: "",
        isValid: true,
      },
      street: {
        val: "",
        isValid: true,
      },
      number: {
        val: "",
        isValid: true,
      },
      zipCode: {
        val: "",
        isValid: true,
      },
      yearConstruction: {
        val: null,
        isValid: true,
      },
      areaM2: {
        val: null,
        isValid: true,
      },
      numberStoreys: {
        val: null,
        isValid: true,
      },
      flatsPerStorey: {
        val: null,
        isValid: true,
      },
      staircase: {
        val: null,
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

      if (this.name.val === "" || this.name.val.length > 100) {
        this.name.isValid = false;
        this.formIsValid = false;
      }
      if (this.town.val === "" || this.town.val.length > 100) {
        this.town.isValid = false;
        this.formIsValid = false;
      }
      if (this.street.val === "" || this.street.val.length > 100) {
        this.street.isValid = false;
        this.formIsValid = false;
      }
      if (this.number.val === "" || this.number.val.length > 7) {
        this.number.isValid = false;
        this.formIsValid = false;
      }
      if (this.zipCode.val === "" || this.zipCode.val.length > 6) {
        this.zipCode.isValid = false;
        this.formIsValid = false;
      }
      if (!this.yearConstruction.val || this.yearConstruction.val < 0) {
        this.yearConstruction.isValid = false;
        this.formIsValid = false;
      }
      if (!this.areaM2.val || this.areaM2.val < 1) {
        this.areaM2.isValid = false;
        this.formIsValid = false;
      }
      if (!this.numberStoreys.val || this.numberStoreys.val < -1 || this.numberStoreys.val > 10) {
        this.numberStoreys.isValid = false;
        this.formIsValid = false;
      }
      if (!this.flatsPerStorey.val || this.flatsPerStorey.val < 1 || this.flatsPerStorey.val > 10) {
        this.flatsPerStorey.isValid = false;
        this.formIsValid = false;
      }
      if (!this.staircase.val || this.staircase.val < 1 || this.staircase.val > 10) {
        this.staircase.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formDataBuilding = {
        name: this.name.val,
        town: this.town.val,
        street: this.street.val,
        number: this.number.val,
        zipCode: this.zipCode.val,
        yearConstruction: this.yearConstruction.val,
        areaM2: this.areaM2.val,
        numberStoreys: this.numberStoreys.val,
        flatsPerStorey: this.flatsPerStorey.val,
        staircase: this.staircase.val,
      };

      this.$emit("save-data-building", formDataBuilding);
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
