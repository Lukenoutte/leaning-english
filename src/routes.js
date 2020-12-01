import React from 'react'
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/login';
import Main from './pages/main';
import CreateAccount from './pages/createAccount';

function Routes(){
    return(
    <BrowserRouter> 
            <Switch>
                <Route path="/" exact component={Main}/> 
                <Route path="/login" component={Login}/>
                <Route path="/create_account" component={CreateAccount}/>
            </Switch>
     </BrowserRouter>)
}
export default Routes;