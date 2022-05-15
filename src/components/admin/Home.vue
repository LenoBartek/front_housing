<template>
  <div class="flex-container full-height">
    <Navbar/>
    <MenuAdmin/>
    <Body/>
  </div>
</template>
<script>
import Navbar from "@/components/admin/Navbar";
import MenuAdmin from "@/components/admin/MenuAdmin";
import Body from "@/components/admin/Body";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {Body, MenuAdmin, Navbar}
};
</script>
