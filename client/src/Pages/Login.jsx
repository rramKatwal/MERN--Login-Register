import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((Password) => !Password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:6517/login", {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
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
      <form onSubmit={handleSubmit}>
        <div className="regform">
          <div className="regborder">
            <h1>Login</h1>
            <div className="reg-container">
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
              <div className="reg">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="password">
                  <FontAwesomeIcon icon={faLock} /> Password
                </label>
                <div
                  className="show-password-toggle "
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  <span> Show Password</span>
                </div>
              </div>
              <br />
              <p>
                Don't have an account?<Link to="/register"> Register</Link>{" "}
              </p>
              <p>
                <Link to="/email"> Forget Password?</Link>
              </p>
              <button>Login</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
