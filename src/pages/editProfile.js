import React, { useRef, useState, useEffect, useContext } from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import "../styles/login.css";
import Loading from "../components/loading";
import history from "../history";
import { editUserInfo, userInformations } from "../services";
import { AuthContext } from "../context/AuthContext";

function EditProfile() {
  const inputEmail = useRef("");
  const inputPass = useRef("");
  const [emptyInput, setEmptyInput] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const { authenticated } = useContext(AuthContext);

  useEffect(() => {
    if (authenticated) {
      async function getUserInfo() {
        const response = await userInformations();
        if (response.data) {
          setUserInfo(response.data);
          setNameInput(response.data.name);
          setEmailInput(response.data.email);
        }
      }

      getUserInfo();
    }
  }, [authenticated]);

  function handleSave(){
    editUserInfo({name: nameInput, email:  emailInput});
  } 

  return (
    <HeaderAndFotter>
      <div className="login global-wrapper">
        <div className="g-center-container-two">
          <div className="g-inputs-wrapper g-shadow-light g-styled-buttons">
            
              <>
              <input
                type="text"
                onChange={(e) => setNameInput(e.target.value)}
                value={nameInput}
              />

              <input
              type="text"
              onChange={(e) => setEmailInput(e.target.value)}
              value={emailInput}
            />

            <button onClick={handleSave}>Save</button>
            </>
           
          </div>
        </div>
      </div>
    </HeaderAndFotter>
  );
}

export default EditProfile;
