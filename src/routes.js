import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/login";
import Main from "./pages/main";
import SignUp from "./pages/signUp";
import Profile from "./pages/profile";
import ForgotPass from "./pages/forgotPassword";
import TokenForgotPass from "./pages/tokenForgotPass";
import ChangePass from "./pages/changePass";
import Welcome from "./pages/welcomePage";
import ChangePassSucess from "./pages/changePassSucess";
import EditProfile from "./pages/editProfile";

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/sign_up" component={SignUp} />
      <Route path="/profile" component={Profile} />
      <Route path="/forgot_pass" component={ForgotPass} />
      <Route path="/token_forgot_pass" component={TokenForgotPass} />
      <Route path="/change_pass" component={ChangePass} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/change_pass_sucess" component={ChangePassSucess} />
      <Route path="/edit_profile" component={EditProfile} />
    </Switch>
  );
}
export default Routes;
