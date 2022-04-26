import { IBrigade } from 'features/directories/brigades/types';

export interface IState {
    content?: IBrigade;
    loading: boolean;
    error: string;
    itemLoading: boolean;
    itemError: string;
}
