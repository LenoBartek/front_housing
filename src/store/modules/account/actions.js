import authHeader from "../../../services/auth-header.js";

export default {
  async loadUser(context) {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(
      context.rootGetters.host + `/users/${user.id}`,
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

    const userData = {
      id: responseData.id,
      firstname: responseData.firstname,
      lastname: responseData.lastname,
      phoneNumber: responseData.phoneNumber,
      username: responseData.username,
      email: responseData.email,
      password: responseData.password,
    };
    context.commit("setUser", userData);
  },

  async editUser(context, data) {
    var userData = null;

    if (data.password == "") {
      userData = {
        firstname: data.firstname,
        lastname: data.lastname,
        phoneNumber: data.phoneNumber,
        username: data.username,
        email: data.email,
      };
    } else if (data.password.length > 0) {
      userData = {
        firstname: data.firstname,
        lastname: data.lastname,
        phoneNumber: data.phoneNumber,
        username: data.username,
        email: data.email,
        password: data.password,
        newPassword: data.newPassword,
      };
    }

    const response = await fetch(
      context.rootGetters.host + `/users/${data.user_id}/password`,
      {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      const error = new Error("Nie udało się edytować danych!");
      error.status = response.status;
      throw error;
    }
  },
};
