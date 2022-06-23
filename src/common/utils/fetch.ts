import { call, select, put } from 'redux-saga/effects';
import { selectBearer } from 'features/authentication/selectors';
import { showMessage } from 'features/message/actions';
import { logOut } from 'features/authentication/actions';

export function* formFetch(url: string, method: string, files?: any): any {
    console.log('BOOKING_URL', process.env.BOOKING_URL);
    
    const bearer = yield select(selectBearer);
    const formData = new FormData();
    for (const file of files) {
        formData.append('photo', file);
    }
    let result;
    result = yield call(fetch, url, {
        method,
        body: formData,
        headers: {
            Authorization: `Bearer ${bearer}`,
        },
    });

    if (!result.ok) {
        let response;
        try {
            response = yield call([result, result.json]);
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
        const { message, error, details } = response;
        const msg = details || message || error || 'Неизвестная ошибка';
        console.error(msg);
        throw new Error(msg);
    }
    const data = yield call([result, result.json]);
    return data;
}

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
        let response;
        try {
            response = yield call([result, result.json]);
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
        const { message, error, details } = response;
        const msg = details || message || error || 'Неизвестная ошибка';
        console.error(msg);
        throw new Error(msg);
    }
    const data = yield call([result, result.json]);
    return data;
}

export default customFetch;
