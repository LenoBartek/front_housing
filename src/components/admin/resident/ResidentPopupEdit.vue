<template>
  <teleport to="body">
    <div class="backdrop">
      <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
        <p>{{ error }}</p>
      </base-dialog>
      <base-card>
        <div>
          <div v-if="!editUser && !editContract">
            <h3>Wybierz element do edytowania</h3>
            <base-button @click="editUserToggle">Mieszkańca</base-button>
            <base-button @click="editContractToggle">Umowe</base-button>
            <base-button mode="delete" @click="this.editToggle"
              >Anuluj</base-button
            >
          </div>
          <div v-if="this.editUser && this.user">
            <resident-form
              @save-resident-data="saveEditResident"
              :username2="this.user.username"
              :firstname2="this.user.firstname"
              :lastname2="this.user.lastname"
              :email2="this.user.email"
              :phoneNumber2="this.user.phoneNumber"
              :data="'user'"
              :editToggle="this.editToggle"
            >
            </resident-form>
          </div>

          <div v-if="this.editContract && this.getContract">
            <resident-form
              @save-resident-data="saveEditResident"
              :amountPeople2="this.getContract.amountPeople"
              :startTime2="this.getContract.startTime"
              :finishTime2="this.getContract.finishTime"
              :type2="this.getContract.type"
              :data="'contract'"
              :editToggle="this.editToggle"
            >
            </resident-form>
          </div>
        </div>
      </base-card>
    </div>
  </teleport>
</template>

<script>
import ResidentForm from "./ResidentForm.vue";

export default {
  props: ["editToggle", "user"],
  emits: ["status"],
  components: {
    ResidentForm,
  },
  data() {
    return {
      error: null,
      editUser: false,
      editContract: false,
      contractId: null,
    };
  },
  methods: {
    editUserToggle() {
      this.editUser = !this.editUser;
    },
    async editContractToggle() {
      await this.loadContrct();
      this.editContract = !this.editContract;
      this.contractId = this.getContract.id;
    },
    async loadContrct() {
      try {
        await this.$store.dispatch("resident/loadContract", this.user.id);
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
    },
    async saveEditResident(data) {
      data.user_id = this.user.id;
      data.contract_id = this.contractId;
      try {
        await this.$store.dispatch("resident/editResident", data);
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      if (!this.error) this.$emit("status", "edit_ok");
      else this.$emit("status", "edit_error");
    },
    handleError() {
      this.error = null;
    },
  },
  computed: {
    getContract() {
      return this.$store.getters["resident/contract"];
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
