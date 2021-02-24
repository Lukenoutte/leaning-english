import myApi from "./apiConfig";

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

export { login, signUp, verifyToken };