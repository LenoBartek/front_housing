<template>
  <section>
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
    };
  },
  methods: {
    saveData(data) {
      console.log(data);
      // this.$store.dispatch('coaches/registerCoach', data);

      //   this.$store.dispatch('immovable/addBuilding', data);
      //   this.$router.replace('/immovable');
    },
    async loadBuildings() {
      try {
        await this.$store.dispatch("immovable/loadBuildings");
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
    },
  },
  created() {
    this.loadBuildings();

    const data = this.$store.getters["immovable/nodes_2"];
    console.log("data ", data);
    for (const key in data) {
      if (data[key].id == this.$route.params.id) {
        this.selectedBuilding = data[key];
        console.log('asdaada',data[key])
        break;
      }
    }
    console.log(
      "this building",
      this.selectedBuilding,
      "id",
      this.$route.params.id
    );
  },
};
</script>
