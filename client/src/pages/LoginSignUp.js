import React, { Fragment, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignUp.css";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors, register } from "../actions/userAction";


export default function LoginSignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const alert = useAlert();

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/avatar.jpg");
  const [avatarPreview, setAvatarPreview] = useState("/avatar.jpg");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  //const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/account");
      // history.push("/account");
    }
  }, [dispatch, error, navigate, isAuthenticated]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
    <Fragment>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              {/* <MailOutlineIcon /> */}
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              {/* <LockOpenIcon /> */}
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            {/* <Link to="/password/forgot">Forget Password</Link> */}
            <input type="submit" value="Login" className="loginBtn" />
          </form>
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              {/* <FaceIcon /> */}
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpEmail">
              {/* <MailOutlineIcon /> */}
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpPassword">
              {/* <LockOpenIcon /> */}
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>

            {/* <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div> */}
            <input type="submit" value="Register" className="signUpBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
}
