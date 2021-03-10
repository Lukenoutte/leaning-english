import React, { useRef, useContext } from "react";
import "./styles/choose_language.css";
import { MainContext } from "../../context/MainContext";

export default function ChooseLanguage(props) {
  const { valueSelected } = props;

  const countries = useRef({
    "pt-br": "Portuguese (BR)",
    fr: "French",
    es: "Spanish",
    ja: "Japanese",
    ru: "Russian",
    sw: "Swahili",
    id: "Indonesian",
    "zh-Hans": "Chinese",
  });

  const { languageSelect, clearUnkownAndTranslated } = useContext(MainContext);
  const setLanguageSelect = languageSelect[1];

  function changeLanguage(event) {
    setLanguageSelect(event.target.value);

    clearUnkownAndTranslated();
  }

  return (
    <div className="choose-language-wrapper" data-testid="choose-language">
      <div className="from-container g-shadow-light">
        <span>From: </span>
        <select name="language">
          <optgroup>
            <option value="en">English</option>
          </optgroup>
        </select> 
      </div>
      <div className="to-container g-shadow-light">
        <span>To: </span>
        <select
          name="languages"
          value={valueSelected}
          onChange={(e) => changeLanguage(e)}
        >
          <optgroup>
            {Object.entries(countries.current).map((country) => {
              return (
                <option value={country[0]} key={country[0]}>
                  {country[1]}
                </option>
              );
            })}
          </optgroup>
        </select>
      </div>
    </div>
  );
}
