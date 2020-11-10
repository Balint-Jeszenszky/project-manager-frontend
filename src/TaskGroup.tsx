import React, { useState, useEffect, ReactNode } from 'react';
import { taskType } from './DataTypes';
import Task from './Task';
import NewTask from './NewTask';

interface TaskGroupProps {
    place: number;
    name: string;
    id: number;
};

const TaskGroup: React.FC<TaskGroupProps> = props => {
    const [taskNodes, setTaskNodes] = useState<ReactNode[]>([]);
    const [addingTask, setAddingTask] = useState<boolean>(false);
    const [numOfTasks, setNumOfTasks] = useState<number>(0);

    const cancelAdd = (): void => {
        setTaskNodes(taskNodes.filter((e) => { return typeof e !== typeof Task }));
        setAddingTask(false);
    };
    const confirmAdd = () => {
        setTaskNodes([
            <NewTask confirmAdd={confirmAdd} cancelAdd={cancelAdd} />,
            <Task
                task={{
                    name: 'title',
                    description: 'description',
                    deadline: 3,
                    state: 2,
                    priority: 1
                }}
                onMove={moveTask}
            />,
            ...taskNodes
        ]);
    }

    useEffect(() => {
        fetch(`http://localhost:8888/api/taskgroup/${props.id}`)
            .then(response => response.json())
            .then(response => {
                setNumOfTasks(response.length)
                setTaskNodes(response.sort((a: taskType, b: taskType) => {
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
            });
    }, []);

    const showTaskAdder = () => {
        if (!addingTask) {
            setTaskNodes([<NewTask confirmAdd={confirmAdd} cancelAdd={cancelAdd} />, ...taskNodes]);
            setAddingTask(true);
        }
    };

    const columnheader = (): ReactNode => {
        return (
            <div className="taskname">
                <span className="taskcount">{numOfTasks}</span>
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
                <button className="inisible task-buttons mr-2 px-1" onClick={() => { }}>
                    <i className="fas fa-angle-right"></i>
                </button>
                <button className="inisible task-buttons mr-2 px-1" onClick={() => { }}>
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

    // const deleteTask = () => {
    // }

    const moveTask = (n: number, dir: number) => {
        // updateTaskNodes(props.tasks.map((t: taskType) => {
        //     if (t.priority === n) {
        //         t.priority += dir;
        //     } else if ((t.priority > n && dir === 1) || (t.priority < n && dir === -1)) {
        //         t.priority -= dir;
        //     }
        //     return (
        //         <Task
        //             task={t}
        //             onMove={moveTask}
        //             key={t.title}
        //         />
        //     );
        // }));
        // setLoad(false);
        // loadData();
    };

    return (
        <div className="flex-column">
            {columnheader()}
            {columncontent()}
        </div>
    );
};

export default TaskGroup;
