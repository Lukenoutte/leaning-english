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
  }).catch((err) => {
     return  err.response;
  })
  
  return response;
};

const signUp = async (arg) => {

  let response = await axios({
   baseURL: urlApi,
   url: "/auth/register",
   method: "post",
   headers: {
     "Content-type": "application/json",
   },
   data: {name: arg.name , email: arg.email , password: arg.pass, confirmPass: arg.confirmPass},
 }).catch((err) => {
  return  err.response;
})

 return response;
};


export {login, signUp, axios};
