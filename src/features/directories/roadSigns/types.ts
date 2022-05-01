export interface IRoadSign {
  id?: number;
  title: string;
  pmToSqm: number
}

export interface IState {
  content: IRoadSign[];
  filter: string;
  loading: boolean;
  error: string;
  itemLoading: boolean;
  itemError: string;
}
