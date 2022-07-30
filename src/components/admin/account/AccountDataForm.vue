<template>
  <form @submit.prevent="submitForm">
    <div :class="{ invalid: !firstname.isValid }">
      <label for="firstname">Imie</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstname.val"
        @blur="clearValidity('firstname')"
      />
    </div>
    <div :class="{ invalid: !lastname.isValid }">
      <label for="lastname">Nazwisko</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastname.val"
        @blur="clearValidity('lastname')"
      />
    </div>
    <div :class="{ invalid: !phoneNumber.isValid }">
      <label for="phoneNumber">Numer telefonu</label>
      <input
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
        placeholder="123-456-789"
        id="phoneNumber"
        v-model.trim="phoneNumber.val"
        @blur="clearValidity('phoneNumber')"
      />
    </div>
    <div :class="{ invalid: !username.isValid }">
      <label for="username">Login</label>
      <input
        type="text"
        id="username"
        v-model.trim="username.val"
        @blur="clearValidity('username')"
      />
    </div>
    <div :class="{ invalid: !email.isValid }">
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        v-model.trim="email.val"
        @blur="clearValidity('email')"
      />
    </div>
    <p class="passwd">
      Hasło
      <base-button
        type="button"
        class="btn-password"
        mode="edit"
        @click="passwordToggle"
        >Edytuj
      </base-button>
    </p>
    <div v-if="showPassword">
      <div :class="{ invalid: !password.isValid }">
        <label for="password">Podaj obecne hasło</label>
        <input
          type="password"
          id="password"
          v-model.trim="password.val"
          @blur="clearValidity('password')"
        />
      </div>
      <div :class="{ invalid: !newPassword.isValid }">
        <label for="newPassword">Podaj nowe hasło</label>
        <input
          type="password"
          id="newPassword"
          v-model.trim="newPassword.val"
          @blur="clearValidity('newPassword')"
        />
      </div>
      <div :class="{ invalid: !newPasswordCheck.isValid }">
        <label for="newPasswordCheck">Ponownie podaj nowe hasło</label>
        <input
          type="password"
          id="newPasswordCheck"
          v-model.trim="newPasswordCheck.val"
          @blur="clearValidity('newPasswordCheck')"
        />
      </div>
    </div>

    <p v-if="!formIsValid">Uzupełnij poprawnie dane!</p>
    <div v-if="!this.editToggle">
      <base-button class="btn-base">Dodaj</base-button>
    </div>
    <div v-else-if="this.editToggle">
      <base-button class="btn-base">Zatwierdź</base-button>
      <base-button class="btn-base" mode="delete" @click="this.editToggle"
        >Anuluj</base-button
      >
    </div>
  </form>
</template>

<script>
export default {
  emits: ["save-user-data"],
  props: [
    "firstname2",
    "lastname2",
    "phoneNumber2",
    "username2",
    "email2",
    "editToggle",
  ],
  data() {
    return {
      firstname: {
        val: this.firstname2 ? this.firstname2 : "",
        isValid: true,
      },
      lastname: {
        val: this.lastname2 ? this.lastname2 : "",
        isValid: true,
      },
      phoneNumber: {
        val: this.phoneNumber2 ? this.phoneNumber2 : "",
        isValid: true,
      },
      username: {
        val: this.username2 ? this.username2 : "",
        isValid: true,
      },
      email: {
        val: this.email2 ? this.email2 : null,
        isValid: true,
      },
      password: {
        val: "",
        isValid: true,
      },
      newPassword: {
        val: "",
        isValid: true,
      },
      newPasswordCheck: {
        val: "",
        isValid: true,
      },

      showPassword: false,
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    passwordToggle() {
      this.showPassword = !this.showPassword;
    },
    validateForm() {
      this.formIsValid = true;

      if (this.firstname.val === "" || this.firstname.val.length > 20) {
        this.firstname.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastname.val === "" || this.lastname.val.length > 20) {
        this.lastname.isValid = false;
        this.formIsValid = false;
      }
      if (this.phoneNumber.val === "" || this.phoneNumber.val.length > 11) {
        this.phoneNumber.isValid = false;
        this.formIsValid = false;
      }
      if (this.username.val === "" || this.username.val.length > 20) {
        this.username.isValid = false;
        this.formIsValid = false;
      }
      if (!this.email.val || !this.validEmail(this.email.val)) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.showPassword) {
        if (this.password.val === "" || this.password.val.length > 30) {
          this.password.isValid = false;
          this.formIsValid = false;
        }
        if (this.newPassword.val === "" || this.newPassword.val.length > 30) {
          this.newPassword.isValid = false;
          this.formIsValid = false;
        }
        if (
          this.newPasswordCheck.val === "" ||
          this.newPasswordCheck.val.length > 30 ||
          !this.checkPassword
        ) {
          this.newPasswordCheck.isValid = false;
          this.formIsValid = false;
        }
      }
    },
    validEmail: function (email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formDataUser = {
        firstname: this.firstname.val,
        lastname: this.lastname.val,
        phoneNumber: this.phoneNumber.val,
        username: this.username.val,
        email: this.email.val,
        password: this.password.val,
        newPassword: this.newPassword.val,
        err: this.password,
      };

      this.$emit("save-user-data", formDataUser);
    },
  },
  computed: {
    checkPassword() {
      return this.newPassword.val === this.newPasswordCheck.val;
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

.btn-password {
  padding: 0.1rem 1rem;
  margin-top: 15px;
  font-weight: normal;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

.btn-base {
  margin-top: 15px;
}

.passwd {
  font-weight: bold;
}
</style>
