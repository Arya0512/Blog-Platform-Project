import { useParams,useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {  Button} from "../../node_modules/@mui/material";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");
  const navigate=useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        setError("Could not fetch blog");
        console.error("Error fetching blog detail:", err);
      }
    };
    fetchBlog();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!blog) return <p>Loading blog...</p>;

  return (
    <>
    <div style={{
      width: "100%",
      maxWidth: 500,
      backgroundColor: "white",
      padding: 25,
      boxShadow: 3,
      marginLeft:"480px",
      height:"270px",
      border:"1px solid black",
      borderRadius:"20px"
    }}>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <h5>~ {blog.author}</h5>
       <p>Id of Blog: [{blog._id}]</p>
    </div>
    <Button variant="contained" type="submit" sx={{ mt: 2 }} style={{color:"azure",marginLeft:"700px"}} onClick={()=>navigate("/")}>
            back to page
          </Button>
    </>
  );
}



