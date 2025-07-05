import { Button } from "../../node_modules/@mui/material";
import { useNavigate } from "react-router-dom";

export default function LogoutButton({setIsLoggedIn}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsLoggedIn(false);
    alert("Logged out successfully");
    navigate("/login"); 
  };

  return (
    <Button variant="contained" color="error" onClick={handleLogout}>
      Logout
    </Button>
  );
}
