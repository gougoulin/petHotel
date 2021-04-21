import { get } from "../../../src/routes/api";

function httpServices() {
    var baseUrl = process.env.REACT_BASEURL || "http://localhost:3000/api/",
        token,
        me;

    function init() {
        token = localStorage.getItem("token");
        read("/user/me", {})
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                me = data.user;
            });
    }

    function _getUserByToken(token) {
        return fetch(baseUrl + user, {
            method: "POST",
            headers: {
                authorization: token,
            },
        });
    }

    function login(url, username, password) {}

    function validate() {
        if (token == null) return false;
    }

    function _readToken(token) {
        getUserByToekn(token).then((user) => {
            currentUser = user;
        });
    }

    function login() {}

    function signup(username, passowrd, role = "visitor") {}

    function logout() {}

    function read(uri, options) {
        var options = options || {
            method: "GET",
            headers: {
                authorization: token,
            },
        };
        return "read";
    }

    function create(uri, options) {
        if (validate()) return;
        return "post";
    }

    function del(uri, options) {
        var options = { ...options };
        if (validate()) return;
        return "delete";
    }

    function update(uri, options) {
        var options = { ...options };
        if (validate()) return;
        return "update";
    }

    // if not logged in, only give two methods
    if (token == null)
        return {
            login,
            signup,
        };
    // after logged in
    return { read, create, del, update, logout, login, signup };
}

export default httpServices;
