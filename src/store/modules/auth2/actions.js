import authHeader from "../../../services/auth-header.js";

export default {
  tryLogin(context) {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user) {
      // var userRole = "";
      // user.email == "admin@gmail.com" ? userRole = "ADMIN" : userRole = "USER";

      context.commit("setUser", {
        role: user.role,
        userId: user.id,
      });
      
      if (user.role == 'USER')
        context.commit('setBuildingId', {buildingId: parseInt(localStorage.getItem("buildingId"))});
    }
  },
  async loadUserId(context) {
    const response = await fetch(
      context.rootGetters.host + `/users/${context.getters.userId}/building`,
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
    localStorage.setItem("buildingId", responseData.buildingId);

    const buildingId = {
      buildingId: responseData.buildingId,
    };

    context.commit("setBuildingId", buildingId);
  },

};
