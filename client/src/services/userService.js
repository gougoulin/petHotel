import http from "./httpService";

function userService() {
    function login() {
        if (http.login) {
            return http.login;
        }
    }
    function logout() {
        if (http.logout) {
            return http.logout;
        }
    }
    function signup({ username, password }) {
        if (http.signup) {
            return http.signup(username, password);
        }
    }
}
