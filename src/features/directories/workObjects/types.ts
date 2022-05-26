export interface IPlannedMaterial {
    material: {
        id: number;
        title: string;
    };
    quantity: number;
}

export interface IPlannedWork {
    workType: {
        id: number;
        title: string;
    };
    quantitySqm: number;
}

export interface IWorkObject {
    id?: number;
    title: string;
    region?: string;
    road?: string;
    contract?: string;
    remarks?: string;
    plannedMaterials?: IPlannedMaterial[];
    plannedWorks?: IPlannedWork[];
}

export interface IState {
    content: IWorkObject[];
    filter: string;
    loading: boolean;
    error: string;
    itemLoading: boolean;
    itemError: string;
}
