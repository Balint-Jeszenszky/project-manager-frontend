import React, { ReactNode, useState } from 'react';
import ProjectGroup from './ProjectGroup';
import {taskgroupType, taskType} from './DataTypes';

const Project: React.FC = () => {
    const [projectGroups, setProjectGroups] = useState<ReactNode[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    if (!loaded) {
        fetch('https://my-json-server.typicode.com/Balint-Jeszenszky/temalab-mock-backend/project1')
        .then(response => response.json())
        .then(response => {
            let groups: ReactNode[] = [];
            response.taskgroups.forEach((e: taskgroupType) => {
                groups.push(<ProjectGroup name={e.name} id={e.id} tasks={response.tasks.filter((t: taskType) => t.state === e.id)} />);
            });
            setProjectGroups(groups);
            setLoaded(true);
        });
    }

    const addGroup = () => {
    setProjectGroups([...projectGroups, <ProjectGroup name="Dummy" id={Math.random()} tasks={[]} />]);
    }

    const addColumn = () => {
        return (
            <div className="add-column">
                <button className="inisible" onClick={addGroup}>+ Add</button>
            </div>
        );
    };

    return (
        <div className="boxrow content">
            <div className="flex-container">
                {projectGroups}
                {addColumn()}
            </div>
        </div>
    );
}

export default Project;
