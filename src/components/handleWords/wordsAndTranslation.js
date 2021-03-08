import React, { useContext } from "react";
import "./styles/words_and_translations.css";
import { MainContext } from "../../context/MainContext";
import WordContainer from "../handleWords/wordContainer";
export default function WordsAndTranslation() {
  const {
    translatedWords,
    unknownWords,
    sameWordsFromProfile,
  } = useContext(MainContext);

  const [translatedWordsValue, setTranslatedWords] = translatedWords;
  const [unknownWordsValue, setUnknownWords] = unknownWords;
  const [ sameWordsFromProfileValue, setSameWordsFromProfile] = sameWordsFromProfile;
  
  function removeOneWordHighlighted(target) {
    setUnknownWords(unknownWordsValue.filter((word) => word !== target));

    setSameWordsFromProfile(
      sameWordsFromProfileValue.filter((word) => word !== target)
    );

    if (translatedWordsValue) {
      delete translatedWordsValue[target];
      setTranslatedWords(translatedWordsValue);
    }
  }

  function listWordsAndTranslations() {
    let divList = [];

    let profileWordsAux = sameWordsFromProfileValue;

    if (profileWordsAux && profileWordsAux.length > 0) {
      divList = selectedWord({
        divList,
        arrayWords: profileWordsAux,
        isProfileWord: true,
      });
    }

    if (unknownWordsValue && unknownWordsValue.length > 0) {
      divList = selectedWord({
        divList,
        arrayWords: unknownWordsValue,
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
        if (translatedWordsValue[word] === undefined) {
          waitTranslation = " Loading...";
        } else {
          if (translatedWordsValue[word].length === 0) {
            waitTranslation = " No translations found :(";
          } else {
            waitTranslation = translatedWordsValue[word].map((objects) => {
              return "  " + objects.normalizedTarget;
            });
          }
        }

        divList.push(
          <WordContainer
            key={word}
            isProfileWord={args.isProfileWord}
            onCloseButtonClicked={() => removeOneWordHighlighted(word)}
          >
            <p>
              <span className="unknown-word">{word.toUpperCase()}</span>
              {" -" + waitTranslation}
            </p>
          </WordContainer>
        );
        return divList;
      });
    }
    return divList;
  }

  return (
    <div className="unknown-words-container">
      {unknownWordsValue || sameWordsFromProfileValue
        ? listWordsAndTranslations().map((div) => {
            return div;
          })
        : false}
    </div>
  );
}
