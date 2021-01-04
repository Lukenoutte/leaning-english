import React, { useState, useRef, useEffect, useContext } from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import ChooseLanguage from "../components/chooseLanguage";
import SentenceSliced from "../components/sentenceSliced";
import PopUp from "../components/popUp";
import WordsAndTranslations from "../components/wordsAndTranslation";
import "../styles/main.css";

import { addWords, getWords, postMicrosoftApi } from "../services";
import { Context } from "../context/AuthContext";

function Main() {
  const [unknownWords, setUnknownWords] = useState([]);
  const [sameWordsFromProfile, setSameWordsFromProfile] = useState([]);
  const [sentence, setSentence] = useState([]);
  const [languageSelectValue, setLanguageToSelectValue] = useState("pt-br");
  const [translatedWords, setTranslatedWords] = useState({});
  const [profileWordsList, setProfileWordsList] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);

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
    setSameWordsFromProfile([]);
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
      setShowPopUp(true);
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
  }, [unknownWords, languageSelectValue]);

  useEffect(() => {
    // Get unknown words profile list from my api
    if (authenticated) {
      const wordsList = async () => {
        const words = await getWords();
        if (words.status === 200) {
          setProfileWordsList(words.data);
        }
      };
      wordsList();
    }
  }, [authenticated, unknownWords]);

  useEffect(() => {
    // Compare user sentence and profile words
    if (authenticated && sentence.length > 0) {
      const wordsFound = profileWordsList.filter(
        (element) => sentence.indexOf(element) !== -1
      );

      setSameWordsFromProfile((oldArray) =>
        oldArray.concat(wordsFound.filter((item) => oldArray.indexOf(item) < 0))
      );
    }
  }, [authenticated, sentence, profileWordsList]);

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
  }, [sameWordsFromProfile, languageSelectValue]);

  return (
    <HeaderAndFotter>
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
            sameWordsFromProfileVar={sameWordsFromProfile}
          />

          <WordsAndTranslations
            translatedWordsVar={translatedWords}
            unknownWordsVar={unknownWords}
            setUnknownWordsFunc={setUnknownWords}
            setTranslatedWordsFunc={setTranslatedWords}
            sameWordsFromProfileVar={sameWordsFromProfile}
            setSameWordsFuncProfileFunc={setSameWordsFromProfile}
          />

        </div>
      </div>
      {authenticated && unknownWords.length > 0 && (
        <button className="add-to-profile-list" onClick={handleAddProfileWords}>
          +
        </button>
      )}

      {showPopUp && (
       <PopUp message={"You add a new word!"} />
      )}

    </HeaderAndFotter>
  );
}

export default Main;
