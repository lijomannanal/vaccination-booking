import { TextField, Select, FormHelperText } from "@mui/material";
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';

export const CustomTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => {
    return <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      sx={{mb: 2}}
      {...input}
      {...custom}
    />
  };

  const renderFormHelper = ({ touched, error }) => {
    if (!(touched && error)) {
      return
    } else {
      return <FormHelperText className='Mui-error'>{touched && error}</FormHelperText>
    }
  }

  export const CustomSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
  }) => {
    return (
      <>
      <Select
        {...input}
        {...custom}
        inputProps={{
          name: 'selectedCenter',
        }}
        error={Boolean(touched && error)}
        sx={{mb: 2}}
      >
        {children}
      </Select>
      {renderFormHelper({ touched, error })}
      </>
    );
  }


export const CustomDatePicker = ({input, meta: {touched, error} }) => (
  <>
        <DatePicker minDate={moment()} renderInput={(props) => <TextField fullWidth sx={{mb: 2}} {...props} />} {...input}  />
        {touched && error && <span>{error}</span>}
  </>
);