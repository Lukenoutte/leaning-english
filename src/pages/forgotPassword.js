import React, { useRef, useState, useContext } from "react";
import { sendTokenToEmail } from "../services";
import history from "../history";
import PagesForgotPass from "../components/pagesForgotPass";
import { MainContext } from "../context/MainContext";

export default function ForgotPassword() {
  const inputRef = useRef("");
  const [emailInputError, setEmailInputError] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const { setRecoverPassInfo } = useContext(MainContext);
  const [failMessage, setfailMessage] = useState("");

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  async function handleButtonSend(event) {
    event.preventDefault();

    let email = inputRef.current.value;

    if (!validateEmail(email)) {
      setEmailInputError(true);
      setfailMessage("Invalid E-mail");
      return;
    }

    setIsloading(true);

    let response = await sendTokenToEmail({ email });


    if (response.status && response.status === 200) {
      var obj = {};
      obj["email"] = email;
  
      setRecoverPassInfo((oldArray) => ({ ...oldArray, ...obj }));
      history.push("/token_forgot_pass");
    } else {

      if(response.data.error){
        setfailMessage(response.data.error);
      }else{
        setfailMessage("Invalid E-mail");
      }

      setIsloading(false);
      setEmailInputError(true);
    }
  }

  return (
    <PagesForgotPass
      isLoading={isLoading}
      handleButtonSend={handleButtonSend}
      title="Recover Password"
      subtitle="Don't worry, we will send a recover code."
      placeholder="E-mail"
      inputError={emailInputError}
      buttonText={"Send me"}
      inputRef={inputRef}
      inputType="text"
      failMessage={failMessage}
    ></PagesForgotPass>
  );
}
