import React from "react";
import "./styles/sentence_sliced.css";

export default function sentenceSliced(props) {
  function handleClickWord(word) {
    let newWord = word.replace(/[.,?!;:\s]/g, "");

    if (!props.unknownWordsVar.includes(newWord)) {
      props.setUnknownWordsFunc((oldArray) => [...oldArray, newWord]);
    }
  }

  return (
    <>
      {props.sentenceVar.length > 0 && (
        <div className="phrase-wrapper shadow-light">
          {props.sentenceVar.map((word, index) => {
            return (
              <button
                className={
                  props.unknownWordsVar.includes(
                    word.replace(/[.,?!;:\s]/g, "")
                  ) ||
                  props.sameWordsFromProfileVar.includes(word.replace(/[.,?!;:\s]/g, ""))
                    ? "word-hightlight"
                    : ""
                }
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
