import { TextField, Button, Typography } from "../../node_modules/@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateBlog(){
    const navigate = useNavigate();
    let [formData,setFormData]=useState({
      title:"",content:"",author:"",
    });
    let handleChange=(event)=>{
      setFormData({...formData,[event.target.name]:event.target.value})
    };
    useEffect(()=>{
      const token=localStorage.getItem("token");
      if(!token){
        alert("Plase get first login");
        navigate("/login");
      }
    },[navigate]);

    let handleSubmit=async (event)=>{
      event.preventDefault();
      const token=localStorage.getItem("token");
        try{
          await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/blogs`,formData,{
            headers:{
              Authorization:`Bearer ${token}`,
            },
          });
          alert(" blog created successfully ");
          navigate("/");
        } catch (err) {
      console.error("Error creating blog:", err);
    };
        
    };

    return(
      <>
      <h1 style={{marginLeft:"560px"}}>Create A Blog</h1>
    <div style={{
      width: "100%",
      maxWidth: 500,
      backgroundColor: "white",
      padding: 4,
      borderRadius: 2,
      boxShadow: 3,
      marginLeft:"480px",
    }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Blog Title"
          name="title"
          fullWidth
          value={formData.title}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Content"
          name="content"
          fullWidth
          multiline
          minRows={5}
          value={formData.content}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="author"
          name="author"
          fullWidth
          multiline
          minRows={5}
          value={formData.author}
          onChange={handleChange}
          margin="normal"
        />

        <Button variant="contained" type="submit" sx={{ mt: 2 }} >
          Publish Blog
        </Button>
      </form>
      </div>
        </>
    )
}