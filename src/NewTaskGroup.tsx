import React, { useState, ReactNode } from 'react';
import TaskGroup from './TaskGroup';

interface NewTaskGroupProps {
    addGroup(group: ReactNode): void;
    projectID: number;
};

const NewTaskGroup: React.FC<NewTaskGroupProps> = props => {
    const [name, setName] = useState<string>('');
    const [adding, setAdding] = useState<boolean>(false);

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const addGroup = () =>{
        setAdding(false);
        fetch('http://localhost:8888/api/taskgroup', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify({ProjectID: props.projectID, Name: name, Priority: 5}),
        })
        .then(response => response.json())
        .then(response => props.addGroup(<TaskGroup id={response.id} place={5} name={name} />));
    }

    return (
        <div className="add-column">
            { adding && <input
                            className="form-control taskdetail"
                            type="text"
                            placeholder="Group name"
                            onChange={onNameChange}
                            value={name}
                        />
            }
            { adding && <button className="btn btn-success" onClick={addGroup}>
                            <i className="fas fa-check"></i>
                        </button>
            }
            { !adding && <button className="inisible" onClick={() => setAdding(true)}>+ Add</button> }
        </div>
    );
};

export default NewTaskGroup;
