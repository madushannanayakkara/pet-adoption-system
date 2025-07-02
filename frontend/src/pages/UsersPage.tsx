import { useState } from "react";
import {
  Box,
  Toolbar,
  Typography,
  CssBaseline,
  Container,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import ContactsIcon from "@mui/icons-material/Contacts";
import InfoIcon from "@mui/icons-material/Info";

import AppBar from "../components/AppBar";
import Sidebar from "../components/Sidebar";
import PetProfile from "../sections/PetProfile";
import Contact from "../sections/Contact";
import About from "../sections/About";

const Users = () => {
  const [section, setSection] = useState("pet");

  const menuItems = [
    {
      key: "pet",
      label: "Pet Profile",
      icon: <PetsIcon />,
      component: <PetProfile />,
    },
    {
      key: "contact",
      label: "Contact",
      icon: <ContactsIcon />,
      component: <Contact />,
    },
    {
      key: "about",
      label: "About Us",
      icon: <InfoIcon />,
      component: <About />,
    },
  ];

  const renderContent = () => {
    const activeItem = menuItems.find((item) => item.key === section);
    return activeItem?.component || <Typography>Section not found</Typography>;
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar isSearchVisible={section === "pet"} />
      <Sidebar
        section={section}
        setSection={setSection}
        menuItems={menuItems}
      />

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
};

export default Users;
