import React from "react";
import "./styles/global.css";
import Routes from "./routes";
import { AuthProvider } from "./context/AuthContext";
import history from "./history";
import { Router } from "react-router-dom";
function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
