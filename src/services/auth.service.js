import store from '@/store/index.js';
import axios from 'axios';
const API_URL = 'https://habapp.azurewebsites.net/api/auth/';
class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
          
          var userRole="";
          response.data.email == "admin@gmail.com" ? userRole = "ADMIN" : userRole = "USER";

          store.commit("setUser", {
            role: userRole,
            userId: response.data.id,
          });

          if (userRole == 'USER'){
            store.dispatch('loadUserId');
          }
          //console.log('auth', store.getters.buildingId);
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('buildingId');
  }
  register(user) {
    return axios.post(API_URL + 'registration', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}
export default new AuthService();
