import React, {ReactNode} from 'react';

const Project: React.FC = () => {

    const columnheader = (): ReactNode => {
        return (
            <div className="taskname">
                <span className="taskcount">8</span>Name<span className="plus-button">+</span>
            </div>
        );
    };

    const task = (): ReactNode => {
        return (
            <div className="task">
                <p className="title">Title</p>
                <p className="description">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis dolores soluta dolore laborum reiciendis hic, ratione id adipisci alias eligendi!</p>
            </div>
        );
    };

    const columncontent = (): ReactNode => {
        return (
            <div className="tasklist">
                {task()}
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

    return (
        <div className="boxrow content">
            <div className="flex-container">
                {column()}
            </div>
        </div>
    );
}

export default Project;
