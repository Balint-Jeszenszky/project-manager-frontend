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
    name: string,
    description: string,
    deadline: string,
    priority: number
};
