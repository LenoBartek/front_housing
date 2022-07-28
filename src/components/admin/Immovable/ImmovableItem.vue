<template>
  <div>
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
