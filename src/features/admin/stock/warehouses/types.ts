import { IMaterial } from 'features/directories/materials/types';

export interface IMaterials {
    quantity: number;
    material: IMaterial;
}

export interface IWarehouse {
    id?: number;
    title: string;
    materials: IMaterials[];
}


export interface IState {
    content: IWarehouse[];
    loading: boolean;
    error: string;
    itemLoading: boolean;
    itemError: string;
}
