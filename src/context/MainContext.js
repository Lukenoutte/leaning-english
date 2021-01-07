import React, { createContext, useState } from "react";
const MainContext = createContext();

function MainProvider({ children }) {
  const [translatedWords, setTranslatedWords] = useState({});
  const [unknownWords, setUnknownWords] = useState([]);
  const [sameWordsFromProfile, setSameWordsFromProfile] = useState([]);
  const [sentence, setSentence] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <MainContext.Provider
      value={{
        translatedWords,
        setTranslatedWords,

        unknownWords,
        setUnknownWords,

        sameWordsFromProfile,
        setSameWordsFromProfile,

        sentence,
        setSentence,
        
        showPopUp,
        setShowPopUp
      }}
    >
      {children}
      
    </MainContext.Provider>
  );
}

export { MainContext, MainProvider };
