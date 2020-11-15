import React, {useState} from 'react';
import { taskType } from './DataTypes';

interface NewTaskProps {
    groupID: number;
    numberOfTasks: number;
    confirmAdd(task: taskType): void;
    cancelAdd(): void;
}

const NewTask: React.FC<NewTaskProps> = (props) => {
    const [name, setName] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [deadline, setDeadline] = useState<string>('');
    const [priority, setPriority] = useState<number>(props.numberOfTasks + 1);

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const onDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDesc(e.target.value);
    }
    const onDatetimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeadline(e.target.value);
    }

    const confirmAdd = () =>{
        if (name.length === 0 && deadline !== '') return;
        fetch('http://localhost:8888/api/tasks', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify({
                TaskgroupID: props.groupID,
                Name: name,
                Description: desc,
                Priority: priority,
                Deadline: deadline
            }),
        })
        .then(response => response.json())
        .then(response => {
            props.confirmAdd({id: response.id, taskgroupID: props.groupID, name, description: desc, deadline, priority: priority});
            setPriority(priority + 1);
        });
    }

    return (
        <div className="add-task">
            <input
                type="text"
                className="form-control-sm taskdetail mb-1"
                placeholder="Title"
                value={name}
                onChange={onNameChange}
            />
            <textarea placeholder="Enter a note" value={desc} onChange={onDescChange}></textarea>
            <input type="datetime-local" className="form-control-sm taskdetail mb-1" onChange={onDatetimeChange} />
            <button className={'btn btn-success btn-sm button-add-or-cancel' + (name.length > 0 && deadline !== '' ? '' : ' disabled')} onClick={confirmAdd}>Add</button>
            <button className="btn btn-light btn-sm button-cancel button-add-or-cancel" onClick={props.cancelAdd}>Cancel</button>
        </div>
    );
};

export default NewTask;
