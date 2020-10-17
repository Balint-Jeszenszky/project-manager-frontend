import React from 'react';
import {Redirect} from 'react-router-dom';

const Logout: React.FC = () => {
    return (
        <Redirect to="/auth" />
    );
};

export default Logout;
