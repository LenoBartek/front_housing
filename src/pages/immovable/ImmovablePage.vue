<template>
  <section>
    <home-page> </home-page>
    <immovable-list> </immovable-list>
    <router-view> </router-view>
  </section>
</template>

<script>
import ImmovableList from "../../components/admin/Immovable/ImmovableList.vue";

export default {
  components: {
    ImmovableList,
  },
};
</script>
