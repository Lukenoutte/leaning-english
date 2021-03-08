import React from "react";
import WarningPage from "../components/warning/warningPage";
import NeedAuth from "../components/utilities/needAuth";

export default function WelcomePage() {


  return (
    <NeedAuth needAuth={true}>
      <WarningPage
        labels={{ title: "Welcome!", text: "Now you can store unknown words and improve your learning!" }}
        button={{ link: "/", text: "Continue" }}
      ></WarningPage>
    </NeedAuth>
  );
}
