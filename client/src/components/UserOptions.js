import React, { Fragment, useState } from "react";
import "./UserOptions.css";
import avatar from "../assets/avatar.png";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
 import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from "react-router-dom";
// import { useAlert } from "react-alert";
import { logout } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";

const UserOptions = ({ user }) => {

//  console.log(user, "useroptions")
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
  };

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
        icon={
          <img
            className="speedDialIcon"
            src={avatar}
            alt="Profile"
            // style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        }
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