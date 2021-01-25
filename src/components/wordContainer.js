import React from "react";
import "./styles/word_container.css";
import { ReactComponent as CloseIcon } from "../assets/icons/closeIcon.svg";

export default function WordContainer(props) {
  return (
    <div
      className={
        props.isProfileWord
          ? "unknown-words g-shadow-light profile-word"
          : "unknown-words g-shadow-light"
      }
    >
      {props.children}
      {!props.isProfileWord && (
        <button onClick={props.onCloseButtonClicked}>
          <CloseIcon className="close-icon" />
        </button>
      )}
    </div>
  );
}
