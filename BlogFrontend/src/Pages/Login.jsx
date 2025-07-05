import { useState } from "react";
import axios from "axios";
import { Box, TextField, Button } from "../../node_modules/@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate=useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/blogs/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token); // Store token
      setMessage("Login successful");
      setEmail("");
      setPassword("");
      navigate("/create");
    } catch (err) {
      setMessage("Invalid password or eamil");
    }
  };

  return (
    <>
     <h1 style={{marginLeft:"560px"}}>Login</h1>
    <div style={{
      width: "100%",
      maxWidth: 500,
      backgroundColor: "white",
      padding: 4,
      borderRadius: 2,
      boxShadow: 3,
      marginLeft:"480px",
    }}>
      <Box>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          login
        </Button>
      </form>
    </Box>
      <p style={{ color: message === "Login successful" ? "green" : "red" }}>
        {message}
      </p>
    </div>
    </>
  );
}
