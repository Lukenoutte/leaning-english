const urlApi = process.env.REACT_APP_API_LINK;
const axios = require("axios").create({
  baseURL: urlApi,
  headers: {
    "Content-type": "application/json",
  },
});

const login = async (arg) => {
  let response = await axios({
    url: "/auth/authenticate",
    method: "post",
    data: { email: arg.email, password: arg.pass },
  }).catch((err) => {
    return err.response;
  });

  if (response && response.data) {
    return { data: response.data, status: response.status };
  }

  return response;
};

const signUp = async (arg) => {
  let response = await axios({
    url: "/auth/register",
    method: "post",
    data: {
      name: arg.name,
      email: arg.email,
      password: arg.pass,
      confirmPass: arg.confirmPass,
    },
  }).catch((err) => {
    return err.response;
  });

  if (response && response.data) {
    return { data: response.data, status: response.status };
  }

  return response;
};

const verifyToken = async (arg) => {
  let response = await axios({
    url: "/auth/verify_token",
    method: "get",
    headers: {
      "Content-type": "application/json",
      autorization: arg.token,
    },
  }).catch((err) => {
    return err.response;
  });

  return response;
};

const addWords = async (arg) => {
  const id = JSON.parse(localStorage.getItem("id"));

  let response = await axios({
    url: "/projects/add_unknown_words",
    method: "post",
    data: {
      id: id,
      unkownWords: arg.unknownWords,
    }, 
  }).catch((err) => {
    return err.response;
  });

  return response;
};


export { login, signUp, verifyToken, addWords, axios };
