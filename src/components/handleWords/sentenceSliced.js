import React, { useContext } from "react";
import "./styles/sentence_sliced.css";
import { MainContext } from "../../context/MainContext";

export default function SentenceSliced() {
  const {
    unknownWords,
    sameWordsFromProfile,
    sentence,
    cleanWord,
  } = useContext(MainContext);

  const [unknownWordsValue, setUnknownWords] = unknownWords;
  const [sameWordsFromProfileValue] = sameWordsFromProfile;
  const [sentenceValue] = sentence;


  function handleClickWord(word) {
    let newWord = cleanWord(word);

    if (
      !unknownWordsValue.includes(newWord) &&
      !sameWordsFromProfileValue.includes(newWord)
    ) {
      setUnknownWords((oldArray) => [...oldArray, newWord]);
    }
  }

  function handleClassWord(word) {
    let clearWord = cleanWord(word);

    if (unknownWordsValue.includes(clearWord)) {
      return "word-hightlight";
    }

    if (sameWordsFromProfileValue.includes(clearWord)) {
      return "word-hightlight-profile";
    }

    return "";
  }

  return (
    <>
      {sentenceValue.length > 0 && (
        <div className="phrase-wrapper g-shadow-light">
          {sentenceValue.map((word, index) => {
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
