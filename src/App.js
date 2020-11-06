import React, { useState, useRef, useEffect } from "react";
import "./styles/global.css";
import "./styles/app.css";

function App() {
  const [phrase, setPhrase] = useState([]);
  const [unknownWords, setUnknownWords] = useState([]);
  const [translatedWords, setTranslatedWords] = useState([]);
  const inputPhrase = useRef(null);
  const uuidv4 = require("uuid/v4");
  const axios = require("axios").default;

  function handleClickInput() {
    let currentPhrase = inputPhrase.current.value;
    setPhrase(currentPhrase.split(" "));
  }

  function handleClickWord(word) {
    if (!unknownWords.includes(word)) {
      setUnknownWords((oldArray) => [...oldArray, word]);
    }
  }

  function listHightLightedWords() {
    let divList = [];
    for (let i = 0; i < unknownWords.length; i++) {
      if(translatedWords[i] !== undefined){
      divList.push(<div className="unknown-words" key={i}>
      <p key={i}>{unknownWords[i] + "-" + translatedWords[i]}</p>
      </div>);
      }
     }
     return divList;
  }

  useEffect(() => {
    if (unknownWords.length > 0) {
      axios({
        baseURL: process.env.REACT_APP_ENDPOINT,
        url: "/translate",
        method: "post",
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.REACT_APP_KEY,
          "Content-type": "application/json",
          "X-ClientTraceId": uuidv4().toString(),
        },
        params: {
          "api-version": "3.0",
          from: "en",
          to: ["pt"],
        },
        data: [{ text: unknownWords[unknownWords.length - 1] }],
        responseType: "json",
      }).then(function (response) {
        let newTranslation = response.data[0].translations[0].text;
        setTranslatedWords((oldArray) => [...oldArray, newTranslation]);
      });
    }

  }, [axios, uuidv4, unknownWords]);

  return (
    <div className="app">
      <div className="center-container">
        <div className="input-and-button">
          <h1> Learning english with phrases</h1>

          <input ref={inputPhrase} type="text" />
          <button onClick={handleClickInput}>Try it!</button>
        </div>
        <div className="phrase">
          {phrase.length > 0 &&
            phrase.map((word, index) => {
              return (
                <button
                  className={
                    unknownWords.includes(word) ? "word-hightlight" : ""
                  }
                  onClick={() => handleClickWord(word)}
                  key={index}
                >
                  {word}
                </button>
              );
            })}
        </div>
        <div className="unknown-words-container">
          {unknownWords.length > 0 &&
            listHightLightedWords().map(div => { return div})
            }
        </div>
      </div>
    </div>
  );
}

export default App;
