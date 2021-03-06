import React, { useState, useRef, useEffect, useContext } from "react";
import ChooseLanguage from "../components/chooseLanguage/chooseLanguage";
import SentenceSliced from "../components/handleWords/sentenceSliced";
import PopUp from "../components/utilities/popUp";
import WordsAndTranslations from "../components/handleWords/wordsAndTranslation";
import "../styles/main.css";
import { addWords  } from "../services/myApi/words";
import { AuthContext } from "../context/AuthContext";
import { MainContext } from "../context/MainContext";
import HandleUserEffect from "../components/handleUserEffect/handleUserEffect";

function Main() {
  const inputPhrase = useRef(null);

  const { authenticated } = useContext(AuthContext);
  const [popUpMessage, setPopUpMessage] = useState("");
  const {
    translatedWords,
    unknownWords,
    sameWordsFromProfile,
    sentence,
    showPopUp,
    languageSelect,
    addedNewWords,
    clearUnkownAndTranslated
  } = useContext(MainContext);

  const [translatedWordsValue] = translatedWords;
  const [unknownWordsValue, setUnknownWords] = unknownWords;
  const [showPopUpValue, setShowPopUp] = showPopUp;
  const [languageSelectValue] = languageSelect;
  const [addedNewWordsValue, setAddedNewWords] = addedNewWords;
  const setSameWordsFromProfile = sameWordsFromProfile[1];
  const setSentence = sentence[1];

  function handleButtonSplitPhrase() {
    let currentPhrase = inputPhrase.current.value;
    if (currentPhrase !== "") {
      setSameWordsFromProfile([]);
      setSentence(currentPhrase.split(" "));
    }
  }

  function handleClickButtonClear() {
    setSentence([]);
    clearUnkownAndTranslated();
    inputPhrase.current.value = "";
  }

  async function addProfileWords() { // API call to add new word on profile
    let validWords = unknownWordsValue.filter(
      (word) =>
        translatedWordsValue[word] && translatedWordsValue[word].length > 0
    );

    if (validWords && validWords.length > 0) {
      const response = await addWords({ validWords });

      if (response && response.status === 200) {
        setPopUpMessage("You add a new word to your list!");
        setShowPopUp(true);
        setUnknownWords([]);

        if (addedNewWordsValue) {
          setAddedNewWords(false);
        } else {
          setAddedNewWords(true);
        }
      }else{
        setPopUpMessage("Something went wrong! :(")
        setShowPopUp(true);
      }
    }
  }

  useEffect(() => {
    // Clear main on login and logout
    handleClickButtonClear();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  return (
    <>
      <div className="main-tool global-wrapper">
        <div className="g-center-container">
          <ChooseLanguage
            valueSelected={languageSelectValue}
          />

          <div className="input-and-button g-shadow-light g-styled-buttons">
            <h1> Copy and paste some sentence or text in english:</h1>

            <input ref={inputPhrase} type="text" data-testid="main-input" />
            <button id="try-it-button" onClick={handleButtonSplitPhrase} data-testid="try-it">
              Try it!
            </button>
            <button onClick={handleClickButtonClear}>Clear all</button>
          </div>

          <SentenceSliced />

          <WordsAndTranslations />
        </div>
      </div>
      {authenticated && unknownWordsValue.length > 0 && (
        <button className="add-to-profile-list" onClick={addProfileWords}>
          +
        </button>
      )}

      {showPopUpValue && <PopUp message={popUpMessage} />}
      <HandleUserEffect/>
    </>
  );
}

export default Main;
