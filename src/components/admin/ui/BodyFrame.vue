<template>
  <div class="body">
    <slot></slot>
  </div>
</template>

<style scoped>
.body {
  position: fixed;
  text-decoration: none;
  left: 16%;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  height: 80vh;
  width: 83vw;
  font-size: 20px;
  background-color: #f1f1f1;
  box-sizing: border-box;
  display: inline-block;
}
</style>
