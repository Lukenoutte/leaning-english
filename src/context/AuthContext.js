import React,{ createContext, useState, useEffect } from "react";
import { axios } from "../services";
import history from "../history";
const Context = createContext();

function AuthProvider({children}){
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
    const token = localStorage.getItem("token");

    if(token){
        axios.defaults.headers.autorization = `Bearer ${JSON.parse(token)}`;
        setAuthenticated(true);
    }

    }, [])

    function handleLogout(){
        setAuthenticated(false);
        localStorage.removeItem("token");
        axios.defaults.headers.autorization = undefined;
        history.push("/login");
    }

    return(
        <Context.Provider value={{authenticated, setAuthenticated, handleLogout}}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider};