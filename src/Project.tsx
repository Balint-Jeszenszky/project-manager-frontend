import React, { ReactNode, useState } from 'react';
import ProjectGroup from './ProjectGroup';
import {taskgroupType, taskType} from './DataTypes';

const Project: React.FC = () => {
    const [projectGroupNodes, setProjectGroupNodes] = useState<ReactNode[]>([]);
    const [projectGroups, setProjectGroups] = useState<taskgroupType[]>([]);
    const [tasklist, setTasklist] = useState<taskType[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    const moveGroup = (n: number, dir: number) => {
        setProjectGroupNodes(projectGroups.map((e: taskgroupType) => {
            if (e.place === n) {
                e.place += dir;
            } else if ((e.place > n && dir === 1) || (e.place < n && dir === -1)) {
                e.place -= dir;
            }
            return (
                <ProjectGroup
                    name={e.name}
                    place={e.place}
                    tasks={tasklist.filter((t: taskType) => t.state === e.place)}
                    onMove={moveGroup}
                />
            );
        }));
        setLoaded(false);
        loadData();
    };

    const loadData = () => {
        fetch('https://my-json-server.typicode.com/Balint-Jeszenszky/temalab-mock-backend/project1')
        .then(response => response.json())
        .then(response => {
            let groups: ReactNode[] = [];
            response.taskgroups.forEach((e: taskgroupType) => {
                groups.push(
                    <ProjectGroup
                        name={e.name}
                        place={e.place}
                        tasks={response.tasks.filter((t: taskType) => t.state === e.place)}
                        onMove={moveGroup}
                        key={`group${e.place}`}
                    />
                );
            });
            setProjectGroups(response.taskgroups);
            setTasklist(response.tasks);
            setProjectGroupNodes(groups);
            setLoaded(true);
        });
    }

    if (!loaded) {
        loadData();
    }

    const addGroup = () => {
        setProjectGroupNodes([...projectGroupNodes, <ProjectGroup name="Dummy" place={Math.random()} tasks={[]} onMove={moveGroup} />]);
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
                {!loaded && 'Loading...'}
                {loaded && projectGroupNodes}
                {addColumn()}
            </div>
        </div>
    );
}

export default Project;
