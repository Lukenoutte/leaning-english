import React, { useRef, useState, useContext } from "react";
import { sendTokenToEmail } from "../../services/myApi/resetPass";
import history from "../../history";
import PagesForgotPass from "../../components/forgotPass/pagesForgotPass";
import { MainContext } from "../../context/MainContext";
import NeedAuth from "../../components/utilities/needAuth";

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

    if (response && response.status === 200) {
      var obj = {};
      obj["email"] = email;

      setRecoverPassInfo((oldArray) => ({ ...oldArray, ...obj }));
      history.push("/token_forgot_pass");
    } else {
      if (response && response.data.error) {
        setfailMessage(response.data.error);
      } else {
        setfailMessage("Invalid E-mail");
      }

      setIsloading(false);
      setEmailInputError(true);
    }
  }

  const inputClassError = () => {
    if (emailInputError) return "g-input-error";

    return "";
  };

  const FirstInput = () => {
    return <input type="text" placeholder={"E-mail"} ref={inputRef} className={inputClassError()} />;
  };



  return (
    <NeedAuth needAuth={false}>
      <PagesForgotPass
        isLoading={isLoading}

        labels={{
          title: "Recover Password",
          subtitle: "Don't worry, we will send a recover code.",
        }}

        handleErrors={{ input: emailInputError, message: failMessage }}

        FirstInput={FirstInput}

        button={{ text: "Send me", function: handleButtonSend }}
      ></PagesForgotPass>
    </NeedAuth>
  );
}
