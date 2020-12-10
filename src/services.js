const urlApi = process.env.REACT_APP_API_LINK;
const axios = require("axios").default;

const login =  async (arg) => {
   
   let response = await axios({
    baseURL: urlApi,
    url: "/auth/authenticate",
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    data: {email: arg.email , password: arg.pass},
  })
  
  return response;
};

const signUp = (arg) => {

  axios({
   baseURL: urlApi,
   url: "/auth/register",
   method: "post",
   headers: {
     "Content-type": "application/json",
   },
   data: {name: arg.name , email: arg.email , password: arg.pass, confirmPass: arg.confirmPass},
 }).then((response) => {
   console.log(response);
 });
};


export {login, signUp};
