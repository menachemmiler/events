import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

//to do that the card get the img and the text and the link as a content

interface Props {
  text: string;
  title: string;
  linkTo: string;
  imgName: string;
}
export default function ActionAreaCard({
  imgName,
  linkTo,
  text,
  title,
}: Props) {
  return (
    <Card
      sx={{ maxWidth: 345 }}
      onClick={() => (window.location.href = linkTo)}
      style={{ direction: "rtl" }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`../../public/${imgName}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
