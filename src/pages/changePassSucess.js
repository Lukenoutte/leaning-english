import React from "react";
import WarningPage from "../components/warningPage";


export default function ChangePassSucess() {
  return (
    <WarningPage
      title="Great!"
      text="You have changed your password!"
      linkDestination="/login"
      buttonText="Continue"
    ></WarningPage>
  );
}
