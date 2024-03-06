// Login.js

import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import "./Login.css";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";



const Login = ({ setChatMembers }) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef(null);

  const handleError = (err) =>
    toast.info(err, {
      position: "bottom-left",
    });

  useEffect(() => {
    const sessionData = sessionStorage.getItem("chatId");
    if (sessionData) {
      setLoading(true);
      fetch(`http://localhost:5000/api/chatMembers?chatId=${sessionData}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(handleError("User not Found!"), navigate("/login"));
          }
          return response.json();
        })
        .then((data) => {
          setChatMembers(data);
          navigate("/");
        })
        .catch((error) => {
          handleError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [navigate, setChatMembers]);

  useEffect(() => {
    if (location.state && location.state.phone) {
      setInputValue(location.state.phone);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      ref.current.continuousStart();
      const response = await fetch(
        `http://localhost:5000/api/chatMembers?chatId=${inputValue}`
      );

      if (!inputValue) {
        throw new Error(handleError("Chat ID is required!"));
      }
      if (!response.ok) {
        throw new Error(handleError("ChatID is not Found!"));
      }

      const data = await response.json();
      setChatMembers(data);
      sessionStorage.setItem("chatId", inputValue);
      navigate("/");
    } catch (error) {
      null;
    } finally {
      ref.current.complete();
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
    >
      <div className="login-box">
        <h2 className="loginHeading font-bold">Login</h2>
        <p className="loginPara">
          Enter your Mobile Number to access the Data.
        </p>
        <div className="loginForm">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                placeholder="Enter your Number or Chat ID"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
              />
            </div>
            <button type="submit">Continue</button>
          </form>
          <LoadingBar color="blue" ref={ref} />
        </div>
        <p className="loginBottomPara">
          Haven&apos;t Signed-Up yet?<a href="/signup"> Click here</a>
        </p>
        <ToastContainer />
      </div>
    </motion.div>
  );
};

Login.propTypes = {
  setChatMembers: PropTypes.any,
};

export default Login;
