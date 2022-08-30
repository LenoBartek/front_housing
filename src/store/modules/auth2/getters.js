export default {
  role(state) {
    return state.role;
  },
  userId(state) {
    return state.userId;
  },
  isAuthenticated(state) {
    return !!state.role;
  },
  buildingId(state) {
    return state.buildingId;
  }
};
