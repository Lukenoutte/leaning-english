import React from "react";
import "./styles/global.css";
import Routes from "./routes/routes";
import { AuthProvider } from "./context/AuthContext";
import { MainProvider } from "./context/MainContext";
import history from "./history";
import { Router } from "react-router-dom";
import HeaderAndFotter from "./components/headerAndFooter/headerAndFooter";

function App() {
  return (
    <AuthProvider>
      <MainProvider>
        <Router history={history}>
          <HeaderAndFotter>
            <Routes />
          </HeaderAndFotter>
        </Router>
      </MainProvider>
    </AuthProvider>
  );
}

export default App;
