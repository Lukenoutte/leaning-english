import React, {useContext} from "react";
import WarningPage from "../components/warningPage";
import { AuthContext } from "../context/AuthContext";
import NotFound from "../components/notFound";

export default function WelcomePage() {
  const { authenticated } = useContext(AuthContext);

  return (
    <>
    {authenticated? 
    (<WarningPage
      title="Welcome!"
      text="Now you can store unknown words and improve your learning!"
      linkDestination="/"
      buttonText="Continue"
    ></WarningPage>):(
      <NotFound/>
    )
    }
    </>
  );  
}