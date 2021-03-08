import React, { useState, useEffect, useContext } from "react";

import "./styles/edit_profile.css";
//import Loading from "../components/loading";
import history from "../../history";
import { editUserInfo, userInformations } from "../../services/myApi/userInfo";
import { AuthContext } from "../../context/AuthContext";
import NeedAuth from "../../components/utilities/needAuth";
import LoadingCorner from "../../components/utilities/loadingCorner";

function EditProfile() {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const { authenticated } = useContext(AuthContext);
  const [isLoadingCorner, setIsLoadingCorner] = useState(false);

  useEffect(() => {
    if (authenticated) {
      setIsLoadingCorner(true);
      async function getUserInfo() {
        const response = await userInformations();
        if (response.data) {

          setNameInput(response.data.name);
          setEmailInput(response.data.email);
        }
      }


      getUserInfo();
      setIsLoadingCorner(false);
    }
  }, [authenticated]);

  async function handleSave() {
    const response = await editUserInfo({ name: nameInput, email: emailInput });
    if (response.status && response.status === 200) {
      history.push("/profile");
    }
  }

  return (
    <NeedAuth needAuth={true}>

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
          {isLoadingCorner && <LoadingCorner/>}
        </div>
      
    </NeedAuth>
  );
}

export default EditProfile;
