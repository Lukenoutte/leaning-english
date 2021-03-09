import React, { useRef } from "react";
import "./styles/choose_language.css";

export default function ChooseLanguage(props) {
  const { valueSelected, functionSelect } = props;
  
  const countries = useRef({
    "pt-br": "Portuguese (BR)",
    fr: "French",
    es: "Spanish",
    ja: "Japanese",
    ru: "Russian",
    sw: "Swahili",
    id: "Indonesian",
    "zh-Hans": "Chinese"
  });

  return (
    <div className="choose-language-wrapper" data-testid="choose-language">
      <div className="from-container g-shadow-light">
        <span>From: </span>
        <select name="language">
          <option value="en">English</option>
        </select>
      </div>
      <div className="to-container g-shadow-light">
        <span>To: </span>
        <select
          name="languages"
          value={valueSelected}
          onChange={(e) => functionSelect(e)}
        >
          {Object.entries(countries.current).map((country) => {
            return (<option value={country[0]} key={country[0]}>{country[1]}</option>)
          })}
        </select>
      </div>
    </div>
  );
}
