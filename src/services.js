import { v4 as uuidv4 } from "uuid";

const urlMyApi = process.env.REACT_APP_MYAPI_LINK;
const urlMicrosoftApi = process.env.REACT_APP_ENDPOINT_MICROSOFT;
const keyMicrosoftApi = process.env.REACT_APP_KEY;
const myApi = require("axios").create({
  baseURL: urlMyApi,
  headers: {
    "Content-type": "application/json",
  },
});


const microsoftApi = require("axios").default;

const login = async (arg) => {

  let response = await myApi({
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
  let response = await myApi({
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
  let response = await myApi({
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
  console.log(arg.validWords);
  let response = await myApi({
    url: "/projects/add_unknown_words",
    method: "post",
    data: {
      id: id,
      unkownWords: arg.validWords,
    }, 
  }).catch((err) => {
    return err.response;
  });

  return response;
};

const userInformations = async () => {
  const id = JSON.parse(localStorage.getItem("id"));

  let response = await myApi({
    url: "/projects/user_informations",
    method: "post",
    data: {
      id: id,      
    }, 
  }).catch((err) => {
    return err.response;
  });

  if (response && response.data) {
    return { data: response.data, status: response.status };
  }
  
  return response;
}

const getWords = async () => {
  const id = JSON.parse(localStorage.getItem("id"));

  let response = await myApi({
    url: "/projects/list_words",
    method: "post",
    data: {
      id: id,      
    }, 
  }).catch((err) => {
    return err.response;
  });

  if (response && response.data) {
    return { data: response.data, status: response.status };
  }
  
  return response;
};

const postMicrosoftApi = async (arg) => {

  let response = await microsoftApi(
    {
      baseURL: urlMicrosoftApi,
      url: "/dictionary/lookup",
      method: "post",
      headers: {
        "Ocp-Apim-Subscription-Key": keyMicrosoftApi,
        "Content-type": "application/json",
        "X-ClientTraceId": uuidv4().toString(),
      },
      params: {
        "api-version": "3.0",
        from: "en",
        to: arg.languageSelectValue,
      },
      data: [{ text: arg.data }],
      responseType: "json",
    }
  );

  return response;
}

export { login, signUp, verifyToken, addWords, getWords, myApi, postMicrosoftApi, userInformations};
