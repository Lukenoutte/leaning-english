import React from "react";
import { ReactComponent as CloseIcon } from "../assets/icons/closeIcon.svg";

export default function WordsAndTranslation(props) {


  function removeOneWordHighlighted(target) {
    props.setUnknownWordsFunc(
      props.unknownWordsVar.filter((word) => word !== target)
    );

    props.setSameWordsFunc(
      props.sameWordsVar.filter((word) => word !== target)
    );

    const translatedWords = props.translatedWordsVar;

    if (translatedWords) {
      delete translatedWords[target];
      props.setTranslatedWordsFunc(translatedWords);
    }
  }

  function listWordsAndTranslations() {
    let divList = [];
    let arrayWords = [];
    if (props.sameWordsVar && props.sameWordsVar.length > 0) {
      arrayWords.push.apply(arrayWords, props.sameWordsVar);
    }

    if (props.unknownWordsVar && props.unknownWordsVar.length > 0) {
      arrayWords.push.apply(arrayWords, props.unknownWordsVar);
    }



    return selectedWord({ divList, arrayWords });
  }

  function selectedWord(args) {
    let divList = args.divList;
    let waitTranslation = "";
    let myArray = args.arrayWords;

    if (myArray !== undefined) {
      myArray.map((word) => {
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
      {props.unknownWordsVar || props.sameWordsVar
        ? listWordsAndTranslations().map((div) => {
            return div;
          })
        : false}
    </div>
  );
}
