const urlMyApi = process.env.REACT_APP_MYAPI_LINK;

const myApi = require("axios").create({
    baseURL: urlMyApi,
    headers: {
        "Content-type": "application/json",
    },
});

export default myApi;