import React from "react";
import "./styles/global.css";
import Routes from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { MainProvider } from "./context/MainContext";
import history from "./history";
import { Router } from "react-router-dom";
function App() {
  return (
    <AuthProvider>
      <MainProvider>
        <Router history={history}>
          <Routes />
        </Router>
      </MainProvider>
    </AuthProvider>
  );
}

export default App;
