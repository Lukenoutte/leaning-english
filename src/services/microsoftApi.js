import { v4 as uuidv4 } from "uuid";

const urlMicrosoftApi = process.env.REACT_APP_ENDPOINT_MICROSOFT;
const keyMicrosoftApi = process.env.REACT_APP_KEY;

const microsoftApi = require("axios").default;

const postMicrosoftApi = async (arg) => {
    let response = await microsoftApi({
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
    });
  
    return response;
  };

  export default postMicrosoftApi;
  