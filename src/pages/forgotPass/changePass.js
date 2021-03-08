import React, { useRef, useState, useContext } from "react";
import { resetPass } from "../../services/myApi/resetPass";
import history from "../../history";
import PagesForgotPass from "../../components/forgotPass/pagesForgotPass";
import { MainContext } from "../../context/MainContext";

export default function ForgotPassword() {
  const inputRef = useRef("");
  const inputPassExtra = useRef("");
  const [inputError, setInputError] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const { recoverPassInfo } = useContext(MainContext);
  const [failMessage, setfailMessage] = useState("");

  function validatePass(arg) {
    if (arg.pass === "" || arg.confirmPass === "") {
      setfailMessage("Empty field!");
      return false;
    }

    if (arg.pass !== arg.confirmPass) {
      setfailMessage("Different passwords!");
      return false;
    }

    if (arg.pass.length < 6 && arg.confirmPass.length < 6) {
      setfailMessage("Password too short!");
      return false;
    }

    return true;
  }

  async function handleButtonSend(event) {
    event.preventDefault();
    let pass = inputRef.current.value;
    let confirmPass = inputPassExtra.current.value;

    if (!recoverPassInfo.email || !recoverPassInfo.token) {
      history.push("/forgot_pass");
    }

    if (!validatePass({ pass, confirmPass })) {
      setInputError(true);
      return;
    }

    setIsloading(true);

    let response = await resetPass({
      email: recoverPassInfo.email,
      password: pass,
      token: recoverPassInfo.token,
    });

    if (response.status && response.status === 200) {
      setIsloading(false);
      setInputError(false);
      history.push("/change_pass_sucess");
    } else {
      setIsloading(false);
    }
  }

  const inputClassError = () => {
    if (inputError) return "g-input-error";

    return "";
  };
  

  const FirstInput = () => {
    return <input type="password" placeholder={"Password"} ref={inputRef} className={inputClassError()} />;
  };

  const SecondInput = () => {
    return (
      <input
        type="password"
        placeholder={"Confirm Password"}
        ref={inputPassExtra}
        className={inputClassError() + " extra-input"}
      />
    );
  };

  return (
    <PagesForgotPass
      isLoading={isLoading}
      labels={{
        title: "Choose a new password!",
        subtitle: "Try something new.",
      }}
      button={{ text: "Send", function: handleButtonSend }}
      FirstInput={FirstInput}
      handleErrors={{ input: inputError, message: failMessage }}
      SecondInput={SecondInput}
    ></PagesForgotPass>
  );
}
