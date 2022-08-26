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

    <div :class="{ invalid: !image.isValid }">
      <label for="image">Zdjęcie usterki</label>
      <input
        type="file"
        accept="image/png"
        id="image"
        @change="onChangeFile"
        name="image"
        @blur="clearValidity('image')"
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
  emits: ["save-data-fault"],
  props: ["title2", "description2", "image2", "editStatus"],
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
      image: {
        val: this.image2 ? this.image2 : null,
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
      if (!this.image.val) {
        this.image.isValid = false;
        this.formIsValid = false;
      }
    },
    onChangeFile(event) {
      this.image.val = event.target.files[0];
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }
      const formDataFault = {
        title: this.title.val,
        description: this.description.val,
        image: this.image.val,
      };

      this.$emit("save-data-fault", formDataFault);
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
