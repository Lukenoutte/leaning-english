import React, { useState, useRef, useEffect, useContext } from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import ChooseLanguage from "../components/chooseLanguage";
import SentenceSliced from "../components/sentenceSliced";
import PopUp from "../components/popUp";
import WordsAndTranslations from "../components/wordsAndTranslation";
import "../styles/main.css";

import  postMicrosoftApi from "../services/microsoftApi";
import { addWords, getWords} from "../services/myApi/words";
import { AuthContext } from "../context/AuthContext";
import { MainContext } from "../context/MainContext";

function Main() {
  const [languageSelectValue, setLanguageToSelectValue] = useState("pt-br");
  const [addedNewWords, setAddedNewWords] = useState(false);
  const inputPhrase = useRef(null);

  const { authenticated } = useContext(AuthContext);
  const {
    translatedWords,
    setTranslatedWords,
    unknownWords,
    setUnknownWords,
    sameWordsFromProfile,
    setSameWordsFromProfile,
    sentence,
    setSentence,
    showPopUp,
    setShowPopUp,
    profileWordsList,
    setProfileWordsList,
  } = useContext(MainContext);

  function handleButtonSplitPhrase() {
    let currentPhrase = inputPhrase.current.value;
    if (currentPhrase !== "") {
      setSameWordsFromProfile([]);
      setSentence(currentPhrase.split(" "));
    }
  }

  function ChangeLanguage(event) {
    setLanguageToSelectValue(event.target.value);

    clearUnkownAndTranslated();
  }

  function clearUnkownAndTranslated() {
    setUnknownWords([]);
    setTranslatedWords({});
    setSameWordsFromProfile([]);
  }

  function handleClickButtonClear() {
    setSentence([]);
    clearUnkownAndTranslated();
    inputPhrase.current.value = "";
  }

  async function addProfileWords() {
    let validWords = unknownWords.filter((word) => 
      translatedWords[word] && translatedWords[word].length > 0
    );

    if (validWords && validWords.length > 0) {
      
      const response = await addWords({ validWords });

      if (response.status && response.status === 200) {
        setShowPopUp(true);
        setUnknownWords([]);

        if (addedNewWords) {
          setAddedNewWords(false);
        } else {
          setAddedNewWords(true);
        }
      }
    }
  }

  useEffect(() => {
    // API CALL to translate selected word
    if (unknownWords.length > 0) {
      postMicrosoftApi({
        languageSelectValue,
        data: unknownWords[unknownWords.length - 1],
      }).then(function (response) {
        let newTranslations = response.data[0].translations;
        var key = unknownWords[unknownWords.length - 1];
        var obj = {};
        obj[key] = newTranslations;

        setTranslatedWords((oldArray) => ({ ...oldArray, ...obj }));
      });
    }
  }, [unknownWords, languageSelectValue, setTranslatedWords]);

  useEffect(() => {
    // Get unknown words profile list from my api

    if (authenticated) {
      const wordsList = async () => {
        const words = await getWords();
        if (words.status && words.status === 200) {
          setProfileWordsList(words.data);
        }
      };
      wordsList();
    }
  }, [authenticated, setProfileWordsList, addedNewWords]);

  useEffect(() => {
    // Compare user sentence and profile words
    if (authenticated && sentence.length > 0) {
      const wordsFound = profileWordsList.filter(
        (element) =>
          sentence
            .map((word) => word.replace(/[.,?!;:\s]/g, "").toLowerCase())
            .indexOf(element.toLowerCase()) !== -1
      );

      setSameWordsFromProfile((oldArray) =>
        oldArray.concat(wordsFound.filter((item) => oldArray.indexOf(item) < 0))
      );
    }
  }, [authenticated, sentence, profileWordsList, setSameWordsFromProfile]);

  useEffect(() => {
    // API CALL only to translate words from profile
    if (sameWordsFromProfile.length > 0) {
      sameWordsFromProfile.map((word) =>
        postMicrosoftApi({
          languageSelectValue,
          data: word,
        }).then(function (response) {
          let newTranslations = response.data[0].translations;

          var key = word;
          var obj = {};
          obj[key] = newTranslations;

          setTranslatedWords((oldArray) => ({ ...oldArray, ...obj }));
        })
      );
    }
  }, [sameWordsFromProfile, languageSelectValue, setTranslatedWords]);

  useEffect(() => {
    // Clear main on login and logout
    handleClickButtonClear();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  return (
    <HeaderAndFotter>
      <div className="main-tool global-wrapper">
        <div className="g-center-container">
          <ChooseLanguage
            valueSelected={languageSelectValue}
            functionSelect={ChangeLanguage}
          />

          <div className="input-and-button g-shadow-light g-styled-buttons">
            <h1> Copy and paste some sentence or text in english:</h1>

            <input ref={inputPhrase} type="text" />
            <button id="try-it-button" onClick={handleButtonSplitPhrase}>
              Try it!
            </button>
            <button onClick={handleClickButtonClear}>Clear all</button>
          </div>

          <SentenceSliced />

          <WordsAndTranslations />
        </div>
      </div>
      {authenticated && unknownWords.length > 0 && (
        <button className="add-to-profile-list" onClick={addProfileWords}>
          +
        </button>
      )}

      {showPopUp && <PopUp message={"You add a new word to your list!"} />}
    </HeaderAndFotter>
  );
}

export default Main;
