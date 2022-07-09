<template>
  <section>
    <home-page> </home-page>
    <h2>Dodawanie budynku</h2>
    <base-card>
      <immovable-building-form @save-data-building="saveData"> </immovable-building-form>
    </base-card>
  </section>
</template>

<script>
import ImmovableBuildingForm from "../../components/admin/Immovable/ImmovableBuildingForm.vue";
export default {
  components: {
    ImmovableBuildingForm,
  },
   methods: {
    saveData(data) {
      // console.log(data)
      // this.$store.dispatch('coaches/registerCoach', data);
      
      this.$store.dispatch('immovable/addBuilding', data);
      this.$router.replace('/immovable');
    }
  }
};
</script>
