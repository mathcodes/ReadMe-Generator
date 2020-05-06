const axios = require("axios");

const api = {
    getUser(username) {
        return axios.get(`https://api.github.com/search/users?q=${username}`);
    }
};

module.exports = api;