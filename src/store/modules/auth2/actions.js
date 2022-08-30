import authHeader from "../../../services/auth-header.js";

export default {
  tryLogin(context) {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user) {
      var userRole = "";
      user.email == "admin@gmail.com" ? userRole = "ADMIN" : userRole = "USER";

      context.commit("setUser", {
        role: userRole,
        userId: user.id,
        
      });
      
      if (userRole == 'USER')
        context.commit('setBuildingId', {buildingId: parseInt(localStorage.getItem("buildingId"))});
    }
  },
  async loadUserId(context) {
    const response = await fetch(
      context.rootGetters.host + `/users/${context.getters.userId}`,
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
    localStorage.setItem("buildingId", responseData.contract.flat.building.id);

    const buildingId = {
      buildingId: responseData.contract.flat.building.id,
    };

    context.commit("setBuildingId", buildingId);
  },

};
