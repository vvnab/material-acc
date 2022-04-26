import { IBrigade } from "features/directories/brigades/types";
import { IMaterial } from "features/directories/materials/types";
import { IRoadSign } from "features/directories/roadSigns/types";
import { IWorkObject } from "features/directories/workObjects/types";
import { IWorkType } from "features/directories/workTypes/types";

interface IEmployee {
  id: number;
  fullName: string;
}

type OpsStatus = "CREATED" | "PUBLISHED" | "ACCEPTED" | "REJECTED";

export interface IReport {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  employeeCreated: IEmployee;
  employeeUpdated?: IEmployee;
  remarks?: string;
  workObject?: IWorkObject;
  brigade?: IBrigade;
  workStart?: string;
  workEnd?: string;
  status: OpsStatus;
  materials: {
    quantity: number;
    material: IMaterial;
  }[];
  works: {
    workType: IWorkType;
    roadSign: IRoadSign;
    volume: number;
  }[];
  tairStart: number;
  troadStart: number;
  tairEnd: number;
  troadEnd: number;
  humStart: number;
  humEnd: number;
}

interface IFilter {
  opsStatus?: OpsStatus;
  dateRange?: {
    from?: string;
    to?: string;
  };
  brigadeId?: number;
}

export interface IState {
  content: IReport[];
  filter: IFilter;
  loading: boolean;
  error: string;
  itemLoading: boolean;
  itemError: string;
  pageNumber?: number;
  totalPages?: number;
}
