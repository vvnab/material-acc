export interface IWorkTypes {
    id?: number;
    title: string;
}

export interface IState {
    content: IWorkTypes[];
    filter: string;
    loading: boolean;
    error: string;
    itemLoading: boolean;
    itemError: string;
}
