import React, { createContext, useState } from "react";
const MainContext = createContext();

function MainProvider({ children }) {
  const [translatedWords, setTranslatedWords] = useState({});
  const [unknownWords, setUnknownWords] = useState([]);
  const [sameWordsFromProfile, setSameWordsFromProfile] = useState([]);
  const [sentence, setSentence] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [profileWordsList, setProfileWordsList] = useState([]);

  function cleanWord(word){
    return word.replace(/[.,?!;:\s]/g, "").toLowerCase();
  }

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
        setShowPopUp,
        
        profileWordsList,
        setProfileWordsList,
        cleanWord
      }}
    >
      {children}
      
    </MainContext.Provider>
  );
}

export { MainContext, MainProvider };
