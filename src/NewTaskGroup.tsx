import React, { useState, ReactNode } from 'react';
import TaskGroup from './TaskGroup';

interface NewTaskGroupProps {
    projectID: number;
    numberOfGroups: number;
    addGroup(group: ReactNode): void;
    update(): void;
};

const NewTaskGroup: React.FC<NewTaskGroupProps> = props => {
    const [name, setName] = useState<string>('');
    const [adding, setAdding] = useState<boolean>(false);

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const cancelAdd = () => {
        setAdding(false);
        setName('');
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
            body: JSON.stringify({ProjectID: props.projectID, Name: name, Priority: props.numberOfGroups + 1}),
        })
        .then(response => response.json())
        .then(response => {
            props.addGroup(<TaskGroup id={response.id} projectID={props.projectID} priority={5} name={name} update={props.update}/>);
            setName('');
        });
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
            { adding && <button className="btn btn-danger" onClick={cancelAdd}>
                            <i className="fas fa-times"></i>
                        </button>
            }
            { !adding && <button className="inisible" onClick={() => setAdding(true)}>+ Add</button> }
        </div>
    );
};

export default NewTaskGroup;
