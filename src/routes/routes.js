import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../pages/authentication/login";
import Main from "../pages/main";
import SignUp from "../pages/authentication/signUp";
import Profile from "../pages/profile/profile";
import ForgotPass from "../pages/forgotPass/forgotPassword";
import TokenForgotPass from "../pages/forgotPass/tokenForgotPass";
import ChangePass from "../pages/forgotPass/changePass";
import Welcome from "../pages/welcomePage";
import ChangePassSucess from "../pages/forgotPass/changePassSucess";
import EditProfile from "../pages/profile/editProfile";
import NotFound from "../components/warning/notFound";

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
      <Route path='/404' component={NotFound} />
      <Redirect from='*' to='/404' />
    </Switch>
  );
}
export default Routes;
