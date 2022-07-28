<template>
  <teleport to="body">
    <div class="backdrop">
      <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
        <p>{{ error }}</p>
      </base-dialog>
      <base-card>
        <div>
          <div v-if="this.rates">
            <resident-rates-form
              @save-rates-data="saveEditRates"
              :heatingM22="this.rates.heatingM2"
              :renovationFundM22="this.rates.renovationFundM2"
              :rentRentM22="this.rates.rentRentM2"
              :rentPropertyM22="this.rates.rentPropertyM2"
              :exploitationM22="this.rates.exploitationM2"
              :administrationM22="this.rates.administrationM2"
              :warmWaterPer2="this.rates.warmWaterPer"
              :coldWaterPer2="this.rates.coldWaterPer"
              :sewagePer2="this.rates.sewagePer"
              :rubbishPer2="this.rates.rubbishPer"
              :editToggle="this.editToggle"
            >
            </resident-rates-form>
          </div>
        </div>
      </base-card>
    </div>
  </teleport>
</template>

<script>
import ResidentRatesForm from "./ResidentRatesForm.vue";

export default {
  props: ["editToggle", "rates"],
  emits: ["status"],
  components: {
    ResidentRatesForm,
  },
  data() {
    return {
      error: null,
    };
  },
  methods: {
    async saveEditRates(data) {
      data.rates_id = this.rates.id;

      try {
        await this.$store.dispatch("resident/editRates", data);
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      if (!this.error) this.$emit("status", "ok");
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
