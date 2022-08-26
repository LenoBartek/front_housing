export default {
  notices(state) {
    return state.notices;
  },
  hasNotices(state) {
    return state.notices && state.notices.length > 0;
  },
  noticesDetails(state) {
    return state.noticesDetails;
  }
};
