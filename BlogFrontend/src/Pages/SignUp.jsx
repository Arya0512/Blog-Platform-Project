import { useState } from "react";
import { Box, TextField, Button, Typography } from "../../node_modules/@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function Signup() {
  const [name,setName]=useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async(e) => {
    try{
    e.preventDefault();
    const res=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/blogs/signup`,{
      name,email,password
    });
    
    localStorage.setItem("token", res.data.token);
    alert("Signup successful");
    setName("");
    setEmail("");
    setPassword("");
    navigate("/login");
  }catch(err){
    alert("signup failed");
  }
}

  return (
    <>
    <h1 style={{marginLeft:"560px"}}>SignUp form</h1>
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
      <form onSubmit={handleSignup}>
        <TextField
          label="name"
          type="name"
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
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
          Signup
        </Button>
      </form>
    </Box>
    </div>
    </>
  );
}
