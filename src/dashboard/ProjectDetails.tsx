import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteConfirm from '../common/DeleteConfirm';

interface ProjectDetailsProps {
    id: number;
    userID: number;
    name: string;
    desc: string;
    updateProjects(): void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = props => {
    const [projectName, setProjectName] = useState<string>(props.name);
    const [oldProjectName, setOldProjectName] = useState<string>(props.name);
    const [projectDescription, setProjectDescription] = useState<string>(props.desc);
    const [oldProjectDescription, setOldProjectDescription] = useState<string>(props.desc);
    const [editing, setEditing] = useState<boolean>(false);

    const deleteProject = () => {
        fetch(`http://localhost:8888/api/project/${props.id}`, {
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
    const cancelEdit = () => {
        setProjectName(oldProjectName);
        setProjectDescription(oldProjectDescription);
        setEditing(false);
    }
    const edit = () => {
        setEditing(false);
        fetch(`http://localhost:8888/api/project/${props.id}`, {
            method: 'PUT',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify({id: props.id, userID: props.userID, name: projectName, description: projectDescription}),
        }).then(() => {
            setOldProjectName(projectName);
            setOldProjectDescription(projectDescription);
        });
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
                {!editing && <button className="btn btn-primary" onClick={() => setEditing(true)}><i className="fas fa-edit" /></button>}
                {editing && <button className="btn btn-success" onClick={edit}><i className="fas fa-check" /></button>}
                {!editing && <DeleteConfirm name={projectName} onConfirm={deleteProject} id={`deleteModalProject${props.id}`} />}
                {!editing && <button className="btn btn-danger ml-2" data-toggle="modal" data-target={`#deleteModalProject${props.id}`}><i className="fas fa-trash" /></button>}
                {editing && <button className="btn btn-danger ml-2" onClick={cancelEdit}><i className="fas fa-times" /></button>}
            </td>
        </tr>
    );
};

export default ProjectDetails;