import React, {useState} from 'react';

interface NewTaskProps {
    groupID: number;
    confirmAdd(title: string, desc: string, deadline: string, priority: number): void;
    cancelAdd(): void;
}

const NewTask: React.FC<NewTaskProps> = (props) => {
    const [name, setName] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [deadline, setDeadline] = useState<string>('');

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const onDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDesc(e.target.value);
    }

    const confirmAdd = () =>{
        if (name.length === 0) return;
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
                Priority: 2,
                Deadline: deadline
            }),
        })
        .then(response => response.json())
        .then(response => props.confirmAdd(name, desc, deadline, 2/*priority*/));
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
            <input type="datetime-local" className="form-control-sm taskdetail mb-1" />
            <button className={'btn btn-success btn-sm button-add-or-cancel' + (name.length > 0 ? '' : ' disabled')} onClick={confirmAdd}>Add</button>
            <button className="btn btn-light btn-sm button-cancel button-add-or-cancel" onClick={props.cancelAdd}>Cancel</button>
        </div>
    );
};

export default NewTask;
