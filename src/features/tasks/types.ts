interface IEmployee {
    id: number;
    fullName: string;
}

interface IBrigade {
    id: number;
    title: string;
}


export interface IComment {
    
}

export type IStatus = 'CREATED' | 'STARTED' | 'DONE';

export interface ITask {
    id?: number;
    title?: string
    createdAt?: string;
    updatedAt?: string;
    startedAt?: string;
    doneAt?: string;
    employeeCreated: IEmployee;
    brigade: IBrigade;
    status: IStatus;
    description?: string;
}

interface IFilter {
    statuses?: IStatus[];
    dateRange?: {
        from?: string;
        to?: string;
    };
    brigadeId?: number;
}

export interface IState {
    content: ITask[];
    filter: IFilter;
    loading: boolean;
    error: string;
    itemLoading: boolean;
    itemError: string;
    pageNumber?: number;
    totalPages?: number;
}
