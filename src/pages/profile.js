import React, { useEffect, useState, useContext } from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import { userInformations } from "../services";
import { getWords } from "../services";
import { MainContext } from "../context/MainContext";
import WordContainer from "../components/wordContainer";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/loading";
import "../styles/profile.css";

export default function Profile() {
  const [userInfo, setUserInfo] = useState([]);
  const { setProfileWordsList, profileWordsList } = useContext(MainContext);
  const { authenticated } = useContext(AuthContext);

  function listWordsFromProfile() {
    let divList = [];
    profileWordsList.map((word) =>
      divList.push(
        <WordContainer isProfileWord={false} key={word}>          
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
  }, [setProfileWordsList, authenticated]);

  return (
    <HeaderAndFotter>
      <div className="profile global-wrapper">
        <div className="center-container">
         
          {profileWordsList && profileWordsList.length > 0?listWordsFromProfile().map((div) => {
            return div;
          }):(<Loading/>)}
        
        </div>
      </div>
    </HeaderAndFotter>
  );
}
