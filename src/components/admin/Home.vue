<template>
  <div class="flex-container full-height">
    <Navbar/>
    <MenuAdmin/>
  </div>
</template>
<script>
import Navbar from "@/components/admin/Navbar";
import MenuAdmin from "@/components/admin/MenuAdmin";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {MenuAdmin, Navbar}
};
</script>
