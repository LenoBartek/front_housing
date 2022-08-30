<template>
  <section>
    <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <home-page> </home-page>
    <base-card>
      <resident-form @save-resident-data="saveResidentData"> </resident-form>
    </base-card>
  </section>
</template>

<script>
import ResidentForm from "../../components/admin/resident/ResidentForm.vue";

export default {
  components: {
    ResidentForm,
  },
  data() {
    return {
      error: null,
    };
  },
  methods: {
    async saveResidentData(data) {
      data.flat_id = this.$route.params.id;
      try {
        await this.$store.dispatch("resident/addContract", data);
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }

      if (!this.error) this.$router.replace("/residents");
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>
