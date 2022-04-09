export interface IMessage {
    type: 'error' | 'info' | 'warn';
    text: string;
}

export interface IState {
    messages: IMessage[];
    show: boolean;
}
