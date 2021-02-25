import React from "react";
import WarningPage from "../components/warningPage";
import NeedAuth from "../components/needAuth";

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
