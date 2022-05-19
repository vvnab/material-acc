interface IEmployee {
    id: number;
    fullName: string;
}

interface IBrigade {
    id: number;
    title: string;
}

export interface IComment {
    id?: number;
    createdAt?: string;
    employeeCreated?: IEmployee;
    comment?: string;
}

export type IStatus = 'CREATED' | 'STARTED' | 'DONE';

export interface ITask {
    id?: number;
    title: string;
    createdAt?: string;
    updatedAt?: string;
    startedAt?: string;
    doneAt?: string;
    employeeCreated?: IEmployee;
    brigade?: IBrigade;
    brigadeId?: number;
    status?: IStatus;
    description: string;
    comments?: IComment[]
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
