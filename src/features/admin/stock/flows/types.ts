import { IMaterial } from 'features/directories/materials/types';

interface IEmployee {
    id: number;
    fullName: string;
}

interface IWarehouse {
    id: number;
    title: string;
}

type OpsType =
    | 'WAREHOUSE_INCOME'
    | 'WAREHOUSE_TO_WAREHOUSE'
    | 'WAREHOUSE_TO_BRIGADE'
    | 'BRIGADE_TO_BRIGADE'
    | 'BRIGADE_TO_WAREHOUSE'
    | 'CONSUMED';

type OpsStatus = 'CREATED' | 'ACCEPTED' | 'REJECTED';

export interface IFlow {
    id?: number;
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
    materials: {
        quantity: number;
        material: IMaterial;
    }[];
}

interface IFilter {
    opsType?: OpsType;
    opsStatus?: OpsStatus;
    createdBetween?: {
        begin?: string;
        end?: string;
    };
}

export interface IState {
    content: IFlow[];
    filter?: IFilter;
    loading: boolean;
    error: string;
    itemLoading: boolean;
    itemError: string;
}
