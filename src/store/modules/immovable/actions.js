export default {
  async addBuilding(context, data) {
    const buildingData = {
      id: "n12",
      name: data.name,
      town: data.town,
      street: data.street,
      number: data.number,
      zipCode: data.zipCode,
      yearConstruction: data.yearConstruction,
      areaM2: data.areaM2,
      numberStoreys: data.numberStoreys,
      flats: [],
    };

    const response = await fetch(
      "https://vue-http-demo-8c297-default-rtdb.europe-west1.firebasedatabase.app/buildings.json",
      {
        method: "POST",
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
      "https://vue-http-demo-8c297-default-rtdb.europe-west1.firebasedatabase.app/buildings.json"
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
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
        flats: responseData[key].flats,
      };
      buildings.push(building);
      context.commit('addBuilding', building)
      console.log(building)
    }
    //context.commit('addBuilding', buildings)

  },
};
