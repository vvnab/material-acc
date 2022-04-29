import { call, select, put } from 'redux-saga/effects';
import { selectBearer } from 'features/authentication/selectors';
import { showMessage } from 'features/message/actions';
import { logOut } from 'features/authentication/actions';

function* customFetch(url: string, method: string, body?: any): any {
    const bearer = yield select(selectBearer);
    let result;
    result = yield call(fetch, url, {
        method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${bearer}`,
        },
    });

    if (!result.ok) {
        try {
            const { message, error, details } = yield call([
                result,
                result.json,
            ]);
            const msg = details || message || error || 'Неизвестная ошибка';
            console.error(msg);
            throw new Error(msg);
        } catch (ex) {
            console.error(result, ex);
            if (result.status === 401) {
                yield put(logOut());
            } else {
                yield put(
                    showMessage({ type: 'error', text: result.statusText })
                );
            }
        }
    }
    const data = yield call([result, result.json]);
    return data;
}

export default customFetch;
