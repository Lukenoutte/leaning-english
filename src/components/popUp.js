import React, { useContext, useEffect } from "react";
import "./styles/pop_up.css";
import { MainContext } from "../context/MainContext";

export default function PopUp(props) {
  const { showPopUp, setShowPopUp } = useContext(MainContext);

  useEffect(() => {
    if (showPopUp) {
      setTimeout(() => {setShowPopUp(false)}, 2000);
    }
  }, [showPopUp, setShowPopUp]);

  return (
    <div className="pop-up-wrapper">
      <div className="pop-up">{props.message}</div>
    </div>
  );
}
