<template>
  <section>
    <body-frame>
      <header>
        <slot name="button"> </slot>
      </header>
      <div>
        <slot> </slot>
      </div>
    </body-frame>
  </section>
</template>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #e0e0e0;
  display: flex;
  justify-content: left;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}
</style>
