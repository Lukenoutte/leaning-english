import React, { useState, useRef, useEffect, useContext } from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import ChooseLanguage from "../components/chooseLanguage";
import SentenceSliced from "../components/sentenceSliced";
import WordsAndTranslations from "../components/wordsAndTranslation";
import "../styles/main.css";

import { addWords, getWords, postMicrosoftApi } from "../services";
import { Context } from "../context/AuthContext";

function Main() {
  const [unknownWords, setUnknownWords] = useState([]);
  const [sameWords, setSameWords] = useState([]);
  const [sentence, setSentence] = useState([]);
  const [languageSelectValue, setLanguageToSelectValue] = useState("pt-br");
  const [translatedWords, setTranslatedWords] = useState({});
  const [profileWordsList, setProfileWordsList] = useState([]);
  
  const inputPhrase = useRef(null);
  
  const { authenticated } = useContext(Context);

  function handleButtonSplitPhrase() {
    let currentPhrase = inputPhrase.current.value;
    if (currentPhrase !== "") {
      setSentence(currentPhrase.split(" "));
    }
  }

  function ChangeLanguage(event) {
    setLanguageToSelectValue(event.target.value);

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

  async function handleAddProfileWords() {
    const response = await addWords({ unknownWords });
    if (response.status === 200) {
      console.log("OK");
    }
  }

  useEffect(() => {
    // API CALL
    if (
      unknownWords.length > 0 
    ) {
      postMicrosoftApi({
        languageSelectValue,
        data: unknownWords[unknownWords.length - 1],
      }).then(function (response) {
       
        let newTranslations = response.data[0].translations;
        var key = unknownWords[unknownWords.length - 1];
        var obj = {};
        obj[key] = newTranslations;
  
        setTranslatedWords((oldArray) => ({...oldArray, ...obj}));  // problem
      })

    }

    // eslint-disable-next-line
  }, [unknownWords, languageSelectValue]);

  useEffect(() => {
    // Get word list from my api
    if (authenticated) {
      const wordsList = async () => {
        const words = await getWords();
        if (words.status === 200) {
          setProfileWordsList(words.data);
        }
      };
      wordsList();
    }
  }, [authenticated]);

  useEffect(() => {
    // Profile words equals to the sentense
    if (authenticated && sentence.length > 0) {
      const wordsFound = profileWordsList.filter(
        (element) => sentence.indexOf(element) !== -1
      );

      setSameWords((oldArray) =>
        oldArray.concat(wordsFound.filter((item) => oldArray.indexOf(item) < 0))
      );
    }
  }, [authenticated, sentence, profileWordsList]);

  useEffect(() => {
    // API CALL only to translate words from profile
    if (sameWords.length > 0) {
      sameWords.map((word) =>
        postMicrosoftApi({
          languageSelectValue,
          data: word,
        }).then(function (response) {
          let newTranslations = response.data[0].translations;

          setTranslatedWords((oldArray) => [...oldArray, newTranslations]);
        })
      );
    }
  }, [sameWords, languageSelectValue]);

 

  return (
    <HeaderAndFotter>
     {console.log(translatedWords)}
      <div className="main-tool global-wrapper">
        <div className="center-container">
          <ChooseLanguage
            valueSelected={languageSelectValue}
            functionSelect={ChangeLanguage}
          />

          <div className="input-and-button shadow-light styled-buttons">
            <h1> Copy and paste some sentence or text in english:</h1>

            <input ref={inputPhrase} type="text" />
            <button id="try-it-button" onClick={handleButtonSplitPhrase}>
              Try it!
            </button>
            <button onClick={handleClickButtonClear}>Clear all</button>
          </div>
          <SentenceSliced
            sentenceVar={sentence}
            unknownWordsVar={unknownWords}
            setUnknownWordsFunc={setUnknownWords}
            sameWordsVar={sameWords}
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
        <button className="add-to-profile-list" onClick={handleAddProfileWords}>
          +
        </button>
      )}
    </HeaderAndFotter>
  );
}

export default Main;
