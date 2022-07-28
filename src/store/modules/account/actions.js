import authHeader from "../../../services/auth-header.js";

export default {
    async loadFlats(context) {
        const response = await fetch(context.rootGetters.host + "/flats", {
          headers: authHeader(),
        });
        const responseData = await response.json();
    
        if (!response.ok) {
          const error = new Error(
            responseData.message || "Nie udało się pobrać danych!"
          );
          throw error;
        }
    
        const flats = [];
        for (const key in responseData) {
          const flat = {
            id: responseData[key].id,
            storey: responseData[key].storey,
            number: responseData[key].number,
            nrStaircase: responseData[key].nrStaircase,
            areaM2: responseData[key].areaM2,
            typeUse: responseData[key].typeUse,
            building: responseData[key].building,
          };
          flats.push(flat);
        }
        context.commit("setFlats", flats);
      },
};
