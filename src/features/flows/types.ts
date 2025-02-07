import { IMaterial } from 'features/directories/materials/types';

interface IEmployee {
    id: number;
    fullName: string;
}

interface IWarehouse {
    id: number;
    title: string;
}

export interface IMaterialQuantity {
    quantity: number;
    material: IMaterial;
}

export type OpsType =
    | 'WAREHOUSE_INCOME'
    | 'WAREHOUSE_TO_WAREHOUSE'
    | 'WAREHOUSE_TO_BRIGADE'
    | 'BRIGADE_TO_BRIGADE'
    | 'BRIGADE_TO_WAREHOUSE'
    | 'CONSUMED';

type OpsStatus = 'CREATED' | 'ACCEPTED' | 'REJECTED';

export interface IFlow {
    id?: number;
    opsDt: string;
    createdAt?: string;
    updatedAt?: string;
    employeeCreated: IEmployee;
    employeeUpdated?: IEmployee;
    opsType: OpsType;
    opsStatus: OpsStatus;
    fromWarehouse: IWarehouse;
    toWarehouse: IWarehouse;
    fromBrigade: IWarehouse;
    toBrigade: IWarehouse;
    workReportId?: number;
    remarks?: string;
    materials: IMaterialQuantity[];
}

interface IFilter {
    opsTypes?: OpsType[];
    // opsStatus?: OpsStatus;
    dateRange?: {
        from?: string;
        to?: string;
    };
    warehouseId?: number;
    brigadeId?: number;
}

export interface IState {
    content: IFlow[];
    filter: IFilter;
    loading: boolean;
    error: string;
    itemLoading: boolean;
    itemError: string;
    pageNumber?: number;
    totalPages?: number;
}
