export interface IWorkType {
    id?: number;
    title: string;
}

export interface IState {
    content: IWorkType[];
    filter: string;
    loading: boolean;
    error: string;
    itemLoading: boolean;
    itemError: string;
}
