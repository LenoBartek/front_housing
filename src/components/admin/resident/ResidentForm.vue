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
    <div :class="{ invalid: !phonenumber.isValid }">
      <label for="phonenumber">Numer telefonu</label>
      <input
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
        placeholder="123-456-789"
        id="phonenumber"
        v-model.trim="phonenumber.val"
        @blur="clearValidity('phonenumber')"
      />
    </div>
    <div :class="{ invalid: !amountPeople.isValid }">
      <label for="amountPeople">Ilość osób</label>
      <input
        type="number"
        id="amountPeople"
        v-model.trim="amountPeople.val"
        @blur="clearValidity('amountPeople')"
      />
    </div>
    <div :class="{ invalid: !startTime.isValid }">
      <label for="startTime">Rozpoczęcie najmu</label>
      <input
        type="date"
        min="2000-01-02"
        id="startTime"
        v-model.trim="startTime.val"
        @blur="clearValidity('startTime')"
      />
    </div>
    <div :class="{ invalid: !finishTime.isValid }">
      <label for="finishTime">Zakończenie najmu</label>
      <input
        type="date"
        min="2000-01-02"
        id="finishTime"
        v-model.trim="finishTime.val"
        @blur="clearValidity('finishTime')"
      />
    </div>
    <div :class="{ invalid: !type.isValid }">
      <h3>Rodzaj użytkowania:</h3>
      <div>
        <input
          type="radio"
          id="lease_agreement"
          value="LEASE_AGREEMENT"
          v-model="type.val"
          @blur="clearValidity('type')"
        />
        <label for="type">Wynajem</label>
      </div>

      <input
        type="radio"
        id="ownership_agreement"
        value="OWNERSHIP_AGREEMENT"
        v-model="type.val"
        @blur="clearValidity('type')"
      />
      <label for="type">Na własność</label>
    </div>

    <p v-if="!formIsValid">Uzupełnij poprawnie dane!</p>
     <div v-if="!this.editToggle">
      <base-button class="btn-base">Dodaj</base-button>
    </div>
    <div v-else-if="this.editToggle">
      <base-button class="btn-base">Zatwierdź</base-button>
      <base-button class="btn-base" mode="delete" @click="this.editToggle">Anuluj</base-button>
    </div>

  </form>
</template>

<script>
export default {
  emits: ["save-resident-data"],
  props: [
    "username2",
    "firstname2",
    "lastname2",
    "email2",
    "phonenumber2",
    "amountPeople2",
    "startTime2",
    "finishTime2",
    "type2",
    "editToggle",
  ],
  data() {
    return {
      username: {
        val: this.username2 ? this.username2 : "",
        isValid: true,
      },
      firstname: {
        val: this.firstname2 ? this.firstname2 : "",
        isValid: true,
      },
      lastname: {
        val: this.lastname2 ? this.lastname2 : "",
        isValid: true,
      },
      email: {
        val: this.email2 ? this.email2 : null,
        isValid: true,
      },
      phonenumber: {
        val: this.phonenumber2 ? this.phonenumber2 : "",
        isValid: true,
      },
      amountPeople: {
        val: this.amountPeople2 ? this.amountPeople2 : null,
        isValid: true,
      },
      startTime: {
        val: this.startTime2 ? this.startTime2 : null,
        isValid: true,
      },
      finishTime: {
        val: this.finishTime2 ? this.finishTime2 : null,
        isValid: true,
      },
      type: {
        val: this.type2 ? this.type2 : "",
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

      if (this.username.val === "" || this.username.val.length > 20) {
        this.username.isValid = false;
        this.formIsValid = false;
      }
      if (this.firstname.val === "" || this.firstname.val.length > 20) {
        this.firstname.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastname.val === "" || this.lastname.val.length > 20) {
        this.lastname.isValid = false;
        this.formIsValid = false;
      }
      if (!this.email.val || !this.validEmail(this.email.val)) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.phonenumber.val === "" || this.phonenumber.val.length > 11) {
        this.phonenumber.isValid = false;
        this.formIsValid = false;
      }
      if (!this.amountPeople.val || this.amountPeople.val > 15) {
        this.amountPeople.isValid = false;
        this.formIsValid = false;
      }
      if (!this.startTime.val) {
        this.startTime.isValid = false;
        this.formIsValid = false;
      }
      if (!this.finishTime.val || this.startTime.val > this.finishTime.val) {
        this.finishTime.isValid = false;
        this.formIsValid = false;
      }
      if (this.type.val === "") {
        this.typeUse.isValid = false;
        this.formIsValid = false;
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
        username: this.username.val,
        firstname: this.firstname.val,
        lastname: this.lastname.val,
        email: this.email.val,
        phonenumber: this.phonenumber.val,
        contract: {
          amountPeople: this.amountPeople.val,
          startTime: this.startTime.val,
          finishTime: this.finishTime.val,
          type: this.type.val,
        },
      };

      this.$emit("save-resident-data", formDataUser);
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
