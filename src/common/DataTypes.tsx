export type projectType = {
    id: number,
    name: string,
    description: string
};

export type taskgroupType = {
    priority: number,
    name: string,
    id: number
};

export type taskType = {
    id: number,
    taskgroupID: number,
    name: string,
    description: string,
    deadline: string,
    priority: number
};
