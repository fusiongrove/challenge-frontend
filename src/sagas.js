import { fork } from 'redux-saga/effects';
import usersSaga from './containers/users/sagas';

export default function* rootSaga() {
    return yield [
        fork(usersSaga)
    ];
}
