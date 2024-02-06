import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faKey,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ReCAPTCHA from "react-google-recaptcha";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [recaptchaValue, setRecaptchaValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const captchaRef = useRef();

  const navigate = useNavigate();

  const onChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    captchaRef.current.reset();
    try {
      const res = await axios.post("http://localhost:6517/register", {
        name,
        email,
        password,
        cPassword,
        recaptchaValue,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  useEffect(() => {
    const pass = document.getElementById("password");
    const cPass = document.getElementById("cPassword");
    const msg = document.getElementById("message");
    const str = document.getElementById("strength");
    const requirements = document.getElementById("requirements");

    const lowercaseIndicator = document.getElementById("lowercase-indicator");
    const uppercaseIndicator = document.getElementById("uppercase-indicator");
    const digitIndicator = document.getElementById("digit-indicator");
    const symbolIndicator = document.getElementById("symbol-indicator");

    const handleInput = () => {
      if (pass.value.length > 0) {
        msg.style.display = "block";
      } else {
        msg.style.display = "none";
      }
      if (pass.value.length < 8) {
        str.innerHTML = "Weak";
        msg.style.color = "red";
      } else if (strength === 2) {
        str.innerHTML = "Medium";

        msg.style.color = "yellow";
      } else if (strength >= 3) {
        str.innerHTML = "Strong";

        msg.style.color = "green";

        requirements.style.display = "none";
      } else {
        requirements.style.display = "block";
      }

      if (cPass.value === pass.value) {
        setPasswordMatch(true);
      } else {
        setPasswordMatch(false);
      }
    };

    pass.addEventListener("input", handleInput);
    cPass.addEventListener("input", handleInput);

    return () => {
      pass.removeEventListener("input", handleInput);
      cPass.removeEventListener("input", handleInput);
    };
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="regform">
          <div className="regborder">
            <h1>Register</h1>
            <div className="reg-container">
              <div className="reg">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label htmlFor="name">
                  <FontAwesomeIcon icon={faUser} /> Name
                </label>
              </div>
              <br />
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
              </div>
              <div id="message">
                Password is <span id="strength"></span>
              </div>
              <br />
              <div className="reg">
                <input
                  type={showPassword ? "text" : "password"}
                  id="cPassword"
                  value={cPassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  required
                />
                <label htmlFor="cPassword">
                  <FontAwesomeIcon icon={faKey} /> Confirm Password
                </label>
                <div
                  className="show-password-toggle "
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  <span>Show Password</span>
                </div>
              </div>
              {passwordMatch && cPassword && password && (
                <div style={{ color: "green", marginTop: "5px" }}>
                  Passwords match
                </div>
              )}
              {!passwordMatch && cPassword && password && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  Passwords do not match
                </div>
              )}
            </div>

            <br />
            <div className="recaptcha">
              <ReCAPTCHA
                sitekey="6Lf7akcpAAAAAN79uZFCcXGvADF_ey4b163H4oQm"
                onChange={onChange}
                ref={captchaRef}
              />
            </div>
            <p>
              Already have an account?<Link to="/login"> Login</Link>{" "}
            </p>
            <button>Register</button>
          </div>
        </div>
      </form>
    </>
  );
};
