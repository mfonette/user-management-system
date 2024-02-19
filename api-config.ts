import { environment } from "src/environments/environment";

export const apiConfig = {
  baseUrl : environment.apiUrl,
  login: 'login',
  register: 'register',
  userActions: 'users'
};
