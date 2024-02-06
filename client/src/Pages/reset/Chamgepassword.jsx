import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faLock,
  faPenClip,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:6517/reset-password", {
        email,
        otp,
        password,
        cPassword,
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

      let strength = 0;

      if (pass.value.match(/[a-z]/)) {
        strength++;
        lowercaseIndicator.style.color = "green";
      } else {
        lowercaseIndicator.style.color = "red";
      }

      if (pass.value.match(/[A-Z]/)) {
        strength++;
        uppercaseIndicator.style.color = "green";
      } else {
        uppercaseIndicator.style.color = "red";
      }

      if (pass.value.match(/[0-9]/)) {
        strength++;
        digitIndicator.style.color = "green";
      } else {
        digitIndicator.style.color = "red";
      }

      if (pass.value.match(/[!@#$%^&*(),.?":{}|<>]/)) {
        strength++;
        symbolIndicator.style.color = "green";
      } else {
        symbolIndicator.style.color = "red";
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
      <div className="homeContainer">
        <div className="home">
          <h2>Change Password!!</h2>

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
            <div className="reg">
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <label htmlFor="otp">
                <FontAwesomeIcon icon={faPenClip} /> OTP
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
              <div id="requirements">
                Requirements:
                <label id="lowercase-indicator">a-z</label>
                <label id="uppercase-indicator">A-Z</label>
                <label id="digit-indicator">0-9</label>
                <label id="symbol-indicator">!@#$%^&*()</label>
              </div>
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
            <br />
            <p>
              <Link to="/email">Resend OTP</Link>
            </p>
            <button>Rest Password</button>
          </form>
        </div>
      </div>
    </>
  );
};
