import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const Email = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:6517/email", {
        email,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/reset-password");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="homeContainer">
        <div className="home">
          <h1>Email Verification!!</h1>
          <p>Please Enter your valid Email address below:</p>
          <form onSubmit={handleSubmit}>
            <div className="reg">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} /> Email
              </label>
            </div>
            <br />
            <button>Continue</button>
          </form>
        </div>
      </div>
    </>
  );
};
