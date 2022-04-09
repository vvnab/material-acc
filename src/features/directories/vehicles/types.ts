export interface IVehicle {
    id?: number;
    title: string;
}

export interface IState {
    content: IVehicle[];
    filter: string;
    loading: boolean;
    error: string;
    itemLoading: boolean;
    itemError: string;
}
