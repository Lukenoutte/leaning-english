import React from 'react'
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/login';
import Main from './pages/main';

function Routes(){
    return(
    <BrowserRouter> 
            <Switch>
                <Route path="/" exact component={Main}/> 
                <Route path="/login" component={Login}/>
            </Switch>
     </BrowserRouter>)
}
export default Routes;