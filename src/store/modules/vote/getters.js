export default {
  votes(state) {
    return state.votes;
  },
  hasVotes(state) {
    return state.votes && state.votes.length > 0;
  },
  voteDetails(state) {
    return state.voteDetails;
  },
  votePdf(state) {
    return state.votePdf;
  },
  voteError(state) {
    return state.error;
  }
};
