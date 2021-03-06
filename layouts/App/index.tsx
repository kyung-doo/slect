import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
const Login = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Workspace = loadable(() => import('@layouts/Workspace'));


const App: FC = () => {
   return (
      <Switch>
         <Redirect exact path="/" to="/login" />
         <Route path="/login" component={ Login } />
         <Route path="/signup" component={ SignUp } />
         <Route path="/workspace" component={ Workspace } />
      </Switch>
   )
}

export default App;