import React, { useEffect, useContext } from "react";
import postMicrosoftApi from "../../services/microsoftApi";
import { getWords } from "../../services/myApi/words";
import { MainContext } from "../../context/MainContext";
import { AuthContext } from "../../context/AuthContext";

export default function HandleUserEffect() {
  const { authenticated } = useContext(AuthContext);

  const {
    translatedWords,
    unknownWords,
    sameWordsFromProfile,
    sentence,
    profileWordsList,
    languageSelect,
    addedNewWords,
  } = useContext(MainContext);

  const [unknownWordsValue] = unknownWords;
  const [
    sameWordsFromProfileValue,
    setSameWordsFromProfile,
  ] = sameWordsFromProfile;
  const [sentenceValue] = sentence;
  const [profileWordsListValue, setProfileWordsList] = profileWordsList;
  const [languageSelectValue] = languageSelect;
  const [addedNewWordsValue] = addedNewWords;
  const setTranslatedWords = translatedWords[1];

  useEffect(() => {
    // API CALL to translate selected word
    if (unknownWordsValue.length > 0) {
      postMicrosoftApi({
        languageSelectValue,
        data: unknownWordsValue[unknownWordsValue.length - 1],
      }).then(function (response) {
        let newTranslations = response.data[0].translations;
        var key = unknownWordsValue[unknownWordsValue.length - 1];
        var obj = {};
        obj[key] = newTranslations;

        setTranslatedWords((oldArray) => ({ ...oldArray, ...obj }));
      });
    }
  }, [unknownWordsValue, languageSelectValue, setTranslatedWords]);

  useEffect(() => {
    // Get unknown words profile list from my api

    if (authenticated) {
      const wordsList = async () => {
        const words = await getWords();
        if (words && words.status === 200) {
          setProfileWordsList(words.data);
        }
      };
      wordsList();
    }
  }, [authenticated, setProfileWordsList, addedNewWordsValue]);

  useEffect(() => {
    // Compare user sentence and profile words
    if (authenticated && sentenceValue.length > 0) {
      const wordsFound = profileWordsListValue.filter(
        (element) =>
          sentenceValue
            .map((word) => word.replace(/[.,?!;:\s]/g, "").toLowerCase())
            .indexOf(element.toLowerCase()) !== -1
      );

      setSameWordsFromProfile((oldArray) =>
        oldArray.concat(wordsFound.filter((item) => oldArray.indexOf(item) < 0))
      );
    }
  }, [
    authenticated,
    sentenceValue,
    profileWordsListValue,
    setSameWordsFromProfile,
  ]);

  useEffect(() => {
    // API CALL only to translate words from profile
    if (sameWordsFromProfileValue.length > 0) {
      sameWordsFromProfileValue.map((word) =>
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
  }, [sameWordsFromProfileValue, languageSelectValue, setTranslatedWords]);

  return <></>;
}
