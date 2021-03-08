import React from "react";
import WarningPage from "../warning/warningPage";


export default function NotFound() {


  return (
    
   <WarningPage
      labels={{title:"Ops!", text:"Something wrong!"}}
      button={{link:"/", text:"Continue"}}
    ></WarningPage>
  
  );  
}
