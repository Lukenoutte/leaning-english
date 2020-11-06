import React, { useState, useRef, useEffect } from "react";
import "./styles/global.css";
import "./styles/app.css";


function App() {
  const [phrase, setPhrase] = useState([]);
  const [unknownWords, setUnknownWords] = useState([]);
  const inputPhrase = useRef(null);
  const uuidv4 = require('uuid/v4');
  const axios = require('axios').default;  



  function handleClickInput() {
    let currentPhrase = inputPhrase.current.value;
    setPhrase(currentPhrase.split(" "));
  }

  function handleClickWord(word) {
    if (!unknownWords.includes(word)) {
      setUnknownWords((oldArray) => [...oldArray, word]);
    }
  }

  useEffect(() => {
    axios({
      baseURL: process.env.REACT_APP_ENDPOINT,
      url: '/translate',
      method: 'post',
      headers: {
          'Ocp-Apim-Subscription-Key': process.env.REACT_APP_KEY,
          'Content-type': 'application/json',
          'X-ClientTraceId': uuidv4().toString()
      },
      params: {
          'api-version': '3.0',
          'from': 'en',
          'to': ['pt']
      },
      data: [{
          'text': 'Hello World!'
      }],
      responseType: 'json'
  }).then(function(response){
      console.log(JSON.stringify(response.data, null, 4));
  })
  
  }, []);

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
            unknownWords.map((word, index) => {
              return (
                <div className="unknown-words" key={index}>
                  <p key={index}>{word}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
