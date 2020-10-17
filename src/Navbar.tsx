import React, {useState} from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
    active: string;
    activeproject: {
        name: string | undefined,
        path: string
    };
};

const Navbar: React.FC<NavbarProps> = props => {
    /*const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [projectnames, setProjectnames] = useState<object>({});

    fetch('https://my-json-server.typicode.com/Balint-Jeszenszky/temalab-mock-backend/taskgroups')
        .then(response => response.json())
        .then(response => {
            setLoading(false);
            setProjectnames(response);
        })
        .catch(error => setError(true));*/


    const pagenames = [
        props.activeproject,
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
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {page.name}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link to="/projects/1" className="dropdown-item" href="#">TODO 1</Link>
                        <Link to="/projects/2" className="dropdown-item" href="#">TODO 2</Link>
                        <div className="dropdown-divider"></div>
                        <Link to="/projects" className="dropdown-item" href="#">All todos</Link>
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
                    {pages}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
