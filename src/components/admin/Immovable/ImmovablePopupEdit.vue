<template>
  <teleport to="body">
    <div class="backdrop">
      <base-dialog :show="!!error" title="Wystąpił błąd!" @close="handleError">
        <p>{{ error }}</p>
      </base-dialog>
      <base-card>
        <div>
          <div v-if="this.Building">
            <immovable-building-form
              @save-data-building="saveEditBuilding"
              :editToggle="this.editToggle"
              :name2="this.Building.name"
              :town2="this.Building.town"
              :street2="this.Building.street"
              :number2="this.Building.number"
              :zipCode2="this.Building.zipCode"
              :yearConstruction2="this.Building.yearConstruction"
              :areaM22="this.Building.areaM2"
              :numberStoreys2="this.Building.numberStoreys"
              :flatsPerStorey2="this.Building.flatsPerStorey"
              :staircase2="this.Building.staircase"
            >
            </immovable-building-form>
          </div>
          <div v-else-if="this.Flat">
            <immovable-flat-form
              @save-data-flat="saveEditFlat"
              :editToggle="this.editToggle"
              :storey2="this.Flat.storey"
              :number2="this.Flat.number"
              :nrStaircase2="this.Flat.nrStaircase"
              :areaM22="this.Flat.areaM2"
            >
            </immovable-flat-form>
          </div>
        </div>
      </base-card>
    </div>
  </teleport>
</template>

<script>
import ImmovableBuildingForm from "./ImmovableBuildingForm.vue";
import ImmovableFlatForm from "./ImmovableFlatForm.vue";

export default {
  props: ["Building", "Flat", "editToggle"],
  emits: ["status"],
  components: {
    ImmovableBuildingForm,
    ImmovableFlatForm,
  },
  data() {
    return {
      error: null,
    };
  },
  methods: {
    async saveEditBuilding(data) {
      data.id = this.Building.id;
      try {
        await this.$store.dispatch("immovable/editBuilding", data);
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      if (!this.error) this.$emit("status", "edit_building_ok");
    },
    async saveEditFlat(data) {
      data.id = this.Flat.id;
      data.building_id = this.Flat.building_id;
      try {
        await this.$store.dispatch("immovable/editFlat", data);
      } catch (error) {
        this.error = error.message || "Coś poszło nie tak :)";
      }
      if (!this.error) this.$emit("status", "edit_flat_ok");
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
