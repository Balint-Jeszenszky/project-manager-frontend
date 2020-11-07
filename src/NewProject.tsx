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
        fetch('https://postb.in/1604778180099-8157978984527', {
            method: "POST",
            mode: "no-cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify({userID: 1, projectName, projectDescription}),
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
