import { call } from "redux-saga/effects";
import { select } from "redux-saga/effects";
import { selectBearer } from "features/authentication/selectors";

function* customFetch(url: string, method: string, body?: any): any {
    const bearer = yield select(selectBearer);
    let result;
    result = yield call(
        fetch,
        url,
        {
            method,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${bearer}`,
            },
        }
    );

    if (!result.ok) {
        const { message, error, details } = yield call([
            result,
            result.json,
        ]);
        console.log(message, error, details);
        throw new Error(details || message || error);
    }
    const data = yield call([result, result.json]);
    return data;
}

export default customFetch;
