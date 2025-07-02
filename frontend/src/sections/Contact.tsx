import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";

const contacts = [
  {
    name: "Emily Carter",
    email: "emily.carter@example.com",
    phone: "+1 (202) 555-0173",
  },
  {
    name: "Liam Johnson",
    email: "liam.johnson@example.com",
    phone: "+1 (415) 555-0198",
  },
  {
    name: "Sophia Patel",
    email: "sophia.patel@example.com",
    phone: "+44 7911 123456",
  },
  {
    name: "Noah Silva",
    email: "noah.silva@example.com",
    phone: "+61 412 345 678",
  },
  {
    name: "Ava Thompson",
    email: "ava.thompson@example.com",
    phone: "+94 77 123 4567",
  },
];

const Contact = () => (
  <Grid container spacing={3}>
    {contacts.map((contact, index) => (
      <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            transition: "transform 0.2s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 6,
            },
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Avatar sx={{ bgcolor: "#67b7f7" }}>
                <PersonIcon />
              </Avatar>
              <Typography variant="h6" fontWeight={600}>
                {contact.name}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <EmailIcon fontSize="small" color="action" />
              <Typography variant="body2">{contact.email}</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <PhoneIcon fontSize="small" color="action" />
              <Typography variant="body2">{contact.phone}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default Contact;
