import React from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import "./styles/forgot_pass.css";
import Loading from "../components/loading";

export default function ForgotPassword(props) {
  const inputClass = () => {
    if (props.emailInputError) return "g-input-error";

    return "";
  };

  return (
    <HeaderAndFotter>
      <div className="forgot-pass global-wrapper">
        <div className="g-center-container-two">
          <div className="g-inputs-wrapper g-shadow-light g-styled-buttons">
            <div className="g-wrapper-response">
              {props.isLoading && <Loading />}
            </div>
            <h2 className="title-recover">{props.title}</h2>
            <p className="description-forgot-pass">{props.subtitle}</p>

            <input
              type={props.inputType}
              placeholder={props.placeholder}
              className={inputClass()}
              ref={props.inputRef}
            />

            {props.extraInput && (
              <input
                type={props.inputType}
                placeholder={props.extraPlaceholder}
                className={inputClass() + " extra-input"}
                ref={props.extraInputRef}
              />
            )}
            
            <button
              onClick={(e) => props.handleButtonSend(e)}
              className="button-send"
            >
              {props.buttonText}
            </button>
          </div>
        </div>
      </div>
    </HeaderAndFotter>
  );
}
