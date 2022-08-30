import authHeader from "../../../services/auth-header.js";

export default {
  async loadNotices(context, archived) {
    const response = await fetch(
      context.rootGetters.host + `/notices/archived?archived=${archived}`,
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

    const notices = [];
    for (const key in responseData) {
      const notice = {
        id: responseData[key].id,
        title: responseData[key].title,
        archived: responseData[key].archived,
        executionDate: responseData[key].executionDate,
        building: {
          id: responseData[key].building.id,
          name: responseData[key].building.name,
          town: responseData[key].building.town,
          street: responseData[key].building.street,
          number: responseData[key].building.number,
          zipCode: responseData[key].building.zipCode,
        },
      };
      notices.push(notice);
    }

    context.commit("setNotices", notices);
  },

  async loadNoticeDetails(context, id) {
    const response = await fetch(context.rootGetters.host + `/notices/${id}`, {
      headers: authHeader(),
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Nie udało się pobrać danych!"
      );
      throw error;
    }

    const noticeDetails = {
      id: responseData.id,
      title: responseData.title,
      description: responseData.description,
      archived: responseData.archived,
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

    context.commit("setNoticesDetails", noticeDetails);
  },

  async addNotice(context, data) {
    const noticeData = {
      title: data.title,
      description: data.description,
      executionDate: data.executionDate,
      building: {id: data.building_id}
    };

    const response = await fetch(context.rootGetters.host + "/notices", {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(noticeData),
    });

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || "Nie udało się dodać budynku!"
      );
      throw error;
    }
  },

  async loadNoticesForUsers(context, data) {
    const response = await fetch(
      context.rootGetters.host + `/buildings/${data.buildingId}/notices?archived=${data.archived}`,
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

    const noticesData = {
      id: responseData.id,
      name: responseData.name,
      notices: [],
    };

    for (const key in responseData.notices){
      const notice = {
        id: responseData.notices[key].id,
        title: responseData.notices[key].title,
        archived: responseData.notices[key].archived,
        executionDate: responseData.notices[key].executionDate,
      }
      noticesData.notices.push(notice);
    }

    context.commit("setNotices", noticesData.notices);
  },
};
