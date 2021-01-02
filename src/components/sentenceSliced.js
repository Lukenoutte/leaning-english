import React from "react";
import "./styles/sentence_sliced.css";

export default function sentenceSliced(props) {
  function handleClickWord(word) {
    let newWord = word.replace(/[.,?!;:\s]/g, "");

    if (!props.unknownWordsVar.includes(newWord)) {
      props.setUnknownWordsFunc((oldArray) => [...oldArray, newWord]);
    }
  }

  function handleClassWord(word) {
    let clearWord = word.replace(/[.,?!;:\s]/g, "");

    if (props.unknownWordsVar.includes(clearWord)) {
      return "word-hightlight";
    }

    if (props.sameWordsFromProfileVar.includes(clearWord)) {
      return "word-hightlight-profile";
    }

    return "";
  }

  return (
    <>
      {props.sentenceVar.length > 0 && (
        <div className="phrase-wrapper shadow-light">
          {props.sentenceVar.map((word, index) => {
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
