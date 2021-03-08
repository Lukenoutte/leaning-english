import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import NotFound from "../warning/notFound";
import LoadingCorner from "./loadingCorner";

export default function NeedAuth(props) {
  const { authenticated, waitingApiResponse } = useContext(AuthContext);
  const { needAuth } = props;

  const authControl = () => {
    if (!waitingApiResponse) {
      if ((needAuth && authenticated) | (!needAuth && !authenticated)) {
        return props.children;
      } else {
        return (<NotFound />);
      }
    }else{
      return (<LoadingCorner/>)
    }
  };
  return <>{authControl()}</>;
}
