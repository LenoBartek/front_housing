<template>
  <section>
    <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <home-page> </home-page>
    <h2>Dodawanie budynku</h2>
    <base-card>
      <immovable-building-form @save-data-building="saveData">
      </immovable-building-form>
    </base-card>
  </section>
</template>

<script>
import ImmovableBuildingForm from "../../components/admin/Immovable/ImmovableBuildingForm.vue";
export default {
  components: {
    ImmovableBuildingForm,
  },
  data() {
    return {
      error: null,
    };
  },
  methods: {
    async saveData(data) {
      try {
        await this.$store.dispatch("immovable/addBuilding", data);
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      if (!this.error) this.$router.replace("/immovables");
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>
