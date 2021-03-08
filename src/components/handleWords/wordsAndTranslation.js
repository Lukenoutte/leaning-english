import React, { useContext } from "react";
import "./styles/words_and_translations.css";
import { MainContext } from "../../context/MainContext";
import WordContainer from "../handleWords/wordContainer";
export default function WordsAndTranslation() {
  const {
    translatedWords,
    setTranslatedWords,
    unknownWords,
    setUnknownWords,
    sameWordsFromProfile,
    setSameWordsFromProfile,
  } = useContext(MainContext);



  function removeOneWordHighlighted(target) {
    setUnknownWords(unknownWords.filter((word) => word !== target));

    setSameWordsFromProfile(
      sameWordsFromProfile.filter((word) => word !== target)
    );

    if (translatedWords) {
      delete translatedWords[target];
      setTranslatedWords(translatedWords);
    }
  }

  function listWordsAndTranslations() {
    let divList = [];

    let profileWordsAux = sameWordsFromProfile;

    if (profileWordsAux && profileWordsAux.length > 0) {
      divList = selectedWord({
        divList,
        arrayWords: profileWordsAux,
        isProfileWord: true,
      });
    }

    if (unknownWords && unknownWords.length > 0) {
      divList = selectedWord({
        divList,
        arrayWords: unknownWords,
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
        if (translatedWords[word] === undefined) {
          waitTranslation = " Loading...";
        } else {
          if (translatedWords[word].length === 0) {
            waitTranslation = " No translations found :(";
          } else {
            waitTranslation = translatedWords[word].map((objects) => {
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
      {unknownWords || sameWordsFromProfile
        ? listWordsAndTranslations().map((div) => {
            return div;
          })
        : false}
    </div>
  );
}
