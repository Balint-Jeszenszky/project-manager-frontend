import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

interface NavbarProps {
    userID: number;
    loggedIn: boolean;
};

const Navbar: React.FC<NavbarProps> = props => {
    
    const pagenames = [
        {name: 'My projects', path: '/projects', active: useRouteMatch('/projects') !== null},
        {name: 'Profile', path: '/profile', active: useRouteMatch('/profile') !== null},
        {name: 'Logout', path: '/logout', active: false}
    ];
    const pages = pagenames.map((page, id) => {
        const active = page.active ? ' active' : '';
        const classname = `nav-item${active}`;
        return (
            <li className={classname} key={`nav${id}`}>
                <Link to={page.path} className="nav-link">{page.name}</Link>
            </li>
        );
    });
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark boxrow header">
            <Link className="navbar-brand" to="/">Project manager</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    {props.loggedIn && pages}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
