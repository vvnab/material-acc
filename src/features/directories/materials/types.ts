export interface IMaterial {
    id?: number;
    title: string;
}

export interface IState {
    content: IMaterial[];
    filter: string;
    loading: boolean;
    error: string;
    itemLoading: boolean;
    itemError: string;
}
