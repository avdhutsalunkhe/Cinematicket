import React, { useState, useRef, useEffect } from "react";
import axios from "../../api/axios";
import { useHistory } from "react-router-dom";
import gsap from "gsap";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const errorRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Animate form entrance
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
    // Animate button pulse
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0.9 },
        { scale: 1, duration: 0.8, ease: "elastic.out(1, 0.4)", repeat: -1, yoyo: true }
      );
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      history.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
      if (errorRef.current) {
        gsap.fromTo(
          errorRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );
        gsap.fromTo(
          errorRef.current,
          { x: -10 },
          { x: 10, duration: 0.1, repeat: 3, yoyo: true, ease: "power1.inOut" }
        ); // shake effect
      }
    }
  };

  return (
    <div className="login-container">
      {/* Internal expert CSS */}
      <style>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #1d2b64, #f8cdda);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        form {
          background: rgba(255, 255, 255, 0.95);
          padding: 2.5rem 2rem;
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          width: 350px;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        h2 {
          margin: 0;
          text-align: center;
          color: #1d2b64;
          font-size: 1.8rem;
          font-weight: bold;
          letter-spacing: 1px;
        }
        p {
          text-align: center;
          font-size: 0.9rem;
          color: #e74c3c;
          margin: -0.5rem 0 0.5rem;
          font-weight: 600;
        }
        input {
          padding: 0.8rem 1rem;
          border-radius: 0.8rem;
          border: 1px solid #ccc;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
        }
        input:focus {
          border-color: #1d2b64;
          box-shadow: 0 0 6px rgba(29, 43, 100, 0.3);
        }
        button {
          padding: 0.9rem;
          border-radius: 0.8rem;
          border: none;
          font-size: 1.1rem;
          font-weight: 600;
          background: linear-gradient(135deg, #1d2b64, #3a7bd5);
          color: white;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(29, 43, 100, 0.3);
        }
      `}</style>

      <form onSubmit={handleLogin} ref={formRef}>
        <h2>Admin Login</h2>
        {error && <p ref={errorRef}>{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@example.com"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          required
        />
        <button type="submit" ref={buttonRef}>Login</button>
      </form>
    </div>
  );
};

export default Login;
