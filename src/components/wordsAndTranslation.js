import React from "react";
import { ReactComponent as CloseIcon } from "../assets/icons/closeIcon.svg";

export default function sentenceSliced(props) {
  function removeOneWordHighlighted(target) {
    props.setUnknownWordsFunc(
      props.unknownWordsVar.filter((item) => props.unknownWordsVar !== target)
    );
    props.setTranslatedWordsFunc(
      props.translatedWordsVar.filter(
        (item) => props.translatedWordsVar.indexOf(item) !== target
      )
    );
  }

  function listHightLightedWordsAndTranslations() {
    let divList = [];
    let waitTranslation = "";
  
    if (props.unknownWordsVar !== undefined) {
      props.unknownWordsVar.map((word) => {
        if (props.translatedWordsVar[word] === undefined) {
          waitTranslation = " Loading...";
        } else {
          if (props.translatedWordsVar[word].length === 0) {
            waitTranslation = " Nenhuma tradução encontrada :(";
          } else {
            waitTranslation = props.translatedWordsVar[word].map((objects) => {
              return "  " + objects.normalizedTarget;
            });
          }
        }

        divList.push(
          <div className="unknown-words shadow-light" key={word}>
            <p>
              <span className="unknown-word">{word.toUpperCase()}</span>
              {" -" + waitTranslation}
            </p>
            <button onClick={() => removeOneWordHighlighted(word)}>
              <CloseIcon className="close-icon" />
            </button>
          </div>
        );
        return divList;
      });
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
