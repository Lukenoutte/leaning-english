import React, { createContext, useState, useEffect } from "react";
import { verifyToken } from "../services/myApi/auth";
import  myApi from "../services/myApi/apiConfig";
import history from "../history";

const AuthContext = createContext();


function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);


  useEffect(() => {
    async function tokenVerification() {
      const token = localStorage.getItem("token");

      if (token) {
        let status = await verifyToken({
          token: `Bearer ${JSON.parse(token)}`,
        });
  
        if(status && status.data.tokenStatus){
          myApi.defaults.headers.autorization = `Bearer ${JSON.parse(token)}`;
        setAuthenticated(true);
        }
      }
    }

    tokenVerification();
  }, []);

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    myApi.defaults.headers.autorization = undefined;
   
    history.push("/login");
  }

  function handleLogin(arg) {
    setAuthenticated(true);
    let token = arg.response.data.token;
    let id = arg.response.data.user._id;
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("id", JSON.stringify(id));
    myApi.defaults.headers.autorization = `Bearer ${token}`;
  }

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, handleLogout, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
