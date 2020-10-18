import React, { useState, ReactNode } from 'react';

const Project: React.FC = () => {
    const [tasks, updateTasks] = useState<ReactNode[]>([]);
    const [addingTask, setAddingTask] = useState<boolean>(false);

    const cancelAdd = (): void => {
        updateTasks(tasks.filter((e, i) => {return i !== 0}));
        setAddingTask(false);
    };
    const task = (): ReactNode => {
        return (
            <div className="task">
                <p className="title">
                    Title
                <div className="dropdown">
                    <button className="inisible task-buttons" type="button" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-h"></i>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu">
                        <button className="dropdown-item" type="button">Edit</button>
                        <button className="dropdown-item" type="button">Delete</button>
                    </div>
                </div>

                <button className="inisible task-buttons"><i className="fas fa-angle-up"></i></button>
                <button className="inisible task-buttons"><i className="fas fa-angle-down"></i></button>
                </p>
                <p className="description">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis dolores soluta dolore laborum reiciendis hic, ratione id adipisci alias eligendi!</p>
            </div>
        );
    };

    const confirmAdd = () => {
        updateTasks([...tasks, task()]);
    }

    const addTask = (): ReactNode => {
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
            updateTasks([addTask()]);
            setAddingTask(true);
        }
    };

    const columnheader = (): ReactNode => {
        return (
            <div className="taskname">
                <span className="taskcount">8</span>Name<button className="inisible task-buttons mr-2 px-1" onClick={showTaskAdder}><i className="fas fa-plus"></i></button>
            </div>
        );
    };


    tasks.push(task());

    const columncontent = (): ReactNode => {
        return (
            <div className="tasklist">
                {tasks}
            </div>
        );
    };

    const column = (): ReactNode => {
        return (
            <div className="flex-column">
                {columnheader()}
                {columncontent()}
            </div>
        );
    };

    const addColumn = () => {
        return (
            <div className="add-column">
                <button className="inisible">+ Add</button>
            </div>
        );
    };

    return (
        <div className="boxrow content">
            <div className="flex-container">
                {column()}
                {addColumn()}
            </div>
        </div>
    );
}

export default Project;
