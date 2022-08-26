export default {
  setFaults(state, payload) {
    state.faults = payload
  },
  setFaultsDetails(state, payload) {
    state.faultsDetails = payload;
  },
  setFaultsImage(state, payload) {
    state.faultsImage = payload;
  },
  setFaultsError(state, payload) {
    state.error = payload;
  }
};
