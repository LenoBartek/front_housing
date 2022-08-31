import authHeader from "../../../services/auth-header.js";

const initialPassword = "user1234";

export default {
  async loadFlats(context) {
    const response = await fetch(
      context.rootGetters.host + "/flats/available",
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

  async loadUsers(context) {
    const response = await fetch(
      context.rootGetters.host + "/users?role=USER",
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

    const users = [];
    for (const key in responseData) {
      const user = {
        id: responseData[key].id,
        firstname: responseData[key].firstname,
        lastname: responseData[key].lastname,
        phoneNumber: responseData[key].phoneNumber,
        username: responseData[key].username,
        email: responseData[key].email,
      };
      users.push(user);
    }

    context.commit("setUsers", users);
  },

  async deleteUser(context, id) {
    const response = await fetch(context.rootGetters.host + `/users/${id}`, {
      method: "DELETE",
      headers: authHeader(),
    });

    if (!response.ok) {
      const error = new Error("Nie udało się usunąć budynku!");
      throw error;
    }
  },

  async loadUserDetails(context, id) {
    const response = await fetch(context.rootGetters.host + `/users/${id}`, {
      headers: authHeader(),
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Nie udało się pobrać danych!"
      );
      throw error;
    }

    const detail = {
      user: {
        id: responseData.id,
        firstname: responseData.firstname,
        lastname: responseData.lastname,
        phoneNumber: responseData.phoneNumber,
        username: responseData.username,
        email: responseData.email,
      },
      contract: {
        id: responseData.contract.id,
        type: responseData.contract.type,
        amountPeople: responseData.contract.amountPeople,
        startTime: responseData.contract.startTime,
        finishTime: responseData.contract.finishTime,
      },
      flat: {
        id: responseData.contract.flat.id,
        storey: responseData.contract.flat.storey,
        number: responseData.contract.flat.number,
        nrStaircase: responseData.contract.flat.nrStaircase,
        areaM2: responseData.contract.flat.areaM2,
      },
      building: {
        id: responseData.contract.flat.building.id,
        name: responseData.contract.flat.building.name,
        town: responseData.contract.flat.building.town,
        street: responseData.contract.flat.building.street,
        number: responseData.contract.flat.building.number,
        zipCode: responseData.contract.flat.building.zipCode,
      },
      fee: {
        id: responseData.contract.fee.id,
        heating: responseData.contract.fee.heating,
        renovationFund: responseData.contract.fee.renovationFund,
        rent: responseData.contract.fee.rent,
        exploitation: responseData.contract.fee.exploitation,
        administration: responseData.contract.fee.administration,
        warmWater: responseData.contract.fee.warmWater,
        coldWater: responseData.contract.fee.coldWater,
        sewage: responseData.contract.fee.sewage,
        rubbish: responseData.contract.fee.rubbish,
        total: responseData.contract.fee.total,
      },
    };

    if (context.rootGetters.role == "USER") {
      context.commit("setUserDetails", detail);
    } else if (context.rootGetters.role == "ADMIN") {
      context.commit("setUsersDetails", detail);
    }
  },

  async loadContract(context, id) {
    const response = await fetch(
      context.rootGetters.host + `/users/${id}/contract`,
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

    const contract = {
      id: responseData.contract.id,
      type: responseData.contract.type,
      amountPeople: responseData.contract.amountPeople,
      startTime: responseData.contract.startTime,
      finishTime: responseData.contract.finishTime,
    };

    context.commit("setContract", contract);
  },

  async addContract(context, data) {
    var ContractData = null;

    if (data.contract.type == "LEASE_AGREEMENT") {
      ContractData = {
        type: data.contract.type,
        amountPeople: data.contract.amountPeople,
        startTime: data.contract.startTime + "T12:00:00Z",
        finishTime: data.contract.finishTime + "T12:00:00Z",
        user: {
          firstname: data.firstname,
          lastname: data.lastname,
          username: data.username,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: initialPassword,
        },
        flat: {
          id: data.flat_id,
        },
      };
    } else if (data.contract.type == "OWNERSHIP_AGREEMENT") {
      ContractData = {
        type: data.contract.type,
        amountPeople: data.contract.amountPeople,
        user: {
          firstname: data.firstname,
          lastname: data.lastname,
          username: data.username,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: initialPassword,
        },
        flat: {
          id: data.flat_id,
        },
      };
    }

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

  async editResident(context, data) {
    var residentData = null;

    if (data.user_id && data.username) {
      residentData = {
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        phoneNumber: data.phoneNumber,
      };

      const response = await fetch(
        context.rootGetters.host + `/users/${data.user_id}`,
        {
          method: "PUT",
          headers: authHeader(),
          body: JSON.stringify(residentData),
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        const error = new Error(
          responseData.message || "Nie udało się dodać budynku!"
        );
        throw error;
      }
    } else if (data.contract_id && data.contract.amountPeople) {
      residentData = {
        type: data.contract.type,
        amountPeople: data.contract.amountPeople,
        finishTime: data.contract.finishTime + "T12:00:00Z",
      };

      const response = await fetch(
        context.rootGetters.host + `/contracts/${data.contract_id}`,
        {
          method: "PUT",
          headers: authHeader(),
          body: JSON.stringify(residentData),
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        const error = new Error(
          responseData.message || "Nie udało się dodać budynku!"
        );
        throw error;
      }
    }
  },

  async loadRates(context) {
    const response = await fetch(context.rootGetters.host + "/rates", {
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

    if (!response.ok) {
      const responseData = await response.json();
      const error = new Error(
        responseData.message || "Nie udało się edytować danych!"
      );
      throw error;
    }
  },
};
