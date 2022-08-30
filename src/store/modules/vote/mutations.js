export default {
  setVotes(state, payload) {
    state.votes = payload;
  },
  setVoteDetails(state, payload) {
    state.voteDetails = payload;
  },
  setVotePdf(state, payload) {
    state.votePdf = payload
  },
  setVotesError(state, payload) {
    state.error = payload;
  }
};
