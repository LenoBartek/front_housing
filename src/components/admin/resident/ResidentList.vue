<template>
  <section>
    <half-page>
      <template #button>
        <base-button link :to="residentFormLink"
          >Dodaj mieszkańca/umowe</base-button
        >
      </template>
    </half-page>
  </section>
</template>

<script>
export default {
  computed: {
    residentFormLink() {
      return this.$route.path + "/" + "addresident";
    },
  },
};
</script>
