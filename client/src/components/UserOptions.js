import React, { Fragment, useState } from "react";
import "./UserOptions.css";
import avatar from "../assets/avatar.png";
import { SpeedDial, SpeedDialAction } from "@mui/lab";
import Backdrop from "@mui/material/Backdrop";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/userAction";
import { useDispatch } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  //   if (user.role === "admin") {
  //     options.unshift({
  //       icon: <DashboardIcon />,
  //       name: "Dashboard",
  //       func: dashboard,
  //     });
  //   }

  //   function dashboard() {
  //     navigate("/admin/dashboard");
  //   }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  //   function cart() {
  //     navigate("/cart");
  //   }
  function logoutUser() {
    dispatch(logout());
    navigate("/");
    // alert.success("Logout Successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={<img className="speedDialIcon" src={avatar} alt="Profile" />}
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
