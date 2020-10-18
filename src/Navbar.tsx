import React, {useState, ReactNode} from 'react';
import { Link } from 'react-router-dom';
import {projectType} from './DataTypes';

interface NavbarProps {
    userID: number;
    active: string;
    activeproject: projectType | undefined;
    setProject(p:  projectType): void;
    loggedIn: boolean;
};

const Navbar: React.FC<NavbarProps> = props => {
    const [projects, setProjects] = useState<ReactNode[]>([]);

    const createSubmenu = (e: projectType): ReactNode => {
        return (<Link to={`/projects/${e.id}`} key={`projects${e.id}`} className="dropdown-item">{e.name}</Link>);
    }

    if (props.loggedIn) {
        fetch('https://my-json-server.typicode.com/Balint-Jeszenszky/temalab-mock-backend/projects')
        .then(response => response.json())
        .then(response => {
            let projs: ReactNode[] = [];
            response.projects.forEach((e: projectType)=>{
                projs.push(createSubmenu(e));
            });
            setProjects(projs);
        });
    }
    
    const pagenames = [
        {name: 'My projects', path: '#'},
        {name: 'Profile', path: '/profile'},
        {name: 'Logout', path: '/logout'}
    ];
    const pages = pagenames.map((page, id) => {
        if (page.name === 'My projects') {
            const active = props.active === page.name ? ' active' : '';
            const classname = `nav-item dropdown${active}`;
            return (
                <li className={classname} key={`nav${id}`}>
                    <a className="nav-link dropdown-toggle" href="/projects" id="navbarDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {page.name}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        {projects}
                        <div className="dropdown-divider"></div>
                        <Link to="/projects" className="dropdown-item">All projects</Link>
                    </div>
                </li>
            );
        } else if (page.name !== undefined) {
            const active = props.active === page.name ? ' active' : '';
            const classname = `nav-item${active}`;
            return (
                <li className={classname} key={`nav${id}`}>
                    <Link to={page.path} className="nav-link">{page.name}</Link>
                </li>
            );
        } else {
            return undefined;
        }
    });
    if (pages[0] === undefined)
        pages.shift();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark boxrow header">
            <a className="navbar-brand" href="/">Project manager</a>

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
