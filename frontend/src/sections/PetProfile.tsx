import Grid from "@mui/material/Grid";

import Card from "../components/Card";

const petData = [
  {
    name: "Max",
    description: "A friendly golden retriever who loves to play fetch.",
    image: "../../public/pet1.jpg",
  },
  {
    name: "Whiskers",
    description: "An elegant tabby cat with a knack for napping.",
    image: "../../public/pet2.jpg",
  },
  {
    name: "Polly",
    description: "A talkative parrot with vibrant feathers.",
    image: "../../public/pet3.jpg",
  },
  {
    name: "Max",
    description: "A friendly golden retriever who loves to play fetch.",
    image: "../../public/pet1.jpg",
  },
  {
    name: "Whiskers",
    description: "An elegant tabby cat with a knack for napping.",
    image: "../../public/pet2.jpg",
  },
  {
    name: "Polly",
    description: "A talkative parrot with vibrant feathers.",
    image: "../../public/pet3.jpg",
  },
  {
    name: "Max",
    description: "A friendly golden retriever who loves to play fetch.",
    image: "../../public/pet1.jpg",
  },
  {
    name: "Whiskers",
    description: "An elegant tabby cat with a knack for napping.",
    image: "../../public/pet2.jpg",
  },
  {
    name: "Polly",
    description: "A talkative parrot with vibrant feathers.",
    image: "../../public/pet3.jpg",
  },
  {
    name: "Max",
    description: "A friendly golden retriever who loves to play fetch.",
    image: "../../public/pet1.jpg",
  },
  {
    name: "Whiskers",
    description: "An elegant tabby cat with a knack for napping.",
    image: "../../public/pet2.jpg",
  },
  {
    name: "Polly",
    description: "A talkative parrot with vibrant feathers.",
    image: "../../public/pet3.jpg",
  },
];

const PetProfile = () => (
  <Grid container spacing={2}>
    {petData.map((pet, index) => (
      <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
        <Card {...pet} />
      </Grid>
    ))}
  </Grid>
);

export default PetProfile;
