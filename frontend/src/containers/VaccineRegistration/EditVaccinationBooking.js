import React, { useEffect } from "react";
import  { useParams, useHistory } from "react-router-dom";
import AppointmentForm from "./AppointmentForm";
import { useDispatch, useSelector } from 'react-redux';
import { editAppointment, updateAppointment, resetLoadedAppointment } from 'actions';
import moment from "moment";



export const EditVaccineRegistration = () => {
  const dispatch = useDispatch();
  const { loadedAppointment} = useSelector(state => state.appointment);
  const { bookingId } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(editAppointment({ bookingId }))
  }, [bookingId, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetLoadedAppointment());
    };
  }, [dispatch]);

  const updateAppointmentInfo = (values) => {
    const selectedDate = values.selectedDate;
    const data = {...values, selectedDate: moment(new Date(selectedDate)).format('YYYY-MM-DD')};
    dispatch(updateAppointment({...data, history}))
  }
  console.log(loadedAppointment);
  return (
    <AppointmentForm initialValues={loadedAppointment} onSubmit={updateAppointmentInfo}/>
  );
}

