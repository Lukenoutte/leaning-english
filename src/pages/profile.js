import React, { useEffect, useState, useContext } from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import { userInformations } from "../services";
import { getWords, removeWord } from "../services";
import { MainContext } from "../context/MainContext";
import WordContainer from "../components/wordContainer";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/loading";
import "../styles/profile.css";

export default function Profile() {
  const [userInfo, setUserInfo] = useState([]);
  const { setProfileWordsList, profileWordsList } = useContext(MainContext);
  const { authenticated } = useContext(AuthContext);
 
  const [isLoadingCorner, setIsLoadingCorner] = useState(false);

  async function removeWordsFromProfile(word) {
    setIsLoadingCorner(true);
    const response = await removeWord({ word });

    if (response.status && response.status === 200) {
      setIsLoadingCorner(false);
    } else {
      setIsLoadingCorner(false);
    }
  }

  function listWordsFromProfile() {
    let divList = [];
    profileWordsList.map((word) =>
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
        if (words.status && words.status === 200) {
          setProfileWordsList(words.data);
        }
      };
      wordsList();
    }
  }, [setProfileWordsList, authenticated, isLoadingCorner]);

  return (
    <HeaderAndFotter>
      <div className="profile global-wrapper">
        <div className="g-center-container">
          <h1 className="unknown-title">Profile</h1>
          {profileWordsList && userInfo.data ? (
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
              {profileWordsList.length === 0 && (
                <p className="any-word-p">Any word founded :(</p>
              )}
            </>
          ) : (
            <Loading />
          )}
          {isLoadingCorner && (
            <div className="loading-corner">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </HeaderAndFotter>
  );
}
