import React, { useRef, useState, useContext } from "react";
import history from "../../history";
import PagesForgotPass from "../../components/forgotPass/pagesForgotPass";
import { MainContext } from "../../context/MainContext";
import { verifyResetToken } from "../../services/myApi/resetPass";
import NeedAuth from "../../components/utilities/needAuth";

export default function TokenForgotPass() {
  const inputRef = useRef("");
  const [tokenInputError, setCodeInputError] = useState(false);
  const { recoverPassInfo } = useContext(MainContext);
  const [recoverPassInfoValue, setRecoverPassInfo] = recoverPassInfo;
  const [isLoading, setIsloading] = useState(false);
  const [failMessage, setfailMessage] = useState("");

  function validateCode(token) {
    if (token.length === 4) {
      return true;
    }
    return false;
  }

  async function handleButtonSend(event) {
    event.preventDefault();
    let token = inputRef.current.value;

    if (!recoverPassInfoValue.email) {
      history.push("/forgot_pass");
    }

    if (!validateCode(token)) {
      setCodeInputError(true);
      setfailMessage("Invalid token");
      return;
    }
    setIsloading(true);
    const response = await verifyResetToken({
      email: recoverPassInfo.email,
      token: token,
    });

    if (response.status && response.status === 200) {
      var obj = {};
      obj["token"] = token;

      setRecoverPassInfo((oldArray) => ({ ...oldArray, ...obj }));
      history.push("/change_pass");
    } else {
      if (response.data.error) {
        setfailMessage(response.data.error);
      } else {
        setfailMessage("Invalid Token");
      }
      setCodeInputError(true);
      setIsloading(false);
    }
  }

  const inputClassError = () => {
    if (tokenInputError) return "g-input-error";

    return "";
  };

  const FirstInput = () => {
    return (
      <input
        type="text"
        placeholder={"Code"}
        ref={inputRef}
        className={inputClassError()}
      />
    );
  };

  return (
    <NeedAuth needAuth={false}>
      <PagesForgotPass
        isLoading={isLoading}
        labels={{
          title: "We sent a Token!",
          subtitle: "Check your e-mail box.",
        }}
        FirstInput={FirstInput}
        button={{ text: "Send", function: handleButtonSend }}
        handleErrors={{ input: tokenInputError, message: failMessage }}
      ></PagesForgotPass>
    </NeedAuth>
  );
}
