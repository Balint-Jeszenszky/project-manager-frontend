export type projectType = {
    id: number,
    name: string,
    description: string
};

export type taskgroupType = {
    place: number,
    name: string,
    id: number
};

export type taskType = {
    name: string,
    description: string,
    deadline: number,
    state: number,
    priority: number
};
