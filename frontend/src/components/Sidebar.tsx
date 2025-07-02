import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

const drawerWidth = 320;

export interface MenuItem {
  label: string;
  key: string;
  icon: React.ReactElement;
}

interface SidebarProps {
  section: string;
  setSection: (section: string) => void;
  menuItems: MenuItem[];
}

const Sidebar = ({ section, setSection, menuItems }: SidebarProps) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", px: 2.5, pt: 2.5 }}>
        <List sx={{ fontFamily: "'Poppins', sans-serif" }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.key}
              selected={section === item.key}
              onClick={() => setSection(item.key)}
              sx={{
                borderRadius: 2,
                mb: 1,
                ...(section === item.key && {
                  backgroundColor: "grey.200",
                  color: "text.primary",
                  "& .MuiListItemIcon-root": {
                    color: "text.primary",
                  },
                }),
                "&:hover": {
                  backgroundColor: "grey.100",
                },
                "&:focus": {
                  outline: "none",
                  backgroundColor: "grey.300",
                },
                transition: "background-color 0.2s ease",
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: section === item.key ? "500" : "300",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
