export default {
  setUser(state, payload) {
    state.role = payload.role;
    state.userId = payload.userId;
  },
  setBuildingId(state, payload) {
    state.buildingId = payload.buildingId;
  },
};
