import { Box, Grid, Typography } from "@mui/material";
import AboutImg from "../assets/aboutUs.svg";

const About = () => {
  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            sx={{ fontFamily: "'Poppins', sans-serif", mb: 5 }}
          >
            About TailMate
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 3 }}
          >
            TailMate is a compassionate platform dedicated to helping pets find
            their forever homes. Whether you're a shelter, donator, or adopter,
            our system allows you to manage pet profiles, streamline
            communication, and support funding and adoption processes — all from
            one place.
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "1rem", lineHeight: 1.8, mb: 2 }}
          >
            We believe every paw deserves a loving home. Join our mission and
            help tails wag happier.
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "1rem", lineHeight: 1.8, mb: 2 }}
          >
            With TailMate, shelters can easily upload available pets, track
            adoption applications, and securely handle donations. Donators can
            contribute to specific causes or animals, while potential adopters
            can browse through profiles, submit requests, and stay updated with
            ease.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={AboutImg}
            alt="About TailMate"
            sx={{
              width: "100%",
              maxWidth: 400,
              display: "block",
              margin: "0 auto",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
