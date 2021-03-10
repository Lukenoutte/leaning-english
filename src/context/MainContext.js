import React, { createContext, useState } from "react";
const MainContext = createContext();

function MainProvider({ children }) {
  const [translatedWords, setTranslatedWords] = useState({});
  const [unknownWords, setUnknownWords] = useState([]);
  const [sameWordsFromProfile, setSameWordsFromProfile] = useState([]);
  const [sentence, setSentence] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [profileWordsList, setProfileWordsList] = useState([]);
  const [recoverPassInfo, setRecoverPassInfo] = useState({});
  const [languageSelect, setLanguageToSelect] = useState("pt-br");
  const [addedNewWords, setAddedNewWords] = useState(false);

  function cleanWord(word) {
    return word.replace(/[.,?!;:\s]/g, "").toLowerCase();
  }

  function clearUnkownAndTranslated() {
    setUnknownWords([]);
    setTranslatedWords({});
    setSameWordsFromProfile([]);
  }

  return (
    <MainContext.Provider
      value={{
        translatedWords: [translatedWords, setTranslatedWords],
        unknownWords: [unknownWords, setUnknownWords],
        sameWordsFromProfile: [sameWordsFromProfile, setSameWordsFromProfile],
        sentence: [sentence, setSentence],
        showPopUp: [showPopUp, setShowPopUp],
        profileWordsList: [profileWordsList, setProfileWordsList],
        recoverPassInfo: [recoverPassInfo, setRecoverPassInfo],
        languageSelect: [languageSelect, setLanguageToSelect],        
        addedNewWords: [addedNewWords, setAddedNewWords],
        cleanWord,
        clearUnkownAndTranslated
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export { MainContext, MainProvider };
