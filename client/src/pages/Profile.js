import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/layout/Loader";
import { Link, useNavigate } from "react-router-dom";
import profileImg from '../assets/avatar.png'
import { logout } from "../actions/userAction";
import { useDispatch } from "react-redux";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);

  function logoutUser() {
    dispatch(logout());
    navigate("/");
    // alert.success("Logout Successfully");
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={profileImg} alt={user.name} />
              <Link to="/me/update" className="Editprofilebtn">
              <button type="button" className="btn" >Edit Profile</button></Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div className="profile-buttons">
                <Link to="/orders"><button type="button" className="btn">My Orders</button></Link>

                <Link to="/"><button type="button" className="btn" onClick={logoutUser}>Logout</button></Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
