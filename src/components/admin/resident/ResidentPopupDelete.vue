<template>
  <teleport to="body">
    <div class="backdrop">
      <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
        <p>{{ error }}</p>
      </base-dialog>
      <base-card>
        <div v-if="this.user">
          <h3>Czy napewno chcesz usunąć mieszkańca: {{ this.user.firstname + " " + this.user.lastname }}?</h3>
          <base-button mode="delete" @click="deleteUser">Usuń</base-button>
          <base-button @click="this.deleteToggle">Anuluj</base-button>
        </div>
      </base-card>
    </div>
  </teleport>
</template>

<script>
export default {
  props: ["deleteToggle", "user"],
  emits: ["status"],
  data() {
    return {
      error: null,
    };
  },
  methods: {
    async deleteUser() {
      try {
        await this.$store.dispatch(
          "resident/deleteUser",
          this.user.id
        );
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      if (!this.error)
      {
       const user2 = JSON.parse(JSON.stringify(this.user));
       user2.status = "delete_ok";
       this.$emit("status", user2);
      }
      else this.$emit("status", "delete_error");
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
