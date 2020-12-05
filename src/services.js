const urlApi = process.env.REACT_APP_API_LINK;
const axios = require("axios").default;

const login = (arg) => {
   
   axios({
    baseURL: urlApi,
    url: "/auth/authenticate",
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    data: {email: arg.email , password: arg.pass},
  }).then((response) => {
    console.log(response);
  });
};


export default {login};