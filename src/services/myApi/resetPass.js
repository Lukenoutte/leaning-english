import myApi from "./apiConfig";



const sendTokenToEmail = async (arg) => {

    let response = await myApi({
        url: "/auth/forgot_password",
        method: "post",
        data: {
            email: arg.email
        },
    }).catch((err) => {
        return err.response;
    });

    if (response && response.data) {
        return { data: response.data, status: response.status };
    }

    return response;
};

const verifyResetToken = async (arg) => {

    let response = await myApi({
        url: "/auth/verify_token_recover",
        method: "post",
        data: {
            email: arg.email,
            token: arg.token,
        },
    }).catch((err) => {
        return err.response;
    });

    if (response && response.data) {
        return { data: response.data, status: response.status };
    }

    return response;
};


const resetPass = async (arg) => {

    let response = await myApi({
        url: "/auth/reset_password",
        method: "post",
        data: {
            email: arg.email,
            token: arg.token,
            password: arg.password
        },
    }).catch((err) => {
        return err.response;
    });

    if (response && response.data) {
        return { data: response.data, status: response.status };
    }

    return response;
};

export { sendTokenToEmail, verifyResetToken, resetPass };