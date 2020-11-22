import React, { ReactNode, useState, useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";
import TaskGroup from './TaskGroup';
import NewTaskGroup from './NewTaskGroup';
import {taskgroupType, taskType} from '../common/DataTypes';

interface ProjectProps {
    userID: number;
}

const Project: React.FC<ProjectProps> = (props) => {
    const [taskGroupNodes, setTaskGroupNodes] = useState<ReactNode[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    // i love typescript sooooooooo mutch...
    // const PROJECTID = useRouteMatch().params.id;
    const PROJECTID = parseInt(Object.assign({id: ''}, useRouteMatch().params).id);

    const update = () => {
        fetch(`http://localhost:8888/api/taskgroup/groups/${PROJECTID}`)
        .then(response => response.json())
        .then(response => {
            const newNodes = response.sort((a: taskType, b: taskType) => {
                if (a.priority > b.priority) return 1;
                return -1;
            }).map((e: taskgroupType) => {
                return (
                    <TaskGroup
                        name={e.name}
                        priority={e.priority}
                        id={e.id}
                        projectID={PROJECTID}
                        key={`group${e.id}`}
                        update={update}
                    />
                );
            });
            setTaskGroupNodes([]);
            setTaskGroupNodes(newNodes);
            setLoaded(true);
        });
    }

    useEffect(update, []);

    const addGroup = (group: ReactNode) => {
        setTaskGroupNodes([...taskGroupNodes, group]);
    }

    return (
        <div className="boxrow content">
            <div className="flex-container">
                {!loaded && 'Loading...'}
                {loaded && taskGroupNodes}
                <NewTaskGroup addGroup={addGroup} projectID={PROJECTID} update={update} numberOfGroups={taskGroupNodes.length} />
            </div>
        </div>
    );
}

export default Project;
