import React, {useState} from 'react';
import { taskType } from './DataTypes';

interface TaskProps {
    task: taskType;
    onMove(n: number, dir: number): void;
}

const Task: React.FC<TaskProps> = props => {
    const [editing, setEditing] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [desc, setDesc] = useState<string>('');

    return (
        <div className="task" key={props.task.title}>
            <div className="title">
                {!editing && props.task.title}
                {editing && props.task.title}
                <div className="dropdown">
                    <button className="inisible task-buttons" type="button" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-h"></i>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu">
                        <button className="dropdown-item" type="button">Edit</button>
                        <button className="dropdown-item" type="button">Delete</button>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item" type="button">Move to {}</button>
                    </div>
                </div>

                <button className="inisible task-buttons" onClick={() => props.onMove(props.task.priority, 1)}><i className="fas fa-angle-up"></i></button>
                <button className="inisible task-buttons" onClick={() => props.onMove(props.task.priority, -1)}><i className="fas fa-angle-down"></i></button>
            </div>
            <p className="description">{props.task.description}</p>
            <p className="description">{new Date(props.task.deadline * 1000).toDateString()}</p>
        </div>
    );
};

export default Task;
