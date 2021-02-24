import React from "react";
import "./styles/word_container.css";
import { ReactComponent as CloseIcon } from "../assets/icons/closeIcon.svg";

export default function WordContainer(props) {
  const { isProfileWord, onCloseButtonClicked } = props;
  
  return (
    <div
      className={
        isProfileWord
          ? "unknown-words g-shadow-light profile-word"
          : "unknown-words g-shadow-light"
      }
    >
      {props.children}
      {!isProfileWord && (
        <button onClick={onCloseButtonClicked} className="close-button">
          <CloseIcon className="close-icon" />
        </button>
      )}
    </div>
  );
}
