import { IMaterial } from 'features/directories/materials/types';

interface IMaterials {
    quantity: number;
    material: IMaterial;
}

export interface IBrigade {
    id?: number;
    title: string;
    brigadier?: {
        id: number;
        fullName: string;
    };
    employees: {
        id: number;
        fullName: string;
    }[];
    materials: IMaterials[];
}

export interface IState {
    content: IBrigade[];
    filter: string;
    loading: boolean;
    error: string;
    itemLoading: boolean;
    itemError: string;
}
