import axios from 'axios';
import authHeader from './auth-header.js';
const API_URL = 'http://localhost:8081/users/';
class UserService {
  getHelloPage() {
    return axios.get(API_URL + 'hello', { headers: authHeader() });
  }
}
export default new UserService();