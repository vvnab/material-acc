import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { IMessage, IState } from './types';

export const initialState: IState = {
    messages: [],
};

export default handleActions(
    {
        [actions.addMessage.toString()]: (state, action: any) => {
            const message: IMessage = { ...action.payload };
            const newMessages = state.messages.filter(
                (i) => i.text !== message.text
            );

            newMessages.push(message);
            return {
                messages: newMessages,
            };
        },
        [actions.updateMessages.toString()]: (state, action: any) => {
            return {
                messages: action.payload || state.messages,
            };
        },
        [actions.hideMessage.toString()]: (state, action: any) => {
            return {
                messages: state.messages.filter(
                    (i) => i.id !== action.payload
                ),
            };
        },
    },
    initialState
);
