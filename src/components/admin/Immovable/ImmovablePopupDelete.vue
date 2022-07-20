<template>
  <teleport to="body">
    <div class="backdrop">
      <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
        <p>{{ error }}</p>
      </base-dialog>
      <base-card>
        <div v-if="this.building">
          <h3>Czy napewno chcesz usunąć budnyek: {{ this.building.name }}?</h3>
          <base-button mode="delete" @click="deleteBuilding">Usuń</base-button>
          <base-button @click="this.deleteToggle">Anuluj</base-button>
        </div>
        <div v-else-if="this.flat">
          <h3>
            Czy napewno chcesz usunąć mieszkanie: Lokal {{ this.flat.number }}?
          </h3>
          <base-button mode="delete" @click="deleteFlat">Usuń</base-button>
          <base-button @click="this.deleteToggle">Anuluj</base-button>
        </div>
      </base-card>
    </div>
  </teleport>
</template>

<script>
export default {
  props: ["deleteToggle", "building", "flat"],
  emits: ["status"],
  components: {},
  data() {
    return {
      error: null,
    };
  },
  methods: {
    async deleteBuilding() {
      try {
        await this.$store.dispatch(
          "immovable/deleteBuilding",
          this.building.id
        );
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      if (!this.error) this.$emit("status", "ok");
    },
    async deleteFlat() {
      try {
        await this.$store.dispatch(
          "immovable/deleteFlat",
          this.flat.id
        );
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      if (!this.error) this.$emit("status", "ok");
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
