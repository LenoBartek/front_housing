<template>
  <form @submit.prevent="submitForm">
    <div :class="{ invalid: !storey.isValid }">
      <label for="storey">Piętro</label>
      <input
        type="number"
        id="storey"
        v-model.trim="storey.val"
        @blur="clearValidity('storey')"
      />
    </div>
    <div :class="{ invalid: !number.isValid }">
      <label for="number">Numer Mieszkania</label>
      <input
        type="number"
        id="number"
        v-model.trim="number.val"
        @blur="clearValidity('number')"
      />
    </div>
    <div :class="{ invalid: !type.isValid }">
      <label for="type">Typ Mieszkania</label>
      <input
        type="text"
        id="type"
        v-model.trim="type.val"
        @blur="clearValidity('type')"
      />
    </div>
    <div :class="{ invalid: !areaM2.isValid }">
      <label for="areaM2">Powierzchnia (m²): </label>
      <input
        type="number"
        id="areaM2"
        v-model.trim="areaM2.val"
        @blur="clearValidity('areaM2')"
      />
    </div>
    <div :class="{ invalid: !typeUse.isValid }">
      <label for="typeUse">TypeUse</label>
      <input
        type="text"
        id="typeUse"
        v-model.trim="typeUse.val"
        @blur="clearValidity('typeUse')"
      />
    </div>
    <div :class="{ invalid: !building.isValid }">
      <label for="building">Budynek</label>
      <input
        type="text"
        id="building"
        v-model.trim="building.val"
        @blur="clearValidity('building')"
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
  emits: ["save-data-flat"],
  data() {
    return {
      storey: {
        val: null,
        isValid: true,
      },
      number: {
        val: null,
        isValid: true,
      },
      type: {
        val: "",
        isValid: true,
      },
      areaM2: {
        val: null,
        isValid: true,
      },
      typeUse: {
        val: "",
        isValid: true,
      },
      building: {
        val: "",
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

      if (!this.storey.val || this.storey.val < 0) {
        this.storey.isValid = false;
        this.formIsValid = false;
      }
      if (!this.number.val || this.number.val < 0) {
        this.number.isValid = false;
        this.formIsValid = false;
      }
      if (this.type.val === "") {
        this.type.isValid = false;
        this.formIsValid = false;
      }
      if (!this.areaM2.val || this.areaM2.val < 0) {
        this.areaM2.isValid = false;
        this.formIsValid = false;
      }
      if (this.typeUse.val === "") {
        this.typeUse.isValid = false;
        this.formIsValid = false;
      }
      if (this.building.val === "") {
        this.building.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formDataFlat = {
        storey: this.storey.val,
        number: this.number.val,
        type: this.type.val,
        areaM2: this.areaM2.val,
        typeUse: this.typeUse.val,
        building: this.building.val,
      };

      this.$emit("save-data-flat", formDataFlat);
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
