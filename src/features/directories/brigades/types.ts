export interface IBrigade {
    id?: number;
    title: string;
    brigadierId?: number;
    brigadier?: {
        id: number;
        fullName: string;
    };
    employees?: [
        {
            id: number;
            fullName: string;
        }
    ];
}

export interface IState {
    content: IBrigade[];
    filter: string;
    loading: boolean;
    error: string;
    itemLoading: boolean;
    itemError: string;
}
