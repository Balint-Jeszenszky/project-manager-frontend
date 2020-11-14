import React, { useState, useEffect, ReactNode } from 'react';
import { taskType } from './DataTypes';
import Task from './Task';
import NewTask from './NewTask';

interface TaskGroupProps {
    priority: number;
    name: string;
    id: number;
    projectID: number;
    update(): void;
};

const TaskGroup: React.FC<TaskGroupProps> = props => {
    const [taskNodes, setTaskNodes] = useState<ReactNode[]>([]);
    const [addingTask, setAddingTask] = useState<boolean>(false);
    const [editiongGroup, setEditiongGroup] = useState<boolean>(false);
    const [groupName, setGroupName] = useState<string>(props.name);
    const [oldGroupName, setOldGroupName] = useState<string>(props.name);
    const [numOfTasks, setNumOfTasks] = useState<number>(0);

    const cancelAdd = (): void => {
        setTaskNodes(taskNodes.filter((e) => { return typeof e !== typeof Task }));
        setAddingTask(false);
    };
    const confirmAdd = (title: string, desc: string, deadline: string, priority: number) => {
        setTaskNodes([
            <NewTask groupID={props.id} confirmAdd={confirmAdd} cancelAdd={cancelAdd} />,
            <Task
                task={{
                    name: title,
                    description: desc,
                    deadline: deadline,
                    priority: priority
                }}
                onMove={moveTask}
            />,
            ...taskNodes
        ]);
    };

    useEffect(() => {
        fetch(`http://localhost:8888/api/tasks/group/${props.id}`)
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
            setTaskNodes([<NewTask groupID={props.id} confirmAdd={confirmAdd} cancelAdd={cancelAdd} />, ...taskNodes]);
            setAddingTask(true);
        }
    };

    const saveGroup = () => {
        fetch(`http://localhost:8888/api/taskgroup/${props.id}`, {
            method: 'PUT',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify({
                id: props.id,
                projectID: props.projectID,
                name: groupName,
                priority: props.priority
            }),
        }).then(() => {
            setEditiongGroup(false);
            setOldGroupName(groupName);
        });
    };
    const cancelEdit = () => {
        setEditiongGroup(false);
        setGroupName(oldGroupName);
    };

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(e.target.value);
    };

    const editGroup = () => {
        setEditiongGroup(true);
    };
    const deleteGroup = () => {
        fetch(`http://localhost:8888/api/taskgroup/${props.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        }).then(props.update);
    }

    const moveGroup = (dir: number) => {
        fetch(`http://localhost:8888/api/taskgroup/${props.id}`, {
            method: 'PUT',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify({
                id: props.id,
                projectID: props.projectID,
                name: groupName,
                priority: props.priority + dir
            }),
        }).then(props.update);
    }

    const columnheader = (): ReactNode => {
        return (
            <div className="taskname">
                <span className="taskcount">{numOfTasks}</span>
                {!editiongGroup && groupName}
                { editiongGroup &&
                        <input
                            className="form-control taskdetail"
                            type="text"
                            placeholder="Group name"
                            onChange={onNameChange}
                            value={groupName}
                        />
                }
                { editiongGroup && <button className="btn btn-success" onClick={saveGroup}>
                            <i className="fas fa-check"></i>
                        </button>
                }
                { editiongGroup && <button className="btn btn-danger" onClick={cancelEdit}>
                            <i className="fas fa-times"></i>
                        </button>
                }
                <div className="dropdown">
                    <button className="inisible task-buttons" type="button" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-h"></i>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu">
                        <button className="dropdown-item" type="button" onClick={editGroup}>Edit</button>
                        <button className="dropdown-item" type="button" onClick={deleteGroup}>Delete</button>
                    </div>
                </div>
                <button className="inisible task-buttons mr-2 px-1" onClick={showTaskAdder}>
                    <i className="fas fa-plus"></i>
                </button>
                <button className="inisible task-buttons mr-2 px-1" onClick={() => { moveGroup(1) }}>
                    <i className="fas fa-angle-right"></i>
                </button>
                <button className="inisible task-buttons mr-2 px-1" onClick={() => { moveGroup(-1) }}>
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

    const moveTask = (id: number, dir: number) => {
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
