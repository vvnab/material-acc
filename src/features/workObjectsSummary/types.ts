export interface IWorkObjectSummary {
    workObject: {
        id: number;
        title: string;
        regian: string;
        road: string;
        contract: string;
        remarks: string;
        enabled: boolean;
    };
    works: {
        workType: {
            id: number;
            title: string;
        };
        plannedQuantitySqm: number;
        factQuantitySqm: number;
    }[];
    materials: {
        material: {
            id: number;
            title: string;
        };
        plannedQuantity: number;
        factQuantity: number;
    }[];
}

export interface IState {
    content: IWorkObjectSummary[];
    loading: boolean;
    error: string;
}
