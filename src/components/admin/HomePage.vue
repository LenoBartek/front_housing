<template>
  <section>
    <div class="flex-container full-height">
      <navbar> </navbar>
      <menu-admin> </menu-admin>
      <slot></slot>
    </div>
  </section>
</template>

<script>
import Navbar from "./Navbar.vue";
import MenuAdmin from "./MenuAdmin.vue";

export default {
  components: {
    MenuAdmin,
    Navbar,
  },
};
</script>
