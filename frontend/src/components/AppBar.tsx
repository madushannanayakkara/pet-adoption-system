import { useContext } from "react";
import {
  AppBar as AppBarMUI,
  Toolbar,
  Typography,
  Box,
  InputBase,
  Avatar,
  Button,
  useTheme,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";

import Logo from "../assets/logo.jpg";
import { userContext } from "../context/ContextProvider";
import { deleteCurrentUser } from "../services/authService";

interface AppBarProps {
  isSearchVisible: boolean;
}

const AppBar = ({ isSearchVisible = false }: AppBarProps) => {
  const theme = useTheme();
  const { setRole, setAuthenticated } = useContext(userContext);

  const handleLogout = async () => {
    try {
      const response = await deleteCurrentUser();

      if (response.status === 200) {
        setRole("");
        setAuthenticated(false);
      } else {
        console.error("Error while logout...!");
      }
    } catch (err) {
      console.error("Error while logout: ", err);
    }
  };

  return (
    <AppBarMUI
      position="fixed"
      elevation={1}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "#fff",
        color: "#333",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar alt="Logo" src={Logo} sx={{ width: 46, height: 46 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              background: "linear-gradient(-90deg, #1976d2 0%, #42a5f5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: 1,
            }}
          >
            TailMate
          </Typography>
        </Box>

        {/* Search Bar */}
        {isSearchVisible && (
          <Box
            sx={{
              position: "relative",
              borderRadius: 3,
              backgroundColor: "#f1f3f4",
              width: "40%",
              display: "flex",
              alignItems: "center",
              px: 1.5,
            }}
          >
            <SearchIcon sx={{ color: "#555" }} />
            <InputBase
              placeholder="Search…"
              sx={{
                ml: 1,
                flex: 1,
                color: "#333",
                input: { p: 1 },
              }}
            />
          </Box>
        )}

        {/* User & Logout */}
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar alt="User" src="/user-avatar.png" />
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              borderColor: "#1976d2",
              color: "#1976d2",
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.08)",
                borderColor: "#1565c0",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBarMUI>
  );
};

export default AppBar;
