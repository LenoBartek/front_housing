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
    <div :class="{ invalid: !nrStaircase.isValid }">
      <label for="nrStaircase">Numer klatki schodowej</label>
      <input
        type="number"
        id="nrStaircase"
        v-model.trim="nrStaircase.val"
        @blur="clearValidity('nrStaircase')"
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

    <p v-if="!formIsValid">Uzupełnij poprawnie dane!</p>
    <div v-if="!editStatus">
      <base-button class="btn-base">Dodaj</base-button>
    </div>
    <div v-else-if="editStatus">
      <base-button class="btn-base">Zatwierdź</base-button>
      <base-button
        class="btn-base"
        mode="delete"
        @click="this.$store.dispatch('immovable/changeEditMode')"
        >Anuluj</base-button
      >
    </div>
  </form>
</template>

<script>
export default {
  emits: ["save-data-flat"],
  props: ["storey2", "number2", "nrStaircase2", "areaM22"],
  data() {
    return {
      storey: {
        val: this.storey2 ? this.storey2 : null,
        isValid: true,
      },
      number: {
        val: this.number2 ? this.number2 : null,
        isValid: true,
      },
      nrStaircase: {
        val: this.nrStaircase2 ? this.nrStaircase2 : null,
        isValid: true,
      },
      areaM2: {
        val: this.areaM22 ? this.areaM22 : null,
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

      if (!this.storey.val || this.storey.val < -1 || this.storey.val > 10) {
        this.storey.isValid = false;
        this.formIsValid = false;
      }
      if (!this.number.val || this.number.val < 0) {
        this.number.isValid = false;
        this.formIsValid = false;
      }
      if (!this.nrStaircase.val || this.nrStaircase.val < 1) {
        this.nrStaircase.isValid = false;
        this.formIsValid = false;
      }
      if (!this.areaM2.val || this.areaM2.val < 1) {
        this.areaM2.isValid = false;
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
        nrStaircase: this.nrStaircase.val,
        areaM2: this.areaM2.val,
      };

      this.$emit("save-data-flat", formDataFlat);
    },
  },
  computed: {
    editStatus() {
      return this.$store.getters["immovable/editStatus"];
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

.btn-base {
  margin-top: 15px;
}
</style>
