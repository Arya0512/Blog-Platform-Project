import { AppBar, Toolbar, Typography, Button, Box } from "../../node_modules/@mui/material";
import { Link,useNavigate,useLocation  } from "react-router-dom";
import { useState,useEffect} from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation(); // ✅ To detect route changes

  // ✅ Re-check token whenever route changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };
  return (
    <AppBar style={{width:"1550px",marginBottom:"1000px", height:"80px"}}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }} >
          <Link to="/" style={{ color: "white", textDecoration: "none",marginTop:"10px" }}>
            Blog Platform
          </Link>
        </Typography>
        <Box style={{marginRight:"20px", marginTop:"10px"}}>
           {isLoggedIn ? (
            <>
              <Button color="inherit" component={Link} to="/create">
                Create Blog
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}