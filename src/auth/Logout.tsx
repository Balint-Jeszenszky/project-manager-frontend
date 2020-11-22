import React from 'react';
import {Redirect} from 'react-router-dom';

interface LogoutProps {
    setLoggedin(param: boolean): void;
}

const Logout: React.FC<LogoutProps> = props => {
    props.setLoggedin(false);
    return (
        <Redirect to="/auth" />
    );
};

export default Logout;
