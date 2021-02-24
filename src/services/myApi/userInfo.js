import myApi from "./apiConfig";

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
};

const editUserInfo = async (arg) => {
  const id = JSON.parse(localStorage.getItem("id"));
  let response = await myApi({
    url: "/projects/edit_user_info",
    method: "post",
    data: {
      id: id,
      email: arg.email,
      name: arg.name
    },
  }).catch((err) => {
    return err.response;
  });

  if (response && response.data) {
    return { data: response.data, status: response.status };
  }

  return response;
};


export { userInformations, editUserInfo };