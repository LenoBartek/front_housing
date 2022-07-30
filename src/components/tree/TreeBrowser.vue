<template>
  <div>
    <div v-for="node in nodes" :key="node.name" class="node">
      <span
        :style="{ 'margin-left': `${depth * 25}px` }"
        class="type"
        @click="nodeClicked(node)"
        v-if="depth == 0"
      >
        <i class="fa-solid fa-building"></i>
      </span>

      <span
        :style="{ 'margin-left': `${depth * 25}px` }"
        class="type"
        @click="nodeClicked(node)"
        v-if="depth == 1"
      >
        <i class="fa-solid fa-stairs"></i>
      </span>

      <span
        :style="{ 'margin-left': `${depth * 25}px` }"
        class="type"
        @click="nodeClicked(node)"
        v-if="depth == 2"
      >
        <i class="fa-solid fa-house"></i>
      </span>

      <span tabindex="1" @click="isSelected(node, depth)"
        >{{ node.name }}
      </span>

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
        } else {
          this.expanded.splice(this.expanded.indexOf(node));
        }
      }
    },
    isSelected(node, depth) {
      if (depth != 1) {
        this.$emit("onClick", node);
      }
    },
  },
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

.fa-solid {
  color: rgb(134, 111, 111);
}

.fa-solid:hover {
  content: "";
  color: rgb(123, 202, 103);
}
</style>
