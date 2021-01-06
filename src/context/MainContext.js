import React, { createContext, useState } from "react";
const MainContext = createContext();

function MainProvider({ children }) {
  const [translatedWords, setTranslatedWords] = useState({});
  const [unknownWords, setUnknownWords] = useState([]);
  const [sameWordsFromProfile, setSameWordsFromProfile] = useState([]);
  const [sentence, setSentence] = useState([]);
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
        setSentence
      }}
    >
      {children}
      
    </MainContext.Provider>
  );
}

export { MainContext, MainProvider };
