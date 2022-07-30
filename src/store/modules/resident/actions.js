import authHeader from "../../../services/auth-header.js";

const initialPassword = "user1234";

export default {
  async loadFlats(context) {
    const response = await fetch(context.rootGetters.host + "/flats/available", {
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
        building: responseData[key].building,
      };
      flats.push(flat);
    }
    context.commit("setFlats", flats);
  },

  async addContract(context, data) {
    const ContractData = {
      type: data.contract.type,
      amountPeople: data.contract.amountPeople,
      startTime: data.contract.startTime + "T12:00:00Z",
      finishTime: data.contract.finishTime + "T12:00:00Z",
      user: {
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        phoneNumber: data.phonenumber,
        password: initialPassword
      },
      flat: {
        id: data.flat_id
      },
    };

    const response = await fetch(context.rootGetters.host + "/contracts", {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(ContractData),
    });

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || "Nie udało się dodać budynku!"
      );
      throw error;
    }
  },

  async loadRates(context) {
    const response = await fetch(context.rootGetters.host + '/rates', {
      headers: authHeader(),
    });

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || "Nie udało się pobrać danych!"
      );
      throw error;
    }

    const rates = {
      id: responseData[0].id,
      heatingM2: responseData[0].heatingM2,
      renovationFundM2: responseData[0].renovationFundM2,
      rentRentM2: responseData[0].rentRentM2,
      rentPropertyM2: responseData[0].rentPropertyM2,
      exploitationM2: responseData[0].exploitationM2,
      administrationM2: responseData[0].administrationM2,
      warmWaterPer: responseData[0].warmWaterPer,
      coldWaterPer: responseData[0].coldWaterPer,
      sewagePer: responseData[0].sewagePer,
      rubbishPer: responseData[0].rubbishPer,
    };

    context.commit("setRates", rates);
  },

  async editRates(context, data) {
    const ratesData = {
      heatingM2: data.heatingM2,
      renovationFundM2: data.renovationFundM2,
      rentRentM2: data.rentRentM2,
      rentPropertyM2: data.rentPropertyM2,
      exploitationM2: data.exploitationM2,
      administrationM2: data.administrationM2,
      warmWaterPer: data.warmWaterPer,
      coldWaterPer: data.coldWaterPer,
      sewagePer: data.sewagePer,
      rubbishPer: data.rubbishPer,
    };

    const response = await fetch(
      context.rootGetters.host + `/rates/${data.rates_id}`,
      {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(ratesData),
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || "Nie udało się edytować danych!"
      );
      throw error;
    }
  },
};
