<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    }
  }
}
</script>

<style scoped>
button,
a {
  text-decoration: none !important;
  padding: 0.75vw 1.5vw;
  font: inherit;
  background-color: #4f925b;
  border: 1px solid #4f925b;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #085a05;
  border-color: #085a05;
}

.flat {
  background-color: transparent;
  color: #085a05;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #085a05;
  color: #085a05;
}

.delete {
  background-color: #c95757;
  border-color: #c95757;
  color: white;
}
.delete:hover,
.delete:active {
  background-color: #b92c08;
  border-color: #b92c08;
}

.edit {
  background-color: #df9848;
  border-color: #df9848;
  color: white;
}
.edit:hover,
.edit:active {
  background-color: #e6870b;
  border-color: #e6870b;
}


.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #707e70;
}
</style>