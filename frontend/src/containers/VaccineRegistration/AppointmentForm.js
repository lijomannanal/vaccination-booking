import React, { useState, useEffect, useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Field, reduxForm, formValueSelector, reset, change } from 'redux-form';
import { CustomTextField, CustomSelectField, CustomDatePicker } from "../common/CustomInputs";
import { Button, Container, CssBaseline, Box, Typography, MenuItem, InputLabel } from "@mui/material";
import { callAPI } from 'service';
import moment from "moment";
import {toast } from 'react-toastify';


const defaultSlot = [{ time: 'Select', slotId: 0}];
const NRIC_REGX = new RegExp('^[STFG]\\d{7}[A-Z]$', 'i');
const validate = (values) => {
    const errors = {};
    const requiredFields = [
      'nric',
      'fullname',
      'selectedCenter',
      'date',
      'selectedSlot',
    ];

    const { nric ,selectedDate, selectedSlot} = values;
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'This is required!';
      }
    });

    if (nric && !NRIC_REGX.test(nric)) {
      errors['nric'] = 'Please enter a valid nric!';
    }
    if (moment(new Date(selectedDate)).isSame(moment(), 'day')) {
      if(moment(selectedSlot, 'HH:mm').isBefore(moment(new Date(),'HH:mm'), 'minutes')) {
        errors['selectedSlot'] = 'You should not select any past time slots!';
      }
    }
  return errors;
  }


let AppointmentForm = (props) => {
    const [centers, setCenters] = useState([{name: 'Select', ccId: 0}]);
    const [slots, setSlots] = useState(defaultSlot);
    const { handleSubmit, pristine, submitting, initialValues, selectedCenter, selectedDate, apptId } = props;
    const { selectedSlot:bookedSlot, selectedTime: bookedTime, selectedDate: bookedDate } = initialValues;
    const dispatch = useDispatch();
    useEffect(() => {
        (async() => {
          try {
            const response =  await callAPI('/centers', 'GET');
            if(response && response.status === 200) {
              setCenters(centers => [...centers, ...response.data]);
            }
          } catch (error) {
            toast.error('Unable to get the vaccine centers');
          }

        })();
    }, []);

    const getAvailableSlots = useCallback(async () => {
      try {
        if(selectedDate && selectedCenter) {
          const formattedDate = moment(new Date(selectedDate)).format('YYYY-MM-DD');
          const response =  await callAPI('/slots', 'GET', { selectedCenter, selectedDate: formattedDate});
          if(response && response.status === 200) {
            let data = response.data;

            // Adding booked time slot to dropdown to populate the booked time
            if (apptId && moment(formattedDate).isSame(moment(bookedDate), 'day')) {
              const slotExist = data.find(item => item.slotId === bookedSlot);
              if (!slotExist) {
                data = [...data, { slotId: bookedSlot, time: bookedTime }].sort((a,b) => a.slotId - b.slotId);
              }
            }
            if (moment(formattedDate).isSame(moment(), 'day')) {
               data = data.filter(item => moment(item.time, 'HH:mm').isAfter(moment(new Date(),'HH:mm'), 'minutes'))
            }
            
            setSlots(() => [...defaultSlot, ...data]);
          }
        }
      } catch (error) {

      }
    }, [selectedCenter, selectedDate, bookedDate, bookedSlot, bookedTime, apptId]);

    const upper = value => value && value.toUpperCase()


    useEffect(() => {
      getAvailableSlots();
    }, [getAvailableSlots]);

    useEffect(() => {
      return () => {
        dispatch(reset('AppointmentForm'));
      };
    }, [dispatch]);


    return (
        <>
        <CssBaseline />
        <Container>
          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
              mt: 8,
            }}
          >
            <Typography sx={{mb: 2}} component="h1" variant="h5">
              Book a slot
            </Typography>
            <Field
                name="nric"
                component={CustomTextField}
                label="NRIC"
                autoFocus
                fullWidth
                normalize={upper}
            />
            <Field
                name="fullname"
                component={CustomTextField}
                label="Full Name"
                fullWidth
            />
        <InputLabel id="vaccineCenterLabel">Vaccine Center</InputLabel>
        <Field
            name="selectedCenter"
            component={CustomSelectField}
            label="Vaccine Center"
            fullWidth
            >
            {centers && centers.map(center => (
            <MenuItem key={center.ccId} value={center.ccId}>{center.name}</MenuItem>
            ))}
        </Field>
        <InputLabel id="dateLabel">Date</InputLabel>
        <Box>
        <Field
        component={CustomDatePicker}
        min
        name="selectedDate"
        label="Date"
        />
        <InputLabel id="selectedSlotLabel">Available Slots</InputLabel>
        <Field
            name="selectedSlot"
            component={CustomSelectField}
            label="Slot"
            fullWidth
            >
            {slots && slots.map(slot => (
            <MenuItem key={slot.slotId} value={slot.slotId}>{slot.time}</MenuItem>
            ))}
        </Field>
        </Box>
            <Button
              type="submit"
              disabled={pristine || submitting}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             {apptId ? 'Update' :'Register!'} 
            </Button>
            </Box>
        </Container>
  </>
    )
}


AppointmentForm =  reduxForm({
    form: 'AppointmentForm', // a unique identifier for this form
    validate,
    enableReinitialize: true
  })(AppointmentForm);

  const selector = formValueSelector('AppointmentForm') // <-- same as form name
  AppointmentForm = connect(state => {
  // can select values individually
  const selectedCenter = selector(state, 'selectedCenter');
  const selectedDate = selector(state, 'selectedDate');
  const selectedSlot = selector(state, 'selectedSlot');
  const apptId = selector(state, 'apptId')
  return {
    selectedCenter,
    selectedDate,
    selectedSlot,
    apptId
  }
},dispatch => {
  return {
    changeFieldValue: function(field, value) {
      console.log('called me', field, value);
      dispatch(change('AppointmentForm', field, value))
  }
  }
})(AppointmentForm);

export default AppointmentForm;