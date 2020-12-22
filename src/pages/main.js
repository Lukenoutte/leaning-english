import React, { useState, useRef, useEffect, useContext } from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import ChooseLanguage from "../components/chooseLanguage";
import SentenceSliced from "../components/sentenceSliced";
import WordsAndTranslations from "../components/wordsAndTranslation";
import "../styles/main.css";
import { v4 as uuidv4 } from "uuid";
import { addWords, getWords } from "../services";
import { Context } from "../context/AuthContext";

function Main() {
  const [unknownWords, setUnknownWords] = useState([]);
  const [sentence, setSentence] = useState([]);
  const [toSelectValue, setToSelectValue] = useState("pt-br");
  const [translatedWords, setTranslatedWords] = useState([]);
  const [profileWordsList, setProfileWordsList] = useState([]);
  const inputPhrase = useRef(null);
  const { authenticated } = useContext(Context);

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

  async function handleAddWords() {
    const response = await addWords({ unknownWords });
    if (response.status === 200) {
      console.log("OK");
    }
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

  useEffect(() => {
    if (authenticated) {
      const wordsList = async () => {
        const words = await getWords();
        if(words.status === 200){
        setProfileWordsList(words);
        }
      };
      wordsList();
    }
  }, [authenticated]);

  return (
    <HeaderAndFotter>
      <div className="main-tool global-wrapper">
        <div className="center-container">
          <ChooseLanguage
            valueSelected={toSelectValue}
            functionSelect={ChangeSelectTo}
          />

          <div className="input-and-button shadow-light styled-buttons">
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
      {authenticated && unknownWords.length > 0 && (
        <button className="add-to-profile-list" onClick={handleAddWords}>
          +
        </button>
      )}
    </HeaderAndFotter>
  );
}

export default Main;
