import myApi from "./apiConfig";

const addWords = async (arg) => {
    const id = JSON.parse(localStorage.getItem("id"));

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

const removeWord = async (arg) => {
    const id = JSON.parse(localStorage.getItem("id"));

    let response = await myApi({
        url: "/projects/remove_unknown_words",
        method: "post",
        data: {
            id: id,
            unkownWords: arg.word,
        },
    }).catch((err) => {
        return err.response;
    });

    if (response && response.data) {
        return { data: response.data, status: response.status };
    }

    return response;
};


export { addWords, getWords, removeWord };