<template>
  <section>
    <body-frame>
      <header>
        <slot name="button"> </slot>
      </header>

      <div class="main-container">
        <div class="left-container">
          <slot name="left"> </slot>
        </div>
        <div class="right-container">
          <slot name="right"> </slot>
        </div>
      </div>
    </body-frame>
  </section>
</template>

<style scoped>
.main-container {
  display: flex;
  width: 100%;
  height: 89%;
  max-height: 89%;
}

.left-container {
  flex: 0 1 50%;
  min-height: 100%;
  max-width: 50%;
  /* background: #b1b6b3; */
  padding: 0.5em;
  box-shadow: 0 2px 8px rgba(63, 66, 231, 0.26);
  border-radius: 12px;
  overflow: auto;
}
.right-container {
  flex: 0 1 50%;
  display: flex;
  height: 100%;
  max-width: 50%;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 0.5em;
  overflow: auto;

  /* border: 1px solid red; */
  /* background-color: rgb(214, 224, 224); */
  border-radius: 12px;
  /* box-shadow: 0 2px 8px rgba(63, 66, 231, 0.26); */
}

header {
  width: 100%;
  padding: 0.55vw 1.5vw;
  background-color: #e0e0e0;
  display: flex;
  justify-content: left;
  align-items: center;
}

header a {
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

</style>
