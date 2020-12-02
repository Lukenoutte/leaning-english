import React from 'react'
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/login';
import Main from './pages/main';
import SignUp from './pages/signUp';

function Routes(){
    return(
    <BrowserRouter> 
            <Switch>
                <Route path="/" exact component={Main}/> 
                <Route path="/login" component={Login}/>
                <Route path="/sign_up" component={SignUp}/>
            </Switch>
     </BrowserRouter>)
}
export default Routes;