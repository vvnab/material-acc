export interface BrigadeSummary {
    brigade: {
        id: number;
        title: string;
    };
    works: {
        workType: {
            id: number;
            title: string;
        };
        factQuantitySqm: number;
    }[];
    materials: {
        material: {
            id: number;
            title: string;
        };
        factQuantity: number;
    }[];
}

export interface IState {
    content: BrigadeSummary[];
    loading: boolean;
    range: { from: string; to: string };
    error: string;
}
