export interface IMessage {
    id?: string
    type: 'error' | 'info' | 'warn';
    text: string;
    timelifeSec: number;
}

export interface IState {
    messages: IMessage[];
}
