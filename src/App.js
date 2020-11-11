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

  function handleClickButton() {
    let currentPhrase = inputPhrase.current.value;
    setPhrase(currentPhrase.split(" "));
  }

  function handleClickButtonClear() {
    setUnknownWords([]);
    setPhrase([]);
    setTranslatedWords([]);
    inputPhrase.current.value = '';
  }

  function removeOneWord(targetIndex){
    setUnknownWords(unknownWords.filter((item) => unknownWords.indexOf(item) !== targetIndex));
    setTranslatedWords(translatedWords.filter((item) => translatedWords.indexOf(item) !== targetIndex));

    
  }

  function handleClickWord(word) {
    let newWord = word.replace(/[.,\s]/g, '');

    if (!unknownWords.includes(newWord)) {
      setUnknownWords((oldArray) => [...oldArray, newWord]);
    }
  }

  function listHightLightedWordsAndTranslations() {
    let divList = [];
    let waitTranslation= '';

    for (let i = 0; i < unknownWords.length; i++) {

      if(translatedWords[i] === undefined){
        waitTranslation = 'Loading...';
      }else {
        if(translatedWords[i].length === 0){
          waitTranslation = 'Nenhuma tradução encontrada :(';
        }else{
          waitTranslation = translatedWords[i].map(objects => { return objects.normalizedTarget});
        }
        
      }
      
      divList.push(<div className="unknown-words" key={i}>
      <p key={i}>{unknownWords[i] + "-" +  waitTranslation}</p>
      <button onClick={() => removeOneWord(i)}>x</button>
      </div>);
      
     }
     return divList;
  }

  useEffect(() => {
    if (unknownWords.length > 0 && translatedWords.length < unknownWords.length) {
   
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
          to: ["pt"],
        },
        data: [{ text: unknownWords[unknownWords.length - 1] }],
        responseType: "json",
      }).then(function (response) {
       
        let newTranslations = response.data[0].translations;
        
        setTranslatedWords((oldArray) => [...oldArray, newTranslations]);
     
      });
    }
// eslint-disable-next-line
  }, [unknownWords]);

  return (
    <div className="app">
      <div className="center-container">
        <div className="input-and-button">
          <h1> Learning english with phrases</h1>
          {console.log("unknown:" + unknownWords.length)}
          {console.log("translated:" + translatedWords.length)}
          <input ref={inputPhrase} type="text" />
          <button onClick={handleClickButton}>Try it!</button>
          <button onClick={handleClickButtonClear}>Clear all</button>
        </div>
        <div className="phrase">
          {phrase.length > 0 &&
            phrase.map((word, index) => {
              return (
                <button
                  className={
                    unknownWords.includes(word.replace(/[.,\s]/g, '')) ? "word-hightlight" : ""
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
            listHightLightedWordsAndTranslations().map(div => { return div})
            }
        </div>
      </div>
    </div>
  );
}

export default App;
