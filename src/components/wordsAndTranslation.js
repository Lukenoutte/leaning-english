import React from "react";
import { ReactComponent as CloseIcon } from "../assets/icons/closeIcon.svg";
import "./styles/words_and_translations.css";

export default function WordsAndTranslation(props) {
  function removeOneWordHighlighted(target) {
    props.setUnknownWordsFunc(
      props.unknownWordsVar.filter((word) => word !== target)
    );

    props.setSameWordsFuncProfileFunc(
      props.sameWordsFromProfileVar.filter((word) => word !== target)
    );

    const translatedWords = props.translatedWordsVar;

    if (translatedWords) {
      delete translatedWords[target];
      props.setTranslatedWordsFunc(translatedWords);
    }
  }

  function listWordsAndTranslations() {
    let divList = [];

    let profileWordsAux = props.sameWordsFromProfileVar;
    let unknownWordsAux = props.unknownWordsVar;

    if (profileWordsAux && profileWordsAux.length > 0) {
      divList = selectedWord({
        divList,
        arrayWords: profileWordsAux,
        isProfileWord: true,
      });
    }

    if (unknownWordsAux && unknownWordsAux.length > 0) {
      divList = selectedWord({
        divList,
        arrayWords: unknownWordsAux,
        isProfileWord: false,
      });
    }

    return divList;
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
          <div className={args.isProfileWord?"unknown-words shadow-light profile-word":"unknown-words shadow-light"} key={word}>
            <p>
              <span className="unknown-word">{word.toUpperCase()}</span>
              {" -" + waitTranslation}
            </p>
            {!args.isProfileWord && (
              <button onClick={() => removeOneWordHighlighted(word)}>
                <CloseIcon className="close-icon" />
              </button>
            )}
          </div>
        );
        return divList;
      });
    }
    return divList;
  }

  return (
    <div className="unknown-words-container">
      {props.unknownWordsVar || props.sameWordsFromProfileVar
        ? listWordsAndTranslations().map((div) => {
            return div;
          })
        : false}
    </div>
  );
}
