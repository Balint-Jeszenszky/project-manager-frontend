import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './Auth';
import Project from './Project';
import MyProjects from './MyProjects';
import Profile from './Profile';
import Logout from './Logout';

const Content = () => (
    <Switch>
        <Route exact path='/auth' component={Auth} />
        <Route exact path='/projects' component={MyProjects} />
        <Route path='/projects/:id' component={Project} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/logout' component={Logout} />
    </Switch>
)

export default Content;
