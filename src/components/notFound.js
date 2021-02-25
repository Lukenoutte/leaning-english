import React from "react";
import WarningPage from "./warningPage";


export default function NotFound() {


  return (
    
   <WarningPage
      labels={{title:"Ops!", text:"Something wrong!"}}
      button={{link:"/", text:"Continue"}}
    ></WarningPage>
  
  );  
}
