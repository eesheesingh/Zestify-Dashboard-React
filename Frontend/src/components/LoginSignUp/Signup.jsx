import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import LoadingBar from "react-top-loading-bar";

const Signup = () => {
    const [chatId, setChatId] = useState('')
    const [phone, setPhone] = useState('')
    const navigate = useNavigate();
    const ref = useRef(null);

    const handleError = (err) =>
    toast.info(err, {
      position: "bottom-left",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (phone.length < 10 || phone.length > 10) {
          throw new Error(handleError('Phone number must be exactly 10 digits long.'));
        }

        try {
            ref.current.continuousStart();
            if (!phone) {
                throw new Error(handleError("Phone Number is required!"));
              }
          const response = await fetch(
            "http://localhost:5000/api/chatMembers/phone",
            {
                headers: {'Content-Type': 'application/json'},
                method: "POST",
                body: JSON.stringify({chatId, phone}),
            }
          );
          const data = await response.json();
          if (!response.ok) {
            throw new Error(handleError(data.message));
          }
          navigate("/login", {state: {phone: phone}});
        } catch (error) {
          console.log(error.message)
        } finally {
          ref.current.complete();
        }
      };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="loginHeading font-bold">Signup</h2>
        <p className="loginPara">
          Enter your Mobile Number to link with your Chat ID.
        </p>
        <div className="loginForm">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                placeholder="Enter your Chat ID"
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder="Enter your Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                pattern="[6-9]{1}[0-9]{9}"
                title="Please enter valid phone number"
              />
            </div>
            <button type="submit">Continue</button>
          </form>
          <LoadingBar color="blue" ref={ref} />
        </div>
        <p className="loginBottomPara">
          <a href="/login">Click here to go to login</a>
        </p>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Signup