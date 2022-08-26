import axios from "axios";
import authHeader from "../../../services/auth-header.js";

export default {
  async loadFaults(context, fixed) {
    const response = await fetch(
      context.rootGetters.host + `/faults/fixed?fixed=${fixed}`,
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

    const faults = [];
    for (const key in responseData) {
      const fault = {
        id: responseData[key].id,
        title: responseData[key].title,
        fixed: responseData[key].fixed,
        building: responseData[key].building,
      };
      faults.push(fault);
    }

    context.commit("setFaults", faults);
  },

  async loadFaultDetails(context, id) {
    const response = await fetch(context.rootGetters.host + `/faults/${id}`, {
      headers: authHeader(),
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Nie udało się pobrać danych!"
      );
      throw error;
    }

    const faultDetails = {
      id: responseData.id,
      title: responseData.title,
      description: responseData.description,
      fixed: responseData.fixed,
      executionDate: responseData.executionDate,
      building: {
        id: responseData.building.id,
        name: responseData.building.name,
        town: responseData.building.town,
        street: responseData.building.street,
        number: responseData.building.number,
        zipCode: responseData.building.zipCode,
      },
    };

    context.commit("setFaultsDetails", faultDetails);
  },

  async loadFaultImage(context, id) {
    const response = await fetch(
      context.rootGetters.host + `/faults/${id}/image`,
      {
        headers: authHeader(),
      }
    );

    if (!response.ok) {
      const error = new Error("Nie udało się pobrać danych!");
      throw error;
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    context.commit("setFaultsImage", blobUrl);
  },

  async fixFault(context, id) {
    const response = await fetch(
      context.rootGetters.host + `/faults/${id}/fixed?fixed=true`,
      {
        method: "PUT",
        headers: authHeader(),
      }
    );

    if (!response.ok) {
      const error = new Error( "Nie udało się naprawic usterki");
      throw error;
    }
  },

  async addFault(context, data) {
    let user = JSON.parse(localStorage.getItem("user"));

    const FaultData = {
      title: data.title,
      description: data.description,
      building: { id: data.building_id },
    };

    const json = JSON.stringify(FaultData);
    const blob = new Blob([json], {
      type: "application/json",
    });

    var formData = new FormData();

    formData.append("json", blob);
    formData.append("image", data.image);

    await axios
      .post(context.rootGetters.host + "/faults", formData, {
        headers: {
          Authorization: `${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        response
      })
      .catch((e) => {
        context.commit("setFaultsError", e.response.data.message);
      });
  },
};
