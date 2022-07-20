export default {
  // addBuilding(state, payload) {
  //   state.nodes_2.push(payload);
  // },
  setBuildings(state, payload) {
    state.nodes_2 = payload;
  },
  setBuildingID(state, payload) {
    state.buildingID = payload;
  },
  setEditMode(state){
    state.editMode = !state.editMode;
  }

};
