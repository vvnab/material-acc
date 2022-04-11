export interface IWorkObjects {
    id?: number;
    title: string;
    region?: string;
    road?: string;
    contract?: string;
    remarks?: string;
}

export interface IState {
    content: IWorkObjects[];
    filter: string;
    loading: boolean;
    error: string;
    itemLoading: boolean;
    itemError: string;
}
