import React from "react";

export default function ChooseLanguage(props) {
  return (
    <div className="choose-language-wrapper">
      <div className="from-container shadow-light">
        <span>From: </span>
        <select name="language">
          <option value="en">English</option>
        </select>
      </div>
      <div className="to-container shadow-light">
        <span>To: </span>
        <select
          name="languages"
          value={props.valueSelected}
          onChange={(e) => props.functionSelect(e)}
        >
          <option value="pt-br">Portuguese (BR)</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="ja">Japanese</option>
          <option value="ru">Russian</option>
          <option value="sw">Swahili</option>
          <option value="id">Indonesian</option>
          <option value="zh-Hans">Chinese</option>
        </select>
      </div>
    </div>
  );
}
