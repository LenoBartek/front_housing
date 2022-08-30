<template>
  <section>
    <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <home-page> </home-page>
    <h2>Dodawanie Lokalu</h2>
    <base-card>
      <immovable-flat-form @save-data-flat="saveData"> </immovable-flat-form>
    </base-card>
  </section>
</template>

<script>
import ImmovableFlatForm from "../../components/admin/Immovable/ImmovableFlatForm.vue";
export default {
  components: {
    ImmovableFlatForm,
  },
  data() {
    return {
      error: null,
    };
  },
  created() {
    // this.loadBuildingID();
  },
  methods: {
    async saveData(data) {
      data.building = this.$route.params.id;
      try {
        await this.$store.dispatch("immovable/addFlat", data);
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      if (!this.error) this.$router.replace("/immovables");
    },
    // async loadBuildingID() {
    //   try {
    //     await this.$store.dispatch(
    //       "immovable/loadBuildingID",
    //       this.$route.params.id
    //     );
    //   } catch (error) {
    //     this.error = error.message || "Spróbuj pownownie";
    //   }
    // },
    handleError() {
      this.error = null;
    },
  },
};
</script>
