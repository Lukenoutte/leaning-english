import React, { useRef, useState, useContext } from "react";
import history from "../history";
import PagesForgotPass from "../components/pagesForgotPass";
import { MainContext } from "../context/MainContext";
import { verifyResetToken } from "../services";

export default function TokenForgotPass() {
  const inputRef = useRef("");
  const [codeInputError, setCodeInputError] = useState(false);
  const { setRecoverPassInfo, recoverPassInfo } = useContext(MainContext);
  const [isLoading, setIsloading] = useState(false);
  const [failMessage, setfailMessage] = useState("");

  function validateCode(token) {
    if (token.length === 40) {
      return true;
    }
    return false;
  }

  async function handleButtonSend(event) {
    event.preventDefault();
    let token = inputRef.current.value;

    if(!recoverPassInfo.email){
      history.push("/forgot_pass");
    }
    
    if (!validateCode(token)) {
      setCodeInputError(true);
      setfailMessage("Invalid token")
      return;
    }
    setIsloading(true);
    const response = await verifyResetToken({email: recoverPassInfo.email, token: token});

    if (response.status && response.status === 200) {
    var obj = {};
    obj["token"] = token;

    setRecoverPassInfo((oldArray) => ({ ...oldArray, ...obj }));
    history.push("/change_pass");
    } else{
      if(response.data.error){
        setfailMessage(response.data.error);
      }else{
        setfailMessage("Invalid Token");
      }
      setCodeInputError(true);
      setIsloading(false);
    }
    
  }

  return (
    <PagesForgotPass
      isLoading={isLoading}
      handleButtonSend={handleButtonSend}
      title="We sent a code!"
      subtitle="Check your e-mail box."
      placeholder="Code"
      inputError={codeInputError}
      buttonText={"Send"}
      inputRef={inputRef}
      inputType="text"
      failMessage={failMessage}
    ></PagesForgotPass>
  );
}
