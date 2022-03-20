import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {reset} from 'redux-form';
import {toast } from 'react-toastify';
import { ADD_APPOINTMENT, EDIT_APPOINTMENT, UPDATE_APPOINTMENT,
    DELETE_APPOINTMENT, FETCH_APPOINTMENTS } from '../actions/types';

import { fetchAppointments , fetchAppointmentsSuccess, addAppointmentSuccess, editAppointmentSuccess, updateAppointmentSuccess,
 deleteAppointmentSuccess, setActiveTab} from '../actions';
 import moment from 'moment';

import { callAPI } from "service";


export function* fetchAppointmentsList() {
    yield takeLatest(FETCH_APPOINTMENTS, fetchAppointmentProcess)
} 

function* addAppointment() {
    yield takeLatest(ADD_APPOINTMENT, addAppointmentProcess)
} 
    
function* editAppointment() {
    yield takeLatest( EDIT_APPOINTMENT, editAppointmentProcess)
}

function* updateAppointment() {
    yield takeLatest( UPDATE_APPOINTMENT, updateAppointmentProcess)
}

function* deleteAppointment() {
    yield takeLatest( DELETE_APPOINTMENT, deleteAppointmentProcess)
}

function* fetchAppointmentProcess() {
    try {
        const response = yield call(fetchAppointmentsProcessRequest);
        if (response.status === 200 && response.data) {
            // const slot = new Date(`${date} ${time}`).toString();
            
            const appointments = response.data.map(item => {
                const date = moment(new Date(item.date)).format('YYYY-MM-DD');
                return {...item, slot: new Date(`${date} ${item.slot}`).toString()}
            });
            yield put(fetchAppointmentsSuccess(appointments));
        } else {
            throw new Error('Appointment create failed');
        }
    } catch (error) {
        toast.error(error.message || 'Appointment fetch failed');
    }
 
}

const fetchAppointmentsProcessRequest = async() => { 
    try {
        const response =  await callAPI('/appointments', 'GET');
        return response;
    } catch(error) {
        throw (error);
    }
}


function* addAppointmentProcess({ payload: { dispatch, ...appointmentInfo} }) {
    try {
        const response = yield call(addAppointmentProcessRequest, appointmentInfo);
        if (response && response.status === 201) {
            yield put(addAppointmentSuccess());
            toast.success('Appointment created successfully');
            dispatch(reset('AppointmentForm')); 
        } else {
            throw new Error('Appointment create failed');
        }
    } catch (error) {
        toast.error(error.message || 'Appointment create failed');
    }

}
const addAppointmentProcessRequest = async(appointmentInfo) => { 
    try {
        const response =  await callAPI('/appointments/createBooking', 'POST', {}, {
            ...appointmentInfo
        });
     return response;
    } catch(error) {
        throw (error);
    }
}

function* editAppointmentProcess({ payload: { bookingId } }) {
    try {
        const response = yield call(editAppointmentProcessRequest, bookingId);
        if(response && response.status === 200) {
            const appointmentInfo = {...response.data, selectedDate: new Date(response.data.selectedDate)};
            yield put(editAppointmentSuccess(appointmentInfo));
        } else {
            throw new Error('Appointment fetch failed');
        }
        
    } catch(error) {
        toast.error(error.message || 'Appointment fetch failed');
    } finally {
        yield put(setActiveTab(0));
    }
  
}

const editAppointmentProcessRequest = async(apptId) => { 
    try {
        const response =  await callAPI(`/appointments/${apptId}`, 'GET');
        return response;
    } catch(error) {
        throw (error);
    }
}



function* updateAppointmentProcess({ payload: {history, ...appointmentInfo}}) {
    try {
        const response = yield call(updateAppointmentProcessRequest, appointmentInfo);
        if (response && response.status === 201) {
            yield put(updateAppointmentSuccess());
            toast.success('Appointment updated successfully');
            history.push('/bookings');
        } else {
            throw new Error('Appointment update failed');
        }
    } catch (error) {
        toast.error(error.message || 'Appointment update failed');
    } finally {
        yield put(setActiveTab(1));
    }
}

const updateAppointmentProcessRequest = async({ apptId, ...appointmentInfo}) => { 
    try {
        const response =  await callAPI(`/appointments/${apptId}`, 'PUT', {}, {
            ...appointmentInfo
        });
     return response;
    } catch(error) {
        throw (error);
    }
}

function* deleteAppointmentProcess({ payload: apptId}) {
    try {
        const response = yield call(deleteAppointmentProcessRequest, apptId);
        if (response && response.status === 200) {
            yield put(deleteAppointmentSuccess());
            toast.success('Appointment deleted successfully');
            yield put(fetchAppointments());
        } else {
            throw new Error('Appointment delete failed');
        }
    } catch (error) {
        toast.error(error.message || 'Appointment delete failed');
    }
}

const deleteAppointmentProcessRequest = async(apptId) => { 
    try {
        const response =  await callAPI(`/appointments/${apptId}`, 'DELETE');
        return response;
    } catch(error) {
        throw (error);
    }
}



export default function* rootSaga() {
    yield all([
      fork(fetchAppointmentsList),
      fork(addAppointment),
      fork(editAppointment),
      fork(updateAppointment),
      fork(deleteAppointment),
    ])
}