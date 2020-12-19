import React, { createContext, useState, useEffect } from "react";
import { axios, verifyToken } from "../services";
import history from "../history";
const Context = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function verification() {
      const token = localStorage.getItem("token");

      if (token) {
        let status = await verifyToken({
          token: `Bearer ${JSON.parse(token)}`,
        });
  
        if(status.data.tokenStatus){
        axios.defaults.headers.autorization = `Bearer ${JSON.parse(token)}`;
        setAuthenticated(true);
        }
      }
    }

    verification();
  }, []);

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    axios.defaults.headers.autorization = undefined;
    history.push("/login");
  }

  return (
    <Context.Provider value={{ authenticated, setAuthenticated, handleLogout }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
