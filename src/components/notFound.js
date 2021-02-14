import React from "react";
import WarningPage from "./warningPage";


export default function NotFound() {


  return (
    
   <WarningPage
      title="Ops!"
      text="Something wrong!"
      linkDestination="/"
      buttonText="Continue"
    ></WarningPage>
  
  );  
}
