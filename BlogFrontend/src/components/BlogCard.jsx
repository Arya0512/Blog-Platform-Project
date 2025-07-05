
import Card from '../../node_modules/@mui/material/Card';
import CardContent from '../../node_modules/@mui/material/CardContent';
import Typography from '../../node_modules/@mui/material/Typography';

export default function BlogCard({blog}){
    return (
        <div style={{
      width: "100%",
      maxWidth: 500,
      backgroundColor: "white",
      padding: 4,
      borderRadius: 2,
      boxShadow: 3,
      marginLeft:"480px",
    }}>
             <Card sx={{ minWidth: 275 }} style={{ height:"200px"}}>
                <CardContent style={{marginTop:"10px"}}>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    {blog.title}
                    </Typography>
                    <Typography variant="h5" component="div">
                    -{blog.author}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 0 } }>{blog.content}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}