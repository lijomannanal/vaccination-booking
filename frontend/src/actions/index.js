import { ADD_APPOINTMENT, SAVE_APPOINTMENT, EDIT_APPOINTMENT, LOAD_APPOINTMENT, UPDATE_APPOINTMENT,
FETCH_APPOINTMENTS, FETCH_APPOINTMENTS_SUCCESS, UPDATE_APPOINTMENT_SUCCESS, DELETE_APPOINTMENT, DELETE_APPOINTMENT_SUCCESS,
SET_ACTIVE_TAB, RESET_LOADED_APPOINTMENT } from '../actions/types';

export const fetchAppointments = () => {
    return {
    type: FETCH_APPOINTMENTS
}
};

export const fetchAppointmentsSuccess = (payload) => ({
    type: FETCH_APPOINTMENTS_SUCCESS,
    payload
});

export const addAppointment = (payload) => ({
    type: ADD_APPOINTMENT,
    payload
});

export const addAppointmentSuccess = () => ({
    type: SAVE_APPOINTMENT,
});

export const editAppointment = (payload) => ({
    type: EDIT_APPOINTMENT,
    payload
});

export const editAppointmentSuccess = (payload) => ({
    type: LOAD_APPOINTMENT,
    payload
});

export const resetLoadedAppointment = () => ({
    type: RESET_LOADED_APPOINTMENT
});

export const updateAppointment = (payload) => ({
    type: UPDATE_APPOINTMENT,
    payload
});

export const updateAppointmentSuccess = () => ({
    type: UPDATE_APPOINTMENT_SUCCESS
});

export const deleteAppointment = (payload) => ({
    type: DELETE_APPOINTMENT,
    payload
});

export const deleteAppointmentSuccess = (payload) => ({
    type: DELETE_APPOINTMENT_SUCCESS,
});

export const setActiveTab = (payload) => ({
    type: SET_ACTIVE_TAB,
    payload
});