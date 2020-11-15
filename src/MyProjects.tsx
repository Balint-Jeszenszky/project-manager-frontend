import React, {useState, useEffect, ReactNode} from 'react';
import {projectType} from './DataTypes';
import NewProject from './NewProject';
import ProjectDetails from './ProjectDetails';

interface MyProjectsProps {
    userID: number;
}

const MyProjects: React.FC<MyProjectsProps> = (props) => {
    const [projects, setProjects] = useState<ReactNode[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [addingProject, setAddingProject] = useState<boolean>(false);
    
    useEffect(() => {
        fetch(`http://localhost:8888/api/project/projects/${props.userID}`)
        .then(response => response.json())
        .then(response => {
            let projs: ReactNode[] = [];
            response.forEach((e: projectType, i: number) => {
                projs.push(<ProjectDetails id={e.id} name={e.name} desc={e.description} updateProjects={updateProjects} key={`projects/${e.id}`} />);
            });
            setProjects(projs);
            setLoaded(true);
        });
    }, [loaded, props.userID]);

    const updateProjects = () => {
        setLoaded(false);
        setAddingProject(false);
    };

    return (
        <div className="container">
            <div className="mt-2 mt-md-3 mt-lg-4 text-right">
                <button className="btn btn-success btn-sm" onClick={() => setAddingProject(true)}>New project</button>
                {addingProject && <NewProject userID={props.userID} updateProjects={updateProjects} />}
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
                    {loaded && projects}
                </tbody>
            </table>
            {!loaded && 'Loading...'}
        </div>
    );
};

export default MyProjects;
