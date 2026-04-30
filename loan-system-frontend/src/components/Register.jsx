import "../styles/Main.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function toggle() {
    setIsVisible((prev) => !prev);
  }

  async function handleRegister() {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
      }),
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      alert("Register Success");
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h2>Sign Up Here</h2>

        <label> Name </label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label> Email </label>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label> Password </label>
        <input
          type={isVisible ? "text" : "password"}
          placeholder="Enter you password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label> Confirm Password </label>
        <input
          type={isVisible ? "text" : "password"}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="hideButton" onClick={() => toggle()}>
          {isVisible ? "Hide" : "Show"}
        </button>

        <button onClick={handleRegister}>Register</button>

        <Link to="/">If you don't have an account. Click Here!</Link>
      </div>
    </div>
  );
}

export default Register;
