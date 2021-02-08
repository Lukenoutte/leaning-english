import React from "react";
import WarningPage from "../components/warningPage";


export default function WelcomePage() {
  return (
    <WarningPage
      title="Welcome!"
      text="Now you can store unknown words and improve your learning!"
      linkDestination="/"
      buttonText="Continue"
    ></WarningPage>
  );
}
