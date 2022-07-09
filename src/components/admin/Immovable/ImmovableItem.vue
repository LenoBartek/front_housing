<template>
  <div class="size">
    <tree-browser :nodes="nodes" @onClick="nodeWasClicked"> </tree-browser>
  </div>
</template>

<script>
import TreeBrowser from "../../tree/TreeBrowser.vue";

export default {
  components: {
    TreeBrowser,
  },
  emits: ["onClick"],
  props: {
    nodes: {
      type: Array,
    },
  },
  methods: {
    nodeWasClicked(node) {
      this.$emit("onClick", node);
    },
  },
};
</script>

<style scoped>
.list {
  position: relative;
  left: 0px;
  top: 10px;
  max-width: 300px;
  max-height: 600px;
  width: auto;
  height: auto;
  padding: 10px;
}

.size {
  position: relative;
  max-width: 800px;
  max-height: 600px;
  width: auto;
  height: auto;
  overflow: auto;
}
</style>
