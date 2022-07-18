import authHeader from "../../../services/auth-header.js";

export default {
  async addBuilding(context, data) {
    const buildingData = {
      name: data.name,
      town: data.town,
      street: data.street,
      number: data.number,
      zipCode: data.zipCode,
      yearConstruction: data.yearConstruction,
      areaM2: data.areaM2,
      numberStoreys: data.numberStoreys,
      flatsPerStorey: data.flatsPerStorey,
      staircase: data.staircase,
      flats: [],
    };
    console.log('bdada',buildingData)
    const response = await fetch(
      context.rootGetters.host + "/buildings",
      {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(buildingData),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error
    }

    context.commit("addBuilding", buildingData);
  },

  async loadBuildings(context) {
    const response = await fetch(
      context.rootGetters.host + "/buildings",
      {
        headers: authHeader(),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Nie udało się pobrać danych!");
      throw error;
    }

    const buildings = [];
    for (const key in responseData) {
      const building = {
        id: responseData[key].id,
        name: responseData[key].name,
        town: responseData[key].town,
        street: responseData[key].street,
        number: responseData[key].number,
        zipCode: responseData[key].zipCode,
        yearConstruction: responseData[key].yearConstruction,
        areaM2: responseData[key].areaM2,
        numberStoreys: responseData[key].numberStoreys,
        flatsPerStorey: responseData[key].flatsPerStorey,
        staircase: responseData[key].staircase,
        flats: responseData[key].flats,
      };
      buildings.push(building);
    }
    context.commit('setBuildings', buildings)
  },
};
