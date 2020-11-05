import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Content from './Content';
import './App.css';
import {projectType} from './DataTypes';

const App: React.FC = () => {
    const [loggedIn, setLoggedin] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [userID, setUserID] = useState<number>(-1);
    const [currentProject, setCurrentProject] = useState<projectType | undefined>(undefined);

    useEffect(()=>{
        fetch('https://my-json-server.typicode.com/Balint-Jeszenszky/temalab-mock-backend/logindata')
        .then(response => response.json())
        .then(response => {
            console.log(response.userid);
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
                        active="Profile"
                        userID={userID}
                        activeproject={currentProject}
                        setProject={setCurrentProject}
                        loggedIn={loggedIn}
                    />
                    <Content
                        loggedIn={loggedIn}
                        setLoggedin={setLoggedin}
                        setProject={setCurrentProject}
                    />
                </div>
            }
            {error && <div>Error</div>}
        </div>
    );
};

export default App;
