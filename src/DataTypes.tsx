export type projectType = {
    id: number,
    name: string,
    description: string
};

export type taskgroupType = {
    place: number,
    name: string
};

export type taskType = {
    title: string,
    description: string,
    deadline: number,
    state: number,
    priority: number
};
