<template>
  <teleport to="body">
    <div class="backdrop">
      <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
        <p>{{ error }}</p>
      </base-dialog>
      <base-card>
        <div>
          <div v-if="this.user">
            <account-data-form
              @save-user-data="saveEditUser"
              :firstname2="this.user.firstname"
              :lastname2="this.user.lastname"
              :phoneNumber2="this.user.phoneNumber"
              :username2="this.user.username"
              :email2="this.user.email"
              :editToggle="this.editToggle"
            >
            </account-data-form>
          </div>
        </div>
      </base-card>
    </div>
  </teleport>
</template>

<script>
import AccountDataForm from "./AccountDataForm.vue";

export default {
  props: ["editToggle", "user"],
  emits: ["status"],
  components: {
    AccountDataForm,
  },
  data() {
    return {
      error: null,
      badPassword: false,
    };
  },
  methods: {
    async saveEditUser(data) {
      data.user_id = this.user.id;
      this.badPassword = false;
      try {
        await this.$store.dispatch("account/editUser", data);
      } catch (error) {
        if (error.status == 400) this.badPassword = true;
        else this.error = error.message || "Coś poszło nie tak :)";
      }
      if (!this.badPassword && !this.error) this.$emit("status", "ok");
      else data.err.isValid = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;
  .popup-inner {
    background: #fff;
    padding: 32px;
    overflow: auto;
  }
}
</style>
