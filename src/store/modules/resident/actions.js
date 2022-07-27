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
        phonenumber: data.phonenumber,
        password: "1234",
        role: "USER",
      },
      flat: {
        id: data.flat_id,
      }
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
};
