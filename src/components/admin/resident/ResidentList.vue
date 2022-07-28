<template>
  <section>
    <button-header>
      <template #button>
        <base-button link :to="residentFormLink">Dodaj mieszkańca</base-button>
        <base-button @click="ratesToggle">Stawki</base-button>
      </template>

      <div v-if="showRates">
        <resident-rates> </resident-rates>
      </div>
      <div v-if="!showRates">
        <h2>Lista</h2>
      </div>
    </button-header>
  </section>
</template>

<script>
import ResidentRates from "./ResidentRates";

export default {
  components: {
    ResidentRates,
  },
  data() {
    return {
      showRates: false,
    };
  },
  methods: {
    ratesToggle() {
      this.showRates = !this.showRates;
    },
  },
  computed: {
    residentFormLink() {
      return this.$route.path + "/" + "addresident";
    },
  },
};
</script>
