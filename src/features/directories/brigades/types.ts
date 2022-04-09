export interface IBrigade {
    id?: number;
    title: string;
}

export interface IState {
    content: IBrigade[];
    filter: string;
    loading: boolean;
    error: string;
    itemLoading: boolean;
    itemError: string;
}
