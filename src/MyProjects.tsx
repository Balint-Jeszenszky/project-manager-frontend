import React, {useState, ReactNode} from 'react';
import {projectType}from './DataTypes';
import {Link} from 'react-router-dom';

const MyProjects: React.FC = () => {
    const [projects, setProjects] = useState<ReactNode[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [addingProject, setAddingProject] = useState<boolean>(false);

    const deleteProject = (id: number): void => {
        setProjects(projects.filter((e, i) => i !== id));
    };

    const createProjectRow = (e: projectType, i: number): ReactNode => {
        return (
            <tr key={`/projects/${e.id}`}>
                <td>
                    <Link to={`/projects/${e.id}`}>{e.name}</Link>
                </td>
                <td>
                    {e.description}
                </td>
                <td className="text-right">
                    <button className="btn btn-warning"><i className="fas fa-edit" /></button>
                    <button className="btn btn-danger ml-2" onClick={() => deleteProject(i)}><i className="fas fa-trash" /></button>
                </td>
            </tr>
        );
    };

    if (!loaded) {
        fetch('https://my-json-server.typicode.com/Balint-Jeszenszky/temalab-mock-backend/projects')
        .then(response => response.json())
        .then(response => {
            let projs: ReactNode[] = [];
            response.projects.forEach((e: projectType, i: number) => {
                projs.push(createProjectRow(e, i));
            });
            setProjects(projs);
            setLoaded(true);
        });
    }

    const addProject = () => {
        setAddingProject(false);
    };

    const newProject = (): ReactNode => {
        return (
            <table className="table mt-2 projects">
                <tbody>
                    <tr>
                        <td className="w-25">
                            <input className="form-control taskdetail" type="text" placeholder="Project name" />
                        </td>
                        <td className="w-50">
                            <textarea placeholder="Description"></textarea>
                        </td>
                        <td className="text-right w-25">
                            <button className="btn btn-success" onClick={addProject}>
                                <i className="fas fa-check"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    };

    return (
        <div className="container">
            <div className="mt-2 mt-md-3 mt-lg-4 text-right">
                <button className="btn btn-success btn-sm" onClick={() => setAddingProject(true)}>New project</button>
                {addingProject && newProject()}
            </div>
            <table className="table mt-2 table-hover projects">
                <thead>
                    <tr>
                        <th className="w-25">Project name</th>
                        <th className="w-50">Description</th>
                        <th className="text-right w-25">Options</th>
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
