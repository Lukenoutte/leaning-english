import React, { useState, useRef, useEffect } from "react";
import "../styles/main_tool.css";
import ChooseLanguage from "./chooseLanguage";
import SentenceSliced from "./sentenceSliced";
import WordsAndTranslations from "./wordsAndTranslation";

function MainTool() {
  const [unknownWords, setUnknownWords] = useState([]);
  const [sentence, setSentence] = useState([]);
  const [toSelectValue, setToSelectValue] = useState("pt-br"); 
  const [translatedWords, setTranslatedWords] = useState([]);
  const inputPhrase = useRef(null);
  const uuidv4 = require("uuid/v4");
  const axios = require("axios").default;

  function handleClickButton() {
    let currentPhrase = inputPhrase.current.value;
    if (currentPhrase !== "") {
      setSentence(currentPhrase.split(" "));
    }
  }

  function ChangeSelectTo(event) {
    setToSelectValue(event.target.value);

    clearUnkownAndTranslated();
  }

  function clearUnkownAndTranslated() {
    setUnknownWords([]);
    setTranslatedWords([]);
  }

  function handleClickButtonClear() {
    setSentence([]);
    clearUnkownAndTranslated();
    inputPhrase.current.value = "";
  }

  useEffect(() => {
    // API CALL
    if (
      unknownWords.length > 0 &&
      translatedWords.length < unknownWords.length
    ) {
      axios({
        baseURL: process.env.REACT_APP_ENDPOINT,
        url: "/dictionary/lookup",
        method: "post",
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.REACT_APP_KEY,
          "Content-type": "application/json",
          "X-ClientTraceId": uuidv4().toString(),
        },
        params: {
          "api-version": "3.0",
          from: "en",
          to: toSelectValue,
        },
        data: [{ text: unknownWords[unknownWords.length - 1] }],
        responseType: "json",
      }).then(function (response) {
        let newTranslations = response.data[0].translations;

        setTranslatedWords((oldArray) => [...oldArray, newTranslations]);
      });
    }
    // eslint-disable-next-line
  }, [unknownWords, toSelectValue]);

  return (
    <div className="main-tool">
      <div className="center-container">
        <ChooseLanguage
          valueSelected={toSelectValue}
          functionSelect={ChangeSelectTo}
        />

        <div className="input-and-button shadow-light">
          <h1> Copy and paste some sentence or text in english:</h1>

          <input ref={inputPhrase} type="text" />
          <button id="try-it-button" onClick={handleClickButton}>
            Try it!
          </button>
          <button onClick={handleClickButtonClear}>Clear all</button>
        </div>
        <SentenceSliced
          sentenceVar={sentence}
          unknownWordsVar={unknownWords}
          setUnknownWordsFunc={setUnknownWords}
        />
        <WordsAndTranslations
          translatedWordsVar={translatedWords}
          unknownWordsVar={unknownWords}
          setUnknownWordsFunc={setUnknownWords}
          setTranslatedWordsFunc={setTranslatedWords}
        />
      </div>
    </div>
  );
}

export default MainTool;
