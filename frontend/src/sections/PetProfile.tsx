import { Typography, Card, CardContent } from "@mui/material";

const PetProfile = () => (
  <Card>
    <CardContent>
      <Typography variant="h5">Max</Typography>
      <Typography variant="body2">Breed: Labrador</Typography>
      <Typography variant="body2">Age: 2 years</Typography>
    </CardContent>
  </Card>
);

export default PetProfile;
