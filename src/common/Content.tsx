import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from '../auth/Auth';
import Project from '../project/Project';
import MyProjects from '../dashboard/MyProjects';
import Profile from '../profile/Profile';
import Logout from '../auth/Logout';

interface ContentProps {
    loggedIn: boolean;
    userID: number;
    setLoggedin(param: boolean): void;
    setUserID(id: number): void;
}

const Content: React.FC<ContentProps> = props => {
    return (
        <Switch>
            <Route exact path='/'>
                {props.loggedIn ? <Redirect to="/projects" /> : <Redirect to="/auth" />}
            </Route>
            <Route exact path="/auth">
                {props.loggedIn ? <Redirect to="/projects" /> : <Auth setLoggedin={props.setLoggedin} setUserID={props.setUserID} />}
            </Route>
            <Route exact path="/projects">
                {props.loggedIn ? <MyProjects userID={props.userID} /> : <Redirect to="/auth" />}
            </Route>
            <Route path="/projects/:id">
                {props.loggedIn ? <Project userID={props.userID} /> : <Redirect to="/auth" />}
            </Route>
            <Route exact path="/profile">
                {props.loggedIn ? <Profile userID={props.userID} /> : <Redirect to="/auth" />}
            </Route>
            <Route exact path='/logout'>
                <Logout setLoggedin={props.setLoggedin} />
            </Route>
        </Switch>
    );
};

export default Content;
