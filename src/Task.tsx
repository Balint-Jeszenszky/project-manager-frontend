import React, {useState} from 'react';
import { taskType } from './DataTypes';

interface TaskProps {
    task: taskType;
    projectID: number;
    update(): void;
    updateAll(): void;
}

const Task: React.FC<TaskProps> = props => {
    const [editing, setEditing] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [name, setName] = useState<string>(props.task.name);
    const [oldName, setOldName] = useState<string>(props.task.name);
    const [desc, setDesc] = useState<string>(props.task.description);
    const [deadline, setDeadline] = useState<string>(props.task.deadline);
    const [taskGroupOptions, setTaskGroupOptions] = useState<{id: number, name: string}[]>([]);
    const [taskGroupID, setTaskGroupID] = useState<number>(props.task.taskgroupID);

    if (!loaded) {
        fetch(`http://localhost:8888/api/taskgroup/groups/${props.projectID}`)
        .then(response => response.json())
        .then(response => {
            setTaskGroupOptions(response.map((e: {id: number, name: string}) => {
                return {id: e.id, name: e.name};
            }));
        });
        setLoaded(true);
    }

    const deadlineDate = new Date(deadline);

    const deleteTask = () => {
        fetch(`http://localhost:8888/api/tasks/${props.task.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        }).then(props.update);
    };

    const moveTask = (dir: number) => {
        fetch(`http://localhost:8888/api/tasks/${props.task.id}`, {
            method: 'PUT',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify({
                id: props.task.id,
                taskgroupID: props.task.taskgroupID,
                name: name,
                priority: props.task.priority + dir
            }),
        }).then(props.update);
    };

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const onDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDesc(e.target.value);
    }
    const onDatetimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeadline(e.target.value);
    }
    const onGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTaskGroupID(parseInt(e.target.value));
    }

    const cancelEdit = () => {
        setEditing(false);
        setName(oldName);
    }
    const confirmEdit = () =>{
        if (name.length === 0 && deadline !== '') return;
        fetch(`http://localhost:8888/api/tasks/${props.task.id}`, {
            method: 'PUT',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify({
                id: props.task.id,
                TaskgroupID: taskGroupID,
                Name: name,
                Description: desc,
                Priority: props.task.priority,
                Deadline: deadline
            }),
        })
        .then(() => {
            setOldName(name);
            if (taskGroupID !== props.task.taskgroupID) {
                props.updateAll();
            } else {
                props.update();
            }
            setEditing(false);
        });
    }

    return (
        <div>
            {!editing && <div className="task" key={props.task.name}>
                <div className="title">
                    {oldName}
                    <div className="dropdown">
                        <button className="inisible task-buttons" type="button" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-ellipsis-h"></i>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenu">
                            <button className="dropdown-item" type="button" onClick={() => setEditing(true)} >Edit</button>
                            <button className="dropdown-item" type="button" onClick={deleteTask} >Delete</button>
                        </div>
                    </div>

                    <button className="inisible task-buttons" onClick={() => moveTask(1)}><i className="fas fa-angle-up"></i></button>
                    <button className="inisible task-buttons" onClick={() => moveTask(-1)}><i className="fas fa-angle-down"></i></button>
                </div>
                <p className="description">{props.task.description}</p>
                <p className="description">{`${deadlineDate.toLocaleDateString()} ${deadlineDate.toLocaleTimeString()}`}</p>
            </div>}
            {editing && <div className="add-task">
                <input
                    type="text"
                    className="form-control-sm taskdetail mb-1"
                    placeholder="Title"
                    value={name}
                    onChange={onNameChange}
                />
                <textarea placeholder="Enter a note" value={desc} onChange={onDescChange}></textarea>
                <input type="datetime-local" className="form-control-sm taskdetail mb-1" onChange={onDatetimeChange} value={deadline} />
                <select className="form-control-sm taskdetail mb-1" onChange={onGroupChange} value={taskGroupID} >
                    {taskGroupOptions.map(e => <option key={`option${e.id}`} value={e.id.toString()}>{e.name}</option>)}
                </select>
                <button className={'btn btn-success btn-sm button-add-or-cancel' + (name.length > 0 && deadline !== '' ? '' : ' disabled')} onClick={confirmEdit}>Save</button>
                <button className="btn btn-light btn-sm button-cancel button-add-or-cancel" onClick={cancelEdit}>Cancel</button>
            </div>}
        </div>
    );
};

export default Task;
