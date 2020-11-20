import React from "react";
import { ReactComponent as CloseIcon } from "../assets/icons/closeIcon.svg";

export default function sentenceSliced(props) {
  function removeOneWordHighlighted(targetIndex) {
    props.setUnknownWordsFunc(
      props.unknownWordsVar.filter(
        (item) => props.unknownWordsVar.indexOf(item) !== targetIndex
      )
    );
    props.setTranslatedWordsFunc(
      props.translatedWordsVar.filter(
        (item) => props.translatedWordsVar.indexOf(item) !== targetIndex
      )
    );
  }

  function listHightLightedWordsAndTranslations() {
    let divList = [];
    let waitTranslation = "";


    for (let i = 0; i < props.unknownWordsVar.length; i++) {
      if (props.translatedWordsVar[i] === undefined) {
        waitTranslation = " Loading...";
      } else {
        if (props.translatedWordsVar[i].length === 0) {
          waitTranslation = " Nenhuma tradução encontrada :(";
        } else {
          waitTranslation = props.translatedWordsVar[i].map((objects) => {
            return "  " + objects.normalizedTarget;
          });
        }
      }

      divList.push(
        <div className="unknown-words shadow-light" key={i}>
          <p key={i}>
            <span className="unknown-word">
              {props.unknownWordsVar[i].toUpperCase()}
            </span>{" "}
            {" -" + waitTranslation}
          </p>
          <button onClick={() => removeOneWordHighlighted(i)}>
            <CloseIcon className="close-icon" />
          </button>
        </div>
      );
    }
    return divList;
  }

  return (
    <div className="unknown-words-container">
      {props.unknownWordsVar !== undefined &&
        props.unknownWordsVar.length > 0 &&
        listHightLightedWordsAndTranslations().map((div) => {
          return div;
        })}
    </div>
  );
}
