import React, { useState, ReactNode } from 'react';
import { taskType } from './DataTypes';
import Task from './Task';

interface ProjectGroupProps {
    place: number;
    name: string;
    tasks: taskType[]
    onMove(n: number, dir: number): void;
};

const ProjectGroup: React.FC<ProjectGroupProps> = props => {
    const [taskNodes, updateTaskNodess] = useState<ReactNode[]>([]);
    const [addingTask, setAddingTask] = useState<boolean>(false);
    const [load, setLoad] = useState<boolean>(false);

    const cancelAdd = (): void => {
        updateTaskNodess(taskNodes.filter((e) => {return typeof e !== typeof Task}));
        setAddingTask(false);
    };

    const addTaskForm = (): ReactNode => {
        return (
            <div className="add-task">
                <input type="text" className="form-control-sm taskdetail mb-1" placeholder="Title" />
                <textarea placeholder="Enter a note"></textarea>
                <input type="date" className="form-control-sm taskdetail mb-1" />
                <button className="btn btn-success btn-sm disabled button-add-or-cancel"  onClick={confirmAdd}>Add</button>
                <button className="btn btn-light btn-sm button-cancel button-add-or-cancel" onClick={cancelAdd}>Cancel</button>
            </div>
        );
    };

    const showTaskAdder = () => {
        if (!addingTask) {
            updateTaskNodess([addTaskForm(), ...taskNodes]);
            setAddingTask(true);
        }
    };

    const columnheader = (): ReactNode => {
        return (
            <div className="taskname">
                <span className="taskcount">{props.tasks.length}</span>
                {props.name}
                <div className="dropdown">
                    <button className="inisible task-buttons" type="button" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-h"></i>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu">
                        <button className="dropdown-item" type="button">Edit</button>
                        <button className="dropdown-item" type="button">Delete</button>
                    </div>
                </div>
                <button className="inisible task-buttons mr-2 px-1" onClick={showTaskAdder}>
                    <i className="fas fa-plus"></i>
                </button>
                <button className="inisible task-buttons mr-2 px-1" onClick={() => props.onMove(props.place, 1)}>
                    <i className="fas fa-angle-right"></i>
                </button>
                <button className="inisible task-buttons mr-2 px-1" onClick={() => props.onMove(props.place, -1)}>
                    <i className="fas fa-angle-left"></i>
                </button>
            </div>
        );
    };

    const columncontent = (): ReactNode => {
        return (
            <div className="tasklist">
                {taskNodes}
            </div>
        );
    };

    const deleteTask = () => {

    }

    const moveTask = (n: number, dir: number) => {
        updateTaskNodess(props.tasks.map((t: taskType) => {
            if (t.priority === n) {
                t.priority += dir;
            } else if ((t.priority > n && dir === 1) || (t.priority < n && dir === -1)) {
                t.priority -= dir;
            }
            return (
                <Task
                    task={t}
                    onMove={moveTask}
                    key={t.title}
                />
            );
        }));
        setLoad(false);
        loadData();
    };

    const confirmAdd = () => {
        updateTaskNodess([
            addTaskForm(),
            <Task
                task={{
                    title:'lol',
                    description:'lol',
                    deadline:3,
                    state:2,
                    priority:1
                }}
                onMove={moveTask}
            />,
            ...taskNodes
        ]);
    }

    const loadData = () => {
        updateTaskNodess(props.tasks.sort((a: taskType, b: taskType) => {
            if (a.priority > b.priority) return -1;
            return 1;
        }).map((e: taskType) => {
            return (
                <Task
                    task={e}
                    onMove={moveTask}
                />
            );
        }));
        setLoad(true);
    };

    if (!load) {
        loadData();
    }
    
    return (
        <div className="flex-column">
            {columnheader()}
            {columncontent()}
        </div>
    );
};

export default ProjectGroup;
