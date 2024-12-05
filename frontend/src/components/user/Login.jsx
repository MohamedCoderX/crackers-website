import React, { Fragment, useEffect, useState } from "react";
import "./login.css";
import MetaData from "../../Pages/Home/MetaData";
import Footer from "../footer/Footer";
import { clearAuthError, login } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, isAuthenticated } = useSelector((state) => state.authState);
  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }
  }, [error, isAuthenticated, dispatch, navigate]);

  return (
    <div>
      <MetaData title={"Login"} />
      <Fragment>
        <div className="containerer">
          <div className="logo">
            <img src="../images/logo.jpeg" alt=" logo" />
          </div>
          <div className="form">
            <img src="../images/logo.png" alt="logo img" />
            <div className="form_one">
              <h1>Sign into your account</h1>
              <form onSubmit={submitHandler}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="pass"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className=" btn btn-block ">
                  login
                </button>
              </form>
              <div className=" text-center d-flex flex-column  justify-content-center align-items-center mt-3">
                <a href="/Forgotpassword" className=" text-center pb-2">
                  Forgot Password
                </a>

                <a href="/Register" className=" text-center">
                  {" "}
                  Don't have an account ? Register Here
                </a>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
      <Footer />
    </div>
  );
}
