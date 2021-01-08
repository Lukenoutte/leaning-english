import React,{useEffect, useState} from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import { userInformations } from "../services";

export default function Profile() {
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        async function getUserInfo(){
             setUserInfo(await userInformations());
        }
        getUserInfo();
    }, [])
    return (<HeaderAndFotter>

    </HeaderAndFotter>);
}