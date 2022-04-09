export interface IWarehouse {
    id?: number;
    title: string;
}

export interface IState {
    content: IWarehouse[];
    filter: string;
    loading: boolean;
    error: string;
    itemLoading: boolean;
    itemError: string;
}
