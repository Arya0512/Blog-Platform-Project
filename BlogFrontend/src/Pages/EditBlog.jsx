import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button } from "../../node_modules/@mui/material";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });

  // Fetch existing blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/blogs/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.log("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  // Only update content
  const handleChange = (event) => {
    setFormData({ ...formData, content: event.target.value });
  };

  // Submit edited blog
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/blogs/${id}`, {
        content: formData.content,
      }, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});
      alert("Blog updated successfully");
      navigate("/");
    } catch (err) {
      console.log("Error updating blog:", err);
    }
  };

  return (
    <>
      <h1 style={{ marginLeft: "560px" }}>Edit the Blog</h1>
      <div
        style={{
          width: "100%",
          maxWidth: 500,
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          marginLeft: "480px",
        }}
      >
        <h3>Title: {formData.title}</h3>
        <form onSubmit={handleSubmit}>
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
          <Button variant="contained" type="submit" sx={{ mt: 2 }} style={{color:"azure"}}>
            Publish Blog
          </Button>
        </form>
        <h4>Author: {formData.author}</h4>
      </div>
    </>
  );
}
