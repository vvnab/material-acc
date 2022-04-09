export interface IBrigade {
    id?: number;
    title: string;
    brigadierId?: number;
    brigadier?: {
        fullName: string;
        id: number;
    };
}

export interface IState {
    content: IBrigade[];
    filter: string;
    loading: boolean;
    error: string;
    itemLoading: boolean;
    itemError: string;
}
