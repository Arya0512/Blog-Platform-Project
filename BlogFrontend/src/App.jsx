import {Route,Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import CreateBlog from "./Pages/CreateBlog";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import BlogDetail from "./Pages/BlogDetail";
import EditBlog from "./Pages/EditBlog";

export default function App() {
  return (
    <>
    <h1>raect working</h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/blog/:id/edit" element={<EditBlog/>}/>

      </Routes>
    </>
  );
}

