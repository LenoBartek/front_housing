import authHeader from "../../../services/auth-header.js";

const initialPassword = "user1234";

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
    console.log("contractData: ", ContractData);

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
    const response = await fetch(context.rootGetters.host + `/rates/${1}`, {
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
      id: responseData.id,
      heatingM2: responseData.heatingM2,
      renovationFundM2: responseData.renovationFundM2,
      rentRentM2: responseData.rentRentM2,
      rentPropertyM2: responseData.rentPropertyM2,
      exploitationM2: responseData.exploitationM2,
      administrationM2: responseData.administrationM2,
      warmWaterPer: responseData.warmWaterPer,
      coldWaterPer: responseData.coldWaterPer,
      sewagePer: responseData.sewagePer,
      rubbishPer: responseData.rubbishPer,
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
