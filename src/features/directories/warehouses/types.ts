export interface IWarehouse {
    id?: number;
    title: string;
    materials?: {
        material: {
            id: number;
            title: string;
        };
        quantity: number;
    }[];
}

export interface IState {
    content: IWarehouse[];
    filter: string;
    loading: boolean;
    error: string;
    itemLoading: boolean;
    itemError: string;
}
