<template>
  <div>

    <ul v-for="node in nodes" :key="node.name"> 
       {{node.name}}
      <li v-for="child in node.children" :key="child.name">
        {{child.name}}
         </li>
      </ul>

    <div
     
      @click="nodeClicked"
      :style="{ 'margin-left': `${depth * 20}px` }"
      class="node"
    >
      <span v-if="hasChildren" class="type">
        {{ expanded ? "&#9660;" : "&#9658;" }}
      </span>
      <span v-else>&#9671; </span>
      
      {{ nodes.name }}
    </div>

    <div v-if="expanded">
      <TreeBrowser
        v-for="child in nodes"
        :key="child.name"
        :nodes="child"
        :depth="depth + 1"
        @onClick="(nodes) => $emit('onClick', nodes)"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: "TreeBrowser",
  emits: ["onClick"],
  props: {
    nodes: {
      type: Array,
    },
    depth: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
  methods: {
    nodeClicked() {
      this.expanded = !this.expanded;
      if (!this.hasChildren) {
        this.$emit("onClick", this.nodes);
      }
    },
  },
  computed: {
    hasChildren() {
      return this.nodes.children;
    },
  },
};
</script>

<style scoped>
.node {
  text-align: left;
  font-size: 18px;
  cursor: pointer;
}

.type {
  margin-right: 10px;
}

.pointer {
  cursor: pointer;
}
</style>
