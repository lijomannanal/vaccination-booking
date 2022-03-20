import { Link } from 'react-router-dom';
import React from "react";
import { useDispatch, useSelector} from "react-redux";
import Tabs from "@mui/material/Tabs";
import LinkTab from "@mui/material/Tab";
import { setActiveTab } from 'actions';

export const NavBar = () => {
  const { activeTab } = useSelector(state => state.tab);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    dispatch(setActiveTab(newValue))
  };
  return (
    <Tabs value={activeTab} onChange={handleChange} centered>
      <LinkTab component={Link} to="/" label="Make a Booking" />
      <LinkTab component={Link} to="/bookings" label="All Booking" />
    </Tabs>
  );
};