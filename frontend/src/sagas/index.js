import { all } from 'redux-saga/effects';
import appointmentSaga from './AppointmentSaga';


export default function* rootSaga() {
  yield all([
    appointmentSaga(),
  ]);
}