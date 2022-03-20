import './App.css';
import {Route, Switch,BrowserRouter } from 'react-router-dom';
import {VaccineRegistration} from './containers/VaccineRegistration/VaccineRegistration';
import { VaccineRegistrationListing } from './containers/VaccineRegistration/ListVaccinationBooking';
import { EditVaccineRegistration } from './containers/VaccineRegistration/EditVaccinationBooking';
import { NavBar } from './containers/Nav';
import { Component } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './sagas/store';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  componentDidMount() {
    document.title = 'Vaccination Center';
  }
  render() {
    return (
      <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      
        <BrowserRouter>
            <NavBar />
            <ToastContainer/>
            <Switch>
              <Route path="/bookings" exact component={VaccineRegistrationListing} />
              <Route path="/bookings/:bookingId" exact component={EditVaccineRegistration} />
              <Route path="/" exact component={VaccineRegistration} />
            </Switch>
        </BrowserRouter>
      </LocalizationProvider>
      </Provider>
    )
  }
}


export default App;
