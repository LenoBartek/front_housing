<template>
  <form @submit.prevent="submitForm">
    <div :class="{ invalid: !title.isValid }">
      <label for="title">Tytuł</label>
      <input
        type="text"
        id="title"
        v-model.trim="title.val"
        @blur="clearValidity('title')"
      />
    </div>
    <div :class="{ invalid: !description.isValid }">
      <label for="description">Opis</label>
      <textarea
        rows="10"
        cols="30"
        id="description"
        name="description"
        style="white-space: pre-wrap"
        minlength="1"
        maxlength="3000"
        v-model="description.val"
      ></textarea>
    </div>
    <div :class="{ invalid: !dateFinish.isValid }">
      <label for="dateFinish"
        >Data zakończenia głosowania</label
      >
      <input
        type="date"
        min="2000-01-02"
        id="dateFinish"
        v-model.trim="dateFinish.val"
        @blur="clearValidity('dateFinish')"
      />
    </div>
    <div :class="{ invalid: !pdf.isValid }">
      <label for="pdf">Plik pdf</label>
      <input
        type="file"
        accept="application/pdf"
        id="pdf"
        @change="onChangeFile"
        name="pdf"
        @blur="clearValidity('pdf')"
      />
    </div>
    <p v-if="!formIsValid">Uzupełnij poprawnie dane!</p>
    <div v-if="!editStatus">
      <base-button class="btn-base">Dodaj</base-button>
    </div>
  </form>
</template>

<script>
export default {
  emits: ["save-data-vote"],
  props: ["title2", "description2", "pdf2", "dateFinish2", "editStatus"],
  data() {
    return {
      title: {
        val: this.title2 ? this.title2 : "",
        isValid: true,
      },
      description: {
        val: this.description2 ? this.description2 : "",
        isValid: true,
      },
      dateFinish: {
        val: this.dateFinish2 ? this.dateFinish2 : null,
        isValid: true,
      },
      pdf: {
        val: this.pdf2 ? this.pdf2 : null,
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

      if (this.title.val === "" || this.title.val.length > 100) {
        this.title.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === "" || this.description.val.length > 100) {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.dateFinish.val) {
        this.dateFinish.isValid = false;
        this.formIsValid = false;
      }
      if (!this.pdf.val) {
        this.pdf.isValid = false;
        this.formIsValid = false;
      }
    },
    onChangeFile(event) {
      this.pdf.val = event.target.files[0];
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }
      const formDataVote = {
        title: this.title.val,
        description: this.description.val,
        dateFinish: this.dateFinish.val,
        pdf: this.pdf.val,
      };

      this.$emit("save-data-vote", formDataVote);
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
