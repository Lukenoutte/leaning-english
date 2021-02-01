import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/login";
import Main from "./pages/main";
import SignUp from "./pages/signUp";
import Profile from "./pages/profile";
import ForgotPass from "./pages/forgotPassword";
import CodeForgotPass from "./pages/codeForgotPass";

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/sign_up" component={SignUp} />
      <Route path="/profile" component={Profile} />
      <Route path="/forgot_pass" component={ForgotPass} />
      <Route path="/code_forgot_pass" component={CodeForgotPass} />
    </Switch>
  );
}
export default Routes;
