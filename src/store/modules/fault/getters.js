export default {
  faults(state) {
    return state.faults;
  },
  hasFaults(state) {
    return state.faults && state.faults.length > 0;
  },
  faultsDetails(state) {
    return state.faultsDetails;
  },
  faultsImage(state) {
    return state.faultsImage;
  },
  faultError(state) {
    return state.error;
  }
};
