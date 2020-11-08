import React, { useState } from 'react';
import { projectType } from './DataTypes';
import { Link } from 'react-router-dom';

interface ProjectDetailsProps {
    id: number;
    name: string;
    desc: string;
    updateProjects(): void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = props => {
    const [projectName, setProjectName] = useState<string>(props.name);
    const [projectDescription, setProjectDescription] = useState<string>(props.desc);
    const [editing, setEditing] = useState<boolean>(false);

    const deleteProject = () => {
        fetch(`http://localhost:8888/api/projects/${props.id}`, {
            method: 'DELETE',
            redirect: 'follow'
        }).then(() => props.updateProjects());
    }

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectName(e.target.value);
    }
    const onDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProjectDescription(e.target.value);
    }
    const edit = () => {
        setEditing(false);
        fetch(`http://localhost:8888/api/projects/${props.id}`, {
            method: 'PUT',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify({id: props.id, userID: 1, name: projectName, description: projectDescription}),
        }).then(() => props.updateProjects());
    }

    return (
        <tr key={`/projects/${props.id}`}>
            <td>
                {!editing && <Link to={`/projects/${props.id}`}>{projectName}</Link>}
                {editing &&
                    <input
                        className="form-control taskdetail"
                        type="text"
                        placeholder="Project name"
                        onChange={onNameChange}
                        value={projectName}
                    />
                }
            </td>
            <td>
                {!editing && projectDescription}
                {editing && <textarea placeholder="Description" onChange={onDescChange} value={projectDescription}></textarea>}
            </td>
            <td className="text-right">
                {!editing && <button className="btn btn-warning" onClick={() => setEditing(true)}><i className="fas fa-edit" /></button>}
                {editing && <button className="btn btn-success" onClick={edit}><i className="fas fa-check" /></button>}
                <button className="btn btn-danger ml-2" onClick={deleteProject}><i className="fas fa-trash" /></button>
            </td>
        </tr>
    );
};

export default ProjectDetails;