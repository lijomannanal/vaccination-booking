import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import { FETCH_APPOINTMENTS, FETCH_APPOINTMENTS_SUCCESS,  ADD_APPOINTMENT, SAVE_APPOINTMENT, EDIT_APPOINTMENT, UPDATE_APPOINTMENT,
    UPDATE_APPOINTMENT_SUCCESS, DELETE_APPOINTMENT, DELETE_APPOINTMENT_SUCCESS, LOAD_APPOINTMENT, SET_ACTIVE_TAB,
    RESET_LOADED_APPOINTMENT } from '../actions/types';

const INITIAL_STATE = {
    appointments: [],
    loading: false,
    loadedAppointment: {},
};

const appointmentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_APPOINTMENTS:
        return { ...state, loading: true };

      case FETCH_APPOINTMENTS_SUCCESS:
        return { ...state, appointments: action.payload, loading: false };

    case ADD_APPOINTMENT:
        return { ...state, loading: true };

    case SAVE_APPOINTMENT:
            return { ...state, loading: false };

    case EDIT_APPOINTMENT:
        return { ...state, loading: true };

    case LOAD_APPOINTMENT:
            return { ...state, loadedAppointment: action.payload };

    case RESET_LOADED_APPOINTMENT:
            return { ...state, loadedAppointment: {} };

    case UPDATE_APPOINTMENT:
        return { ...state, loading: true };

    case UPDATE_APPOINTMENT_SUCCESS: {
        return { ...state, loading: false };
    }

    case DELETE_APPOINTMENT:
        return { ...state, loading: true };

    case DELETE_APPOINTMENT_SUCCESS:
        return { ...state , loading: false };

      default:
        return state;

    }
  };
  const INITIAL_TAB_STATE = {
    activeTab: document.location.pathname === '/bookings'? 1: 0
  }
  const tabReducer = (state = INITIAL_TAB_STATE, action) => {
    if (action.type === SET_ACTIVE_TAB) {
      return { ...state , activeTab: action.payload };
    } else {
      return state;
    }
  }

  const rootReducer = combineReducers({
    appointment: appointmentReducer,
    tab: tabReducer,
    form: formReducer
  });
  
  
  export default rootReducer;