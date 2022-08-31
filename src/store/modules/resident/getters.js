export default {
  flats(state) {
    return state.flats;
  },
  hasFlats(state) {
    return state.flats && state.flats.length > 0;
  },
  rates(state) {
    return state.rates;
  },
  users(state) {
    return state.users;
  },
  hasUsers(state) {
    return state.users && state.users.length > 0;
  },
  usersDetails(state) {
    return state.usersDetails;
  },
  userDetails(state) {
    return state.userDetails;
  },
  hasUsersDetails(state) {
    return state.usersDetails && state.usersDetails.length > 0;
  },
  contract(state) {
    return state.contract;
  }
};
