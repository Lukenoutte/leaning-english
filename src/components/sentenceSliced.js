import React, { useContext } from "react";
import "./styles/sentence_sliced.css";
import { MainContext } from "../context/MainContext";

export default function SentenceSliced() {
  const {
    unknownWords,
    setUnknownWords,
    sameWordsFromProfile,
    sentence,
    cleanWord,
  } = useContext(MainContext);

  function handleClickWord(word) {
    let newWord = cleanWord(word);

    if (
      !unknownWords.includes(newWord) &&
      !sameWordsFromProfile.includes(newWord)
    ) {
      setUnknownWords((oldArray) => [...oldArray, newWord]);
    }
  }

  function handleClassWord(word) {
    let clearWord = cleanWord(word);

    if (unknownWords.includes(clearWord)) {
      return "word-hightlight";
    }

    if (sameWordsFromProfile.includes(clearWord)) {
      return "word-hightlight-profile";
    }

    return "";
  }

  return (
    <>
      {sentence.length > 0 && (
        <div className="phrase-wrapper g-shadow-light">
          {sentence.map((word, index) => {
            return (
              <button
                className={handleClassWord(word)}
                onClick={() => handleClickWord(word)}
                key={index}
              >
                {word}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
