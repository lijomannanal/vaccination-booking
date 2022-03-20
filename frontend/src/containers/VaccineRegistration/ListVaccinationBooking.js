import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Box,
  Button,
  CssBaseline,
  Typography,
  TableContainer,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Container,
  Pagination
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from 'react-router-dom';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from 'moment';
import { fetchAppointments, deleteAppointment } from 'actions';
import ConfirmPopup from 'containers/common/ConfirmPopup';
import AlertPopup from 'containers/common/AlertPopup';
import usePopup from 'hooks/usePopup';

const useStyles = makeStyles((theme) => ({
  paginationDiv: {
    "& .MuiPagination-root": {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '2rem'
    }
  }
}));

const PER_PAGE = 10;

export const VaccineRegistrationListing = () => {
 const [ deleteId, setDeleteId ] = useState(null);
 const [ pageAppointments, setPageAppointments ] = useState([]);
 const dispatch = useDispatch();
 const appointments = useSelector(state => state.appointment.appointments);
 const [isOpen, showConfirmPopup, hideConfirmPopup]  = usePopup();
 const [openAlert, showAlert, hideAlert]  = usePopup();
 const history = useHistory();
 const { paginationDiv } = useStyles();
 const [ pageCount, setPageCount] = useState(0);
 const [ page, setPage] = useState(1);

 useEffect(() => {
    dispatch(fetchAppointments());
 },[dispatch]);

 useEffect(() => { 
  if (appointments.length) {
    const totalPages = Math.ceil(appointments.length / PER_PAGE);
    setPageCount(totalPages);
  }
},[appointments]);

useEffect(() => { 
 const offset = (page - 1) * PER_PAGE;
 const appts = appointments.slice(offset, offset + PER_PAGE);
 setPageAppointments(appts);
},[page, appointments]);

  const onDeleteApptConfirm = () => {
    dispatch(deleteAppointment(deleteId)); 
    setDeleteId(null);
  }
  

  const editAppt = (appt) => {
     if( moment(new Date(appt.slot), 'HH:mm').isBefore(moment(new Date(),'HH:mm'), 'minutes')) {
       showAlert();
     } else {
      history.push(`/bookings/${appt.apptId}`);
     }
  }

  const deleteAppt = (appt) => {
    setDeleteId(appt.apptId);
    if( moment(new Date(appt.slot), 'HH:mm').isBefore(moment(new Date(),'HH:mm'), 'minutes')) {
      showAlert();
    } else {
     showConfirmPopup(); 
    }
 }
  return (
        <>
        <CssBaseline />
        <Container>
          <Box sx={{mt: 8}}>
            <Typography component="h1" variant="h5">
              Active Booking
            </Typography>
            <TableContainer component={Box}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">Center Name</TableCell>
                    <TableCell align="left">Start Time</TableCell>
                    <TableCell align="left">&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pageAppointments && pageAppointments.map((row) => (
                    <TableRow
                      key={row.apptId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.residentName}
                      </TableCell>
                      <TableCell align="left">{row.centerName}</TableCell>
                      <TableCell align="left">
                        {row.slot}
                      </TableCell>
                      <TableCell align="left">
                        {/* <Button component={Link} to={`/bookings/${row.apptId}`}>
                          <ModeEditIcon />
                        </Button> */}

                        <Button onClick={() => editAppt(row)}>
                          <ModeEditIcon />
                        </Button>
                        
                        <Button onClick={() => deleteAppt(row)}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!pageAppointments ||  !pageAppointments.length) && 
                  <TableRow>
                    <TableCell style={{textAlign:'center'}} colSpan="4">
                      No appointments found
                    </TableCell>
                  </TableRow>
                  } 
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <div className={paginationDiv}>
            <Pagination onChange={((event, page) => setPage(page))} count={pageCount} variant="outlined" shape="rounded" />
          </div>

        </Container>
        <ConfirmPopup
            title="Delete Appointment?"
            open={isOpen}
            hidePopup={() => { hideConfirmPopup(); setDeleteId(null)}}
            onConfirm={() => onDeleteApptConfirm()}
        >
            Are you sure you want to delete this appointment?
        </ConfirmPopup>

        <AlertPopup
            title="Operation not allowed!"
            open={openAlert}
            hidePopup={() => { hideAlert(); setDeleteId(null)}}
        >
          { `Past appointments cannot be ${deleteId ? 'Deleted' : 'Modifed'}!`}
        </AlertPopup>
      </>
  )
}
//  class VaccineRegListing extends Component {
//    constructor(props) {
//      super(props);
//      this.state = {
//       isOpen: false,
//       deleteId: null,
//       isAlertOpen: false
//      }
//    }

//    openPopup(isOpen){
//      this.setState({ isOpen });
//    }
//    setDeleteId(deleteId){
//     this.setState({ deleteId });
//   }

//   componentDidMount(){
//     this.props.fetchAppointments();
//   }

//   deleteAppointment(){
//    this.props.deleteAppointment(this.state.deleteId);
//   }

//   render() {
//     const { appointments } = this.props;
//     const { isOpen } = this.state;
//     return (
//       <React.Fragment>
//         <CssBaseline />
//         <Container>
//           <Box sx={{mt: 8}}>
//             <Typography component="h1" variant="h5">
//               Active Booking
//             </Typography>
//             <TableContainer component={Box}>
//               <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Name</TableCell>
//                     <TableCell align="left">Center Name</TableCell>
//                     <TableCell align="left">Start Time</TableCell>
//                     <TableCell align="left">&nbsp;</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {appointments && appointments.map((row) => (
//                     <TableRow
//                       key={row.apptId}
//                       sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                     >
//                       <TableCell component="th" scope="row">
//                         {row.residentName}
//                       </TableCell>
//                       <TableCell align="left">{row.centerName}</TableCell>
//                       <TableCell align="left">
//                         {row.slot}
//                       </TableCell>
//                       <TableCell align="left">
//                         <Button component={Link} to={`/bookings/${row.apptId}`}>
//                           <ModeEditIcon />
//                         </Button>
//                         <Button onClick={() => { this.openPopup(true); this.setDeleteId(row.apptId)}}>
//                           <DeleteIcon />
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>
//         </Container>
//         <ConfirmPopup
//             title="Delete Appointment?"
//             open={isOpen}
//             setOpen={(flag) => this.openPopup(flag)}
//             onConfirm={() => this.deleteAppointment()}
//         >
//             Are you sure you want to delete this appointment?
//         </ConfirmPopup>

//         <ConfirmPopup
//             title="Operation not allowed!"
//             open={isOpen}
//             setOpen={(flag) => this.openPopup(flag)}
//             onConfirm={() => this.deleteAppointment()}
//         >
//             Are you sure you want to delete this appointment?
//         </ConfirmPopup>
//       </React.Fragment>
//     );
//   }
// }

// const mapStateToProps = function(state) {
//   return {
//     appointments: state.appointment.appointments,
//   }
// }
// const mapDispatchToProps = {
//   fetchAppointments,
//   deleteAppointment
// }


// export const VaccineRegistrationListing =  connect(mapStateToProps, mapDispatchToProps)(VaccineRegListing);