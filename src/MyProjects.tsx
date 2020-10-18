import React, {useState, ReactNode} from 'react';
import {projectType}from './DataTypes';
import {Link} from 'react-router-dom';

const MyProjects: React.FC = () => {
    const [projects, setProjects] = useState<ReactNode[]>([]);

    const createProjectRow = (e: projectType): ReactNode => {
        return (
            
            <tr>
                <td>
                    <Link to={`/projects/${e.id}`} key={`projects${e.id}`}>{e.name}</Link>
                </td>
                <td>
                    {e.description}
                </td>
                <td className="text-right">
                    <button className="btn btn-warning mr-2"><i className="fas fa-edit" /></button>
                    <button className="btn btn-danger"><i className="fas fa-trash" /></button>
                </td>
            </tr>
        );
    };

    fetch('https://my-json-server.typicode.com/Balint-Jeszenszky/temalab-mock-backend/projects')
    .then(response => response.json())
    .then(response => {
        let projs: ReactNode[] = [];
        response.projects.forEach((e: projectType) => {
            projs.push(createProjectRow(e));
        });
        setProjects(projs);
    });
    return (
        <div className="container">
            <div className="mt-2 mt-md-3 mt-lg-4 text-right">
                <button className="btn btn-success btn-sm">New project</button>
            </div>
            <table className="table mt-2 table-hover projects">
                <thead>
                    <tr>
                        <th>Project name</th>
                        <th>Description</th>
                        <th className="text-right">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {projects}
                </tbody>
            </table>
        </div>
    );
};

export default MyProjects;
