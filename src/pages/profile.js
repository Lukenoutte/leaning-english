import React, { useEffect, useState, useContext } from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import { userInformations } from "../services";
import { getWords } from "../services";
import { MainContext } from "../context/MainContext";
import WordContainer from "../components/wordContainer";

export default function Profile() {
  const [userInfo, setUserInfo] = useState([]);
  const { setProfileWordsList, profileWordsList } = useContext(MainContext);

  useEffect(() => {
    async function getUserInfo() {
      setUserInfo(await userInformations());
    }
    getUserInfo();
  }, []);

  useEffect(() => {
    // Get unknown words profile list from my api
    const wordsList = async () => {
      const words = await getWords();
      if (words.status && words.status === 200) {
        setProfileWordsList(words.data);
        console.log(words.data);
      }
    };
    wordsList();
  }, [setProfileWordsList]);

  return (
    <HeaderAndFotter>
      <div className="main-tool global-wrapper">
        <div className="center-container">
          {console.log(profileWordsList)}
          <WordContainer isProfileWord={false}> Test </WordContainer>
        </div>
      </div>
    </HeaderAndFotter>
  );
}
