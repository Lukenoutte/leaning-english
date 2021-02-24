import React, { useState, useEffect, useContext } from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import "../styles/edit_profile.css";
//import Loading from "../components/loading";
import history from "../history";
import { editUserInfo, userInformations } from "../services/myApi/userInfo";
import { AuthContext } from "../context/AuthContext";

function EditProfile() {
  //const inputEmail = useRef("");
 // const inputPass = useRef("");
  //const [emptyInput, setEmptyInput] = useState(false);
  //const [isLoading, setIsloading] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const { authenticated } = useContext(AuthContext);

  useEffect(() => {
    if (authenticated) {
      async function getUserInfo() {
        const response = await userInformations();
        if (response.data) {
         
          setNameInput(response.data.name);
          setEmailInput(response.data.email);
        }
      }

      getUserInfo();
    }
  }, [authenticated]);

  async function handleSave() {
    const response = await editUserInfo({ name: nameInput, email: emailInput });
    if(response.status && response.status === 200){
        history.push("/profile");
    }
  }

  return (
    <HeaderAndFotter>
      <div className="edit-profile-wrapper global-wrapper">
        <div className="g-center-container-two">
          <div className="g-inputs-wrapper g-shadow-light g-styled-buttons">
            <h1>Profile</h1>
            <>
              <div className="p-and-input">
                <p>Name:</p>
                <input
                  type="text"
                  onChange={(e) => setNameInput(e.target.value)}
                  value={nameInput}
                />
              </div>
              <div className="p-and-input" >
                <p>Email:</p>
                <input
                  type="text"
                  onChange={(e) => setEmailInput(e.target.value)}
                  value={emailInput}
                />
              </div>
              <button onClick={handleSave}>Save</button>
            </>
          </div>
        </div>
      </div>
    </HeaderAndFotter>
  );
}

export default EditProfile;
