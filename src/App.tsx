import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Content from './Content';
import './App.css';

const App: React.FC = () => {
    const [loggedIn, setLoggedin] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [userID, setUserID] = useState<number>(1);

    useEffect(()=>{
        fetch('https://my-json-server.typicode.com/Balint-Jeszenszky/temalab-mock-backend/logindata')
        .then(response => response.json())
        .then(response => {
            setUserID(response.userid);
            setLoading(false);
            setUserID(response.userid);
        })
        .catch(error => setError(true))
    }, []);
    
    return (
        <div className="box">
            {loading && <div>Loading...</div>}
            {!loading && !error && 
                <div className="box">
                    <Navbar
                        userID={userID}
                        loggedIn={loggedIn}
                    />
                    <Content
                        loggedIn={loggedIn}
                        setLoggedin={setLoggedin}
                        userID={userID}
                    />
                </div>
            }
            {error && <div>Error</div>}
        </div>
    );
};

export default App;
