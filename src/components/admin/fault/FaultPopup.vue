<template>
  <teleport to="body">
    <div class="backdrop">
      <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
        <p>{{ error }}</p>
      </base-dialog>
      <base-card>
        <div v-if="this.fault">
          <h3>Czy ta usterka została naprawiona: {{ this.fault.title }}?</h3>
          <base-button @click="fixFault">Tak</base-button>
          <base-button mode="delete" @click="this.cancelToggle">Anuluj</base-button>
        </div>
      </base-card>
    </div>
  </teleport>
</template>

<script>
export default {
  props: ["cancelToggle", "fault"],
  emits: ["status"],
  data() {
    return {
      error: null,
    };
  },
  methods: {
    async fixFault() {
      try {
        await this.$store.dispatch("fault/fixFault", this.fault.id);
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      if (!this.error) this.$emit("status", 'fix_ok');
      else this.$emit("status", "fix_error");
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;
  .popup-inner {
    background: #fff;
    padding: 32px;
    overflow: auto;
  }
}
</style>
