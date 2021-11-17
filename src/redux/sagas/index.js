import peopleSaga from "./people";
import {all, spawn} from 'redux-saga/effects'


export default function* rootSaga() {
     const sagas = [peopleSaga]
    yield all(sagas.map((saga) => spawn(saga)))
}