import React, { useState } from "react";
import AppointmentForm from "./AppointmentForm";
import { useDispatch} from 'react-redux';
import moment from "moment";
import { addAppointment } from 'actions';


export const VaccineRegistration = () => {

  const [ initialValues ] = useState({ selectedDate: moment().endOf('day'), selectedCenter: 0, selectedSlot: 'Select'})
  const dispatch = useDispatch();

  const saveAppointment = (values) => {
    const selectedDate = values.selectedDate;
    const data = {...values, selectedDate: moment(new Date(selectedDate)).format('YYYY-MM-DD')};
     dispatch(addAppointment({...data, dispatch}))
  }

  return (
    <AppointmentForm initialValues={initialValues} onSubmit={saveAppointment}/>
  );

}
