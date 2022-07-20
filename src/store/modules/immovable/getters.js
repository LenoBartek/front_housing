export default {
  nodes_2(state) {
    return state.nodes_2;
  },
  hasNodes(state) {
    return state.nodes_2 && state.nodes_2.length > 0;
  },
  buildingID(state) {
    return state.buildingID;
  },
  editStatus(state) {
    return state.editMode;
  }

};
