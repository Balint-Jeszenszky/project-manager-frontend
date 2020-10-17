import React from 'react';
import Navbar from './Navbar';
import Content from './Content';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="box">
            <Navbar active="Profile"  activeproject={{name: undefined, path: '#'}} />
            <Content />
        </div>
    );
};

export default App;
