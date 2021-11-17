import {takeEvery, call, apply, put, take, select, fork} from 'redux-saga/effects'
import {LOAD_USERS, LOAD_USERS_SUCCESS} from "../../reducers/people/actions";
import {LOCATION_CHANGE} from "connected-react-router";

export function* loadPeopleDetails(){

}

export function* loadPeopleList({payload}) {
    const {page, search} = payload
      const request = yield call(fetch, `https://swapi.dev/api/people?page=${page}&search=${search}`)
    const data = yield apply(request, request.json)

    yield put({
        type: LOAD_USERS_SUCCESS,
        payload: data
    })

}

export function* loadUsersOnRouteEnter() {
    while (true){
        const action = yield take(LOCATION_CHANGE)

        if (action.payload.location.pathname === '/'){
            const state = yield select(s => s.people)
            const {page, search} = state

            yield put({
                type: LOAD_USERS,
                payload: {page, search}
            })
        }


    }
}

export default function* peopleSaga() {
    yield fork(loadUsersOnRouteEnter)
    yield takeEvery(LOAD_USERS, loadPeopleList)
}