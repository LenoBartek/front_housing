export default {
    nodes(state) {
        return state.nodes;
    },
    hasNodes(state) {
        return state.nodes_2 && state.nodes_2.length > 0;
    },
    nodes_2(state) {
        return state.nodes_2;
    }
}