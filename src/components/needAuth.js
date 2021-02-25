
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NotFound from "./notFound";

export default function NeedAuth(props) {
    const { authenticated } = useContext(AuthContext);
    const{ needAuth } = props;

    const authControl = () =>{
        if((needAuth && authenticated) | (!needAuth && !authenticated)){
            return props.children;
        }else {
            return (<NotFound/>);
        }
    }
    return (<> 
        {authControl()}
    </>)
}