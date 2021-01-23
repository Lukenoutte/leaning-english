import React, { useRef, useState, useContext } from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import "../styles/sign_up.css";
import Loading from "../components/loading";
import { AuthContext } from "../context/AuthContext";
import { signUp, login } from "../services";
import history from "../history";

function SignUp() {
  const inputName = useRef("");
  const inputEmail = useRef("");
  const inputPass = useRef("");
  const inputConfirmPass = useRef("");
  const [allInputError, setAllInputError] = useState(false);
  const [passInputError, setPassInputError] = useState(false);
  const [signUpFailMessage, setSignUpFailMessage] = useState("");
  const [signUpFail, setSignUpFail] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const { handleLogin } = useContext(AuthContext);

  async function loginAfterSignUp(arg){
    let loginResponse = await login({ email: arg.email, pass: arg.pass });

    if (loginResponse) {
      if (loginResponse.status === 200) {
        handleLogin({ response: loginResponse });
      } else if (loginResponse.status === 400) {
        history.push("/login");
      }
    }
  }

  function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function inputsValidation(arg){

      if (arg.name === "" || arg.email === "" || arg.pass === "" || arg.confirmPass === "") {
        setAllInputError(true);
        setSignUpFailMessage("Ops, Empty field!");
        return false;
      }
  
      if (arg.pass !== arg.confirmPass) {
        setPassInputError(true);
        setSignUpFailMessage("Ops, passwords don't match!");
        return false;
      }else{
        setPassInputError(false);
      }
  
      if (arg.pass.length < 6 && arg.confirmPass.length < 6) {
        setPassInputError(true);
        setSignUpFail(true);
        setSignUpFailMessage("Ops, passwords too small!");
        return false;
      }else{
        setPassInputError(false);
      }

      if(!validateEmail(arg.email)){
        console.log("Email error");
        return false;
      }

      return true;
    }
   
  const HandleSignUp = async (event) => {
    event.preventDefault();
    let name = inputName.current.value;
    let email = inputEmail.current.value;
    let pass = inputPass.current.value;
    let confirmPass = inputConfirmPass.current.value;

    if(!inputsValidation({name, email, pass, confirmPass})) return;

    setIsloading(true);
    let signUpResponse = await signUp({ name, email, pass, confirmPass });

    if (signUpResponse) {
      
      if (signUpResponse.status === 200) {
        loginAfterSignUp({email, pass});
      } else if (signUpResponse.status === 400) {
        setSignUpFailMessage(signUpResponse.data.error);
        setIsloading(false);
        setSignUpFail(true);
        setAllInputError(true);
      }
    } else {
      setSignUpFail(true);
      setSignUpFailMessage("Somenthing wrong :(");
      setIsloading(false);
    }
  };

  const inputClass = (ref, isPassInput) => {
    if (allInputError) {
      return "input-error";
    }

    if (passInputError && isPassInput) return "input-error";

    return "";
  };

  const ErrorMessage = () => {
    if (signUpFail || allInputError) {
      return (
        <div className="empty-input-error">
          <p>{signUpFailMessage}</p>
        </div>
      );
    }

    return false;
  };

  return (
    <HeaderAndFotter>
      <div className="sign-up global-wrapper">
        <div className="center-container">
          <div className="inputs-wrapper shadow-light styled-buttons">
            <div className="wrapper-response">
              {!isLoading && <ErrorMessage />}
              {isLoading && <Loading />}
            </div>
            <h1>Sign Up</h1>
            <input
              type="text"
              placeholder="Name"
              ref={inputName}
              className={inputClass(inputName)}
            />
            <input
              type="text"
              placeholder="E-mail"
              ref={inputEmail}
              className={inputClass(inputEmail)}
            />
            <input
              type="password"
              placeholder="Password"
              ref={inputPass}
              className={inputClass(inputPass, true)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              ref={inputConfirmPass}
              className={inputClass(inputConfirmPass, true)}
            />
            <button onClick={(e) => HandleSignUp(e)}>Start</button>
          </div>
        </div>
      </div>
    </HeaderAndFotter>
  );
}

export default SignUp;
