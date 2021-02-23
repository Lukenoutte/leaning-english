import React from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import "./styles/forgot_pass.css";
import Loading from "../components/loading";

export default function ForgotPassword(props) {
  const {
    isLoading,
    FirstInput,
    button,
    handleErrors,
    labels,
    SecondInput
  } = props;

  const ErrorMessage = () => {
    if (handleErrors.input) {
      return (
        <div className="g-empty-input-error">
          <p>{handleErrors.message}</p>
        </div>
      );
    }

    return false;
  };

  return (
    <HeaderAndFotter>
      <div className="forgot-pass global-wrapper">
        <div className="g-center-container-two">
          <div className="g-inputs-wrapper g-shadow-light g-styled-buttons">
            <div className="g-wrapper-response">
              {isLoading && <Loading />}
              {!isLoading && <ErrorMessage />}
            </div>
            <h3 className="title-recover">{labels.title}</h3>
            <p className="description-forgot-pass">{labels.subtitle}</p>

            <FirstInput/>

            {SecondInput && (
              <SecondInput />
            )}

            <button
              onClick={(e) => button.function(e)}
              className="button-send"
            >
              {button.text}
            </button>
          </div>
        </div>
      </div>
    </HeaderAndFotter>
  );
}
