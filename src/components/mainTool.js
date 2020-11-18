import React, { useState, useRef, useEffect } from "react";
import "../styles/main_tool.css";

function MainTool() {
  const [phrase, setPhrase] = useState([]);
  const [toSelectValue, setToSelectValue] = useState('pt-br');
  const [fromSelectValue, setFromSelectValue] = useState('en');
  const [unknownWords, setUnknownWords] = useState([]);
  const [translatedWords, setTranslatedWords] = useState([]);
  const inputPhrase = useRef(null);
  const uuidv4 = require("uuid/v4");
  const axios = require("axios").default;

  function handleClickButton() {
    let currentPhrase = inputPhrase.current.value;
    if (currentPhrase !== "") {
      setPhrase(currentPhrase.split(" "));
    }
  }


  function handleToSelect(event) {
    setToSelectValue(event.target.value);
    clearUnkownandTranslated();
  }

  function handleFromSelect(event) {
    setFromSelectValue(event.target.value);
    clearUnkownandTranslated();
  }

  function clearUnkownandTranslated() {
    setUnknownWords([]);
    setTranslatedWords([]);
  }

  function handleClickButtonClear() {
     setPhrase([]);
     clearUnkownandTranslated();
     inputPhrase.current.value = "";
  }

  function removeOneWordHighlighted(targetIndex) {
    setUnknownWords(
      unknownWords.filter((item) => unknownWords.indexOf(item) !== targetIndex)
    );
    setTranslatedWords(
      translatedWords.filter(
        (item) => translatedWords.indexOf(item) !== targetIndex
      )
    );
  }

  function handleClickWord(word) {
    let newWord = word.replace(/[.,?!;:\s]/g, "");

    if (!unknownWords.includes(newWord)) {
      setUnknownWords((oldArray) => [...oldArray, newWord]);
    }
  }

  function listHightLightedWordsAndTranslations() {
    let divList = [];
    let waitTranslation = "";

    for (let i = 0; i < unknownWords.length; i++) {
      if (translatedWords[i] === undefined) {
        waitTranslation = " Loading...";
      } else {
        if (translatedWords[i].length === 0) {
          waitTranslation = " Nenhuma tradução encontrada :(";
        } else {
          waitTranslation = translatedWords[i].map((objects) => {
            return " " + objects.normalizedTarget;
          });
        }
      }

      divList.push(
        <div className="unknown-words shadow-light" key={i}>
          <p key={i}>
            {unknownWords[i].toUpperCase() + " -" + waitTranslation}
          </p>
          <button onClick={() => removeOneWordHighlighted(i)}>x</button>
        </div>
      );
    }
    return divList;
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
          from: fromSelectValue,
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
  }, [unknownWords, toSelectValue, fromSelectValue]);

  return (
    <div className="main-tool">
      <div className="center-container">
        <div className="choose-language-wrapper">
          <div className="from-container shadow-light">
            <span>From: </span>
            <select name="languages" value={fromSelectValue} onChange={handleFromSelect}>
              <option value="en">English</option>
              <option value="pt-br">Portuguese (BR)</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
              <option value="ja">Japanese</option>
            </select>
          </div>
          <div className="to-container shadow-light">
            <span>To: </span>
            <select name="languages" value={toSelectValue} onChange={handleToSelect}>
              <option value="en">English</option>
              <option value="pt-br">Portuguese (BR)</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
              <option value="ja">Japanese</option>
            </select>
            
          </div>
        </div>
        <div className="input-and-button shadow-light">
          <h1> Copy and paste some sentence or text in english:</h1>

          <input ref={inputPhrase} type="text" />
          <button id="try-it-button" onClick={handleClickButton}>
            Try it!
          </button>
          <button onClick={handleClickButtonClear}>Clear all</button>
        </div>
        {phrase.length > 0 && (
          <div className="phrase-wrapper shadow-light">
            {phrase.map((word, index) => {
              return (
                <button
                  className={
                    unknownWords.includes(word.replace(/[.,?!;:\s]/g, ""))
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
        <div className="unknown-words-container">
          {unknownWords.length > 0 &&
            listHightLightedWordsAndTranslations().map((div) => {
              return div;
            })}
        </div>
      </div>
    </div>
  );
}

export default MainTool;
