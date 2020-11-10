import React, { ReactNode, useState, useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";
import ProjectGroup from './ProjectGroup';
import NewTaskGroup from './NewTaskGroup';
import {taskgroupType, taskType} from './DataTypes';

interface ProjectProps {
    userID: number;
}

const Project: React.FC<ProjectProps> = (props) => {
    const [projectGroupNodes, setProjectGroupNodes] = useState<ReactNode[]>([]);
    const [projectGroups, setProjectGroups] = useState<taskgroupType[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    // i love typescript sooooooooo mutch...
    // const PROJECTID = useRouteMatch().params.id;
    const PROJECTID = parseInt(Object.assign({id: ''}, useRouteMatch().params).id);

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
                        key={`group${e.place}`}
                    />
                );
            });
            setProjectGroups(response.taskgroups);
            setProjectGroupNodes(groups);
            setLoaded(true);
        });
    }, []);//todo trigger for task move to new group

    const addGroup = (group: ReactNode) => {
        setProjectGroupNodes([...projectGroupNodes, group]);
    }

    return (
        <div className="boxrow content">
            <div className="flex-container">
                {!loaded && 'Loading...'}
                {loaded && projectGroupNodes}
                <NewTaskGroup addGroup={addGroup} projectID={PROJECTID} />
            </div>
        </div>
    );
}

export default Project;
