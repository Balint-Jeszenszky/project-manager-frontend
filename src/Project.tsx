import React, { ReactNode, useState, useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";
import ProjectGroup from './ProjectGroup';
import {taskgroupType, taskType} from './DataTypes';

interface ProjectProps {
    userID: number;
}

const Project: React.FC<ProjectProps> = (props) => {
    const [projectGroupNodes, setProjectGroupNodes] = useState<ReactNode[]>([]);
    const [projectGroups, setProjectGroups] = useState<taskgroupType[]>([]);
    const [tasklist, setTasklist] = useState<taskType[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    // i love typescript sooooooooo mutch...
    // const PROJECTID = useRouteMatch().params.id;
    const PROJECTID = Object.assign({id: 0}, useRouteMatch().params).id;

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
                    onMove={moveGroup}
                />
            );
        }));
        setLoaded(false);
    };

    useEffect(() => {
        fetch(`http://localhost:8888/api/project/${PROJECTID}`)
        .then(response => response.json())
        .then(response => {
            let groups: ReactNode[] = [];
            response.forEach((e: taskgroupType) => {
                groups.push(
                    <ProjectGroup
                        name={e.name}
                        place={e.place}
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
    }, []);

    const addGroup = () => {
        setProjectGroupNodes([...projectGroupNodes, <ProjectGroup name="Dummy" place={Math.random()} onMove={moveGroup} />]);
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
