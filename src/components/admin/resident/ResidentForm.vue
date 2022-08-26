<template>
  <form @submit.prevent="submitForm">
    <div v-if="this.data == 'user' || this.data == null">
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
    </div>
    <div v-if="this.data == 'contract' || this.data == null">
      <div :class="{ invalid: !amountPeople.isValid }">
        <label for="amountPeople">Ilość osób</label>
        <input
          type="number"
          id="amountPeople"
          v-model.trim="amountPeople.val"
          @blur="clearValidity('amountPeople')"
        />
      </div>
      <div v-if="!this.editToggle" :class="{ invalid: !startTime.isValid }">
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
    </div>
    <div v-if="this.data == null">
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
  emits: ["save-resident-data"],
  props: [
    "username2",
    "firstname2",
    "lastname2",
    "email2",
    "phoneNumber2",
    "amountPeople2",
    "finishTime2",
    "type2",
    "data",
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
      phoneNumber: {
        val: this.phoneNumber2 ? this.phoneNumber2 : "",
        isValid: true,
      },
      amountPeople: {
        val: this.amountPeople2 ? this.amountPeople2 : null,
        isValid: true,
      },
      startTime: {
        val: null,
        isValid: true,
      },
      finishTime: {
        val: this.finishTime2 ? this.formatDate(this.finishTime2) : null,
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
    formatDate(date) {
      const date2 = new Date(date);

      var month = "" + (date2.getMonth() + 1),
        day = "" + date2.getDate(),
        year = date2.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    validateForm() {
      this.formIsValid = true;
      if (this.data == "user" || this.data == null) {
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
        if (this.phoneNumber.val === "" || this.phoneNumber.val.length > 11) {
          this.phoneNumber.isValid = false;
          this.formIsValid = false;
        }
      }
      if (this.data == "contract" || this.data == null) {
        if (!this.amountPeople.val || this.amountPeople.val > 15) {
          this.amountPeople.isValid = false;
          this.formIsValid = false;
        }
        if (!this.data) {
          if (!this.startTime.val) {
            this.startTime.isValid = false;
            this.formIsValid = false;
          }
        }
        if (!this.finishTime.val || this.startTime.val > this.finishTime.val) {
          this.finishTime.isValid = false;
          this.formIsValid = false;
        }
        if (this.type.val === "") {
          this.typeUse.isValid = false;
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
        username: this.username.val,
        firstname: this.firstname.val,
        lastname: this.lastname.val,
        email: this.email.val,
        phoneNumber: this.phoneNumber.val,
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
