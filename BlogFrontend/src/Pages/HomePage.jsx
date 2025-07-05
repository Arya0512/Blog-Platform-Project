import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  Button} from "../../node_modules/@mui/material";

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs", err);
      }
    };

    fetchBlogs();
  }, []);
  const handleDelete=async(id)=>{
    if(window.confirm("are you sure you want to delete this blog ?"));{
      try{
        await axios.delete(`http://localhost:3000/api/blogs/${id}`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});
        setBlogs((prev)=>prev.filter((blog)=>id!=blog._id))
      } catch(err){
        console.log("error while deleting",err);

      }
  }
};


   return (
    <>
    
    <div style={{
      width: "100%",
      maxWidth: 500,
      backgroundColor: "white",
      padding: 4,
      borderRadius: 2,
      boxShadow: 3,
      marginLeft:"480px",
    }}>
      <h2 style={{ textAlign: "center", marginTop:"55px" }}>All Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "16px",
              marginBottom: "12px",
            }}
          >
            <div style={{textAlign:"center"}}>
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
              <small>~ {blog.author}</small>
              <hr></hr>
            </div>
            <div style={{marginLeft:"65px", marginTop:"14px"}}>
               <Button variant="outlined" type="submit"
                onClick={() => handleDelete(blog._id)}>delete</Button>
                <Button variant="outlined" type="submit" style={{marginLeft:"14px"}} onClick={()=>navigate(`/blog/${blog._id}/edit`)}>Edit</Button>
                <Button variant="outlined" type="submit" style={{marginLeft:"14px"}} onClick={()=>navigate(`/blog/${blog._id}`)}>see in deatil</Button>
            </div>
      
          </div>
        ))
      )}
    </div>
    </>
  );
}
