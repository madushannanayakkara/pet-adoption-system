import {
  Card as CardMUI,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Button,
  Box,
} from "@mui/material";

interface PetCardProps {
  name: string;
  description: string;
  image: string;
}

const Card = ({ name, description, image }: PetCardProps) => (
  <CardMUI
    sx={{
      width: "100%",
      height: 360,
      display: "flex",
      flexDirection: "column",
      borderRadius: 4,
      boxShadow: 2,
      transition: "transform 0.3s, box-shadow 0.3s",
      "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: 6,
      },
    }}
  >
    <CardActionArea
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{
          height: 200,
          objectFit: "cover",
          transition: "transform 0.3s ease-in-out, filter 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
            filter: "brightness(1.05)",
          },
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button variant="outlined" size="small">
            Request adoption
          </Button>
          <Button size="small">See all</Button>
        </Box>
      </CardActions>
    </CardActionArea>
  </CardMUI>
);

export default Card;
