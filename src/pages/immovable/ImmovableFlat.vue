<template>
  <section>
    <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <!-- <home-page> </home-page> -->
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
      selectedBuilding: null,
      error: null,
    };
  },
  created() {
    console.log(this.$route.params.id);
    this.loadBuildingID();
  },
  methods: {
    saveData(data) {
      this.selectedBuilding = this.getBuildingID;
      data
      //   this.$store.dispatch('immovable/addBuilding', data);
      //   this.$router.replace('/immovable');
    },
    async loadBuildingID() {
      try {
        await this.$store.dispatch(
          "immovable/loadBuildingID",
          this.$route.params.id
        );
      } catch (error) {
        this.error = error.message || "Spróbuj pownownie";
      }
    },
    handleError() {
      this.error = null;
    },
  },
  computed: {
    getBuildingID() {
      return this.$store.getters["immovable/buildingID"];
    },
  },
};
</script>
