import React from "react";
import WarningPage from "../components/warningPage";


export default function ChangePassSucess() {
  return (
    <WarningPage
      labels={{title:"Great!", text:"You have changed your password!"}}
      button={{link:"/login", text:"Continue"}}
    ></WarningPage>
  );
}
