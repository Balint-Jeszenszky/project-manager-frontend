import React, {useState} from 'react';

interface NewProjectProps {
    updateProjects(): void;
};

const NewProject: React.FC<NewProjectProps> = props => {
    const [projectName, setProjectName] = useState<string>('');
    const [projectDescription, setProjectDescription] = useState<string>('');

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectName(e.target.value);
    }
    const onDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProjectDescription(e.target.value);
    }

    const addProject = () =>{
        fetch('http://localhost:8888/api/project', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify({userID: 1, name: projectName, description: projectDescription}),
        }).then(() => props.updateProjects());
    }

    return (
        <table className="table mt-2 projects">
            <tbody>
                <tr>
                    <td className="w-25">
                        <input
                            className="form-control taskdetail"
                            type="text"
                            placeholder="Project name"
                            onChange={onNameChange}
                            value={projectName}
                        />
                    </td>
                    <td className="w-50">
                        <textarea placeholder="Description" onChange={onDescChange} value={projectDescription}></textarea>
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

export default NewProject;
