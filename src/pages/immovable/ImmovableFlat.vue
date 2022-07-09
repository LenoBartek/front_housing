<template>
  <section>
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
   methods: {
    saveData(data) {
      console.log(data)
      // this.$store.dispatch('coaches/registerCoach', data);
      
    //   this.$store.dispatch('immovable/addBuilding', data);
    //   this.$router.replace('/immovable');
    }
  }
};
</script>
