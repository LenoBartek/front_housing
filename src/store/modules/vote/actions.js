import axios from "axios";
import authHeader from "../../../services/auth-header.js";

export default {
  async loadVotes(context, finished) {
    const response = await fetch(
      context.rootGetters.host + `/votes?finished=${finished}`,
      {
        headers: authHeader(),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Nie udało się pobrać danych!"
      );
      throw error;
    }

    const votes = [];
    for (const key in responseData) {
      const vote = {
        id: responseData[key].id,
        title: responseData[key].title,
        upVote: responseData[key].upVote,
        downVote: responseData[key].downVote,
        finished: responseData[key].finished,
        building: {
          id: responseData[key].building.id,
          name: responseData[key].building.name,
          town: responseData[key].building.town,
          street: responseData[key].building.street,
        },
      };
      votes.push(vote);
    }

    context.commit("setVotes", votes);
  },

  async loadVoteDetails(context, id) {
    const response = await fetch(context.rootGetters.host + `/votes/${id}`, {
      headers: authHeader(),
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Nie udało się pobrać danych!"
      );
      throw error;
    }

    const voteDetails = {
      id: responseData.id,
      title: responseData.title,
      upVote: responseData.upVote,
      downVote: responseData.downVote,
      finished: responseData.finished,
      description: responseData.description,
      dateFinish: responseData.dateFinish,
    };

    context.commit("setVoteDetails", voteDetails);
  },

  async loadVotePdf(context, id) {
    const response = await fetch(
      context.rootGetters.host + `/votes/${id}/pdf`,
      {
        headers: authHeader(),
      }
    );

    if (!response.ok) {
      const error = new Error("Nie udało się pobrać danych!");
      throw error;
    }

    const blob = await response.blob();
    var file = new Blob([blob], { type: "application/pdf" });
    const blobUrl = window.URL.createObjectURL(file);

    context.commit("setVotePdf", blobUrl);
  },

  async addVote(context, data) {
    let user = JSON.parse(localStorage.getItem("user"));

    const VoteData = {
      title: data.title,
      description: data.description,
      dateFinish: data.dateFinish,
      building: { id: data.building_id },
    };

    const json = JSON.stringify(VoteData);
    const blob = new Blob([json], {
      type: "application/json",
    });

    var formData = new FormData();

    formData.append("json", blob);
    formData.append("pdf", data.pdf);

    await axios
      .post(context.rootGetters.host + "/votes", formData, {
        headers: {
          Authorization: `${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        response;
      })
      .catch((e) => {
        context.commit("setVotesError", e.response.data.message);
      });
  },

  async castVote(context, data) {
    const response = await fetch(
      context.rootGetters.host + `/votes/${data.voteId}/user/${data.userId}/?vote=${data.vote}`,
      {
        method: "PUT",
        headers: authHeader(),
      }
    );

    if (!response.ok) {
      const responseData = await response.json();
      const error = new Error(
        responseData.message || "Nie udało się oddać głosu!"
      );
      throw error;
    }
  },

  async loadVotesForUsers(context, data) {
    const response = await fetch(
      context.rootGetters.host + `/buildings/${data.buildingId}/votes?finished=${data.finished}`,
      {
        headers: authHeader(),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Nie udało się pobrać danych!"
      );
      throw error;
    }

    const votesData = {
      id: responseData.id,
      name: responseData.name,
      votes: [],
    };

    for (const key in responseData.votes){
      const vote = {
        id: responseData.votes[key].id,
        title: responseData.votes[key].title,
        upVote: responseData.votes[key].upVote,
        downVote: responseData.votes[key].downVote,
        dateFinish: responseData.votes[key].dateFinish,
        finished: responseData.votes[key].finished,
      }
      votesData.votes.push(vote);
    }

    context.commit("setVotes", votesData.votes);
  },

};
