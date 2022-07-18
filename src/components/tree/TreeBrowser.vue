<template>
  <div>
    <div v-for="node in nodes" :key="node.name" class="node">
      <span
        :style="{ 'margin-left': `${depth * 20}px` }"
        class="type"
        @click="nodeClicked(node)"
        
        >{{ isExpanded(node) ? "&#9660;" : "&#9658;" }} 
      </span>
    
      <span 
      tabindex="1"
      @click="isSelected(node, depth)"
      >{{ node.name }} </span>

      <TreeBrowser
        v-if="isExpanded(node) && node.children"
        :nodes="node.children"
        :depth="depth + 1"
        @onClick="(node) => $emit('onClick', node)"
      />
    </div>

  </div>
</template>

<script>
export default {
  // "&#9660;" : "&#9658; "&#9660;" : "&#127968;" "
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
      expanded: [],
    };
  },
  methods: {
    isExpanded(node) {
      return this.expanded.indexOf(node) !== -1;
    },
    nodeClicked(node) {
      if (node.children) {
        if (!this.isExpanded(node)) {
          this.expanded.push(node);
          // this.$emit("onClick", node);
        } else {
          this.expanded.splice(this.expanded.indexOf(node));
          // this.$emit("onClick", node);
        }
      }
    },
    isSelected(node, depth) {
      if(depth != 1) {
      this.$emit("onClick", node);
      }
    },
  },
  computed: {},
};
</script>

<style scoped>
.node {
  text-align: left;
  font-size: 18px;
}

span {
  cursor: pointer;
}
span:focus {
  cursor: pointer;
  background-color: rgb(155, 174, 180);
}

.type {
  margin-right: 10px;
  cursor: pointer;
}
</style>
