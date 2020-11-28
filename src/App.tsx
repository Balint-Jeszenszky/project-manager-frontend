import React, { useState } from 'react';
import Navbar from './common/Navbar';
import Content from './common/Content';
import './App.css';

const App: React.FC = () => {
    const [loggedIn, setLoggedin] = useState<boolean>(false);
    const [userID, setUserID] = useState<number>(0);
    
    return (
        <div className="box">
            <div className="box">
                <Navbar
                    loggedIn={loggedIn}
                />
                <Content
                    loggedIn={loggedIn}
                    setLoggedin={setLoggedin}
                    setUserID={setUserID}
                    userID={userID}
                />
            </div>
        </div>
    );
};

export default App;
