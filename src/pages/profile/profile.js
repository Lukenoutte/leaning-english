import React, { useEffect, useState, useContext } from "react";

import { userInformations } from "../../services/myApi/userInfo";
import { getWords, removeWord } from "../../services/myApi/words";
import { MainContext } from "../../context/MainContext";
import WordContainer from "../../components/handleWords/wordContainer";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/utilities/loading";
import LoadingCorner from "../../components/utilities/loadingCorner";
import "./styles/profile.css";
import { Link } from "react-router-dom";
import { ReactComponent as ConfigIcon } from "../../assets/icons/configIcon.svg";
import NeedAuth from "../../components/utilities/needAuth";
import PopUp from "../../components/utilities/popUp";

export default function Profile() {
  const [userInfo, setUserInfo] = useState([]);
  const { profileWordsList, showPopUp } = useContext(MainContext);
  const [profileWordsListValue, setProfileWordsList] = profileWordsList;
  const { authenticated } = useContext(AuthContext);
  const [showPopUpValue, setShowPopUp] = showPopUp;
  const [isLoadingCorner, setIsLoadingCorner] = useState(false);

  async function removeWordsFromProfile(word) {
    setIsLoadingCorner(true);
    const response = await removeWord({ word });

    if (response && response.status === 200) {
      setIsLoadingCorner(false);
    } else {
      setIsLoadingCorner(false);
      setShowPopUp(true);
    }
  }

  function listWordsFromProfile() {
    let divList = [];
    profileWordsListValue.map((word) =>
      divList.push(
        <WordContainer
          isProfileWord={false}
          key={word}
          onCloseButtonClicked={() => removeWordsFromProfile(word)}
        >
          <p>{word.toUpperCase()}</p>
        </WordContainer>
      )
    );

    return divList;
  }

  useEffect(() => {
    if (authenticated) {
      async function getUserInfo() {
        setUserInfo(await userInformations());
      }
      getUserInfo();
    }
  }, [authenticated]);

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
  }, [setProfileWordsList, authenticated, isLoadingCorner]);

  return (
    <NeedAuth needAuth={true}>
      <div className="profile global-wrapper">
        <div className="g-center-container">
          <Link to="/edit_profile" className="edit-profile">
            <ConfigIcon className="config-icon" />
          </Link>
          <h1 className="unknown-title">Profile</h1>
          {profileWordsListValue && userInfo && userInfo.data ? (
            <>
              <div className="user-info  g-shadow-light">
                <p>
                  <b>Name:</b> {userInfo.data.name}
                </p>
              </div>
              <div className="user-info  g-shadow-light">
                <p>
                  <b>Email:</b> {userInfo.data.email}
                </p>
              </div>

              <h2 className="unknown-title">Unkown Words:</h2>
              <div className="words-list-profile">
                {listWordsFromProfile().map((div) => {
                  return div;
                })}
              </div>
              {profileWordsListValue.length === 0 && (
                <p className="any-word-p">Any word founded :(</p>
              )}
            </>
          ) : (
            <Loading />
          )}
          {isLoadingCorner && <LoadingCorner />}
        </div>

        {showPopUpValue && <PopUp message={"Something went wrong! :("} />}
      </div>
    </NeedAuth>
  );
}
