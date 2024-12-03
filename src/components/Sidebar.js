import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import { Home, CheckCircle, PendingActions, EventBusy, Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Sidebar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { text: "All Tasks", icon: <Home />, path: "/" },
    { text: "Completed Tasks", icon: <CheckCircle />, path: "/tasks/completed" },
    { text: "Pending Tasks", icon: <PendingActions />, path: "/tasks/pending" },
    { text: "Overdue Tasks", icon: <EventBusy />, path: "/tasks/overdue" },
  ];

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  return (
    <>
      {isMobile ? (
        <>
          {/* Hamburger Menu for Mobile */}
          <IconButton onClick={toggleDrawer} sx={{ position: "absolute", top: 16, left: 16 }}>
            <Menu />
          </IconButton>
          <Drawer
            open={isDrawerOpen}
            onClose={toggleDrawer}
            sx={{
              "& .MuiDrawer-paper": {
                width: 240,
                boxSizing: "border-box",
                backgroundColor: "#1e1e2d",
                color: "#fff",
              },
            }}
          >
            <SidebarContent menuItems={menuItems} navigate={navigate} />
          </Drawer>
        </>
      ) : (
        // Permanent Drawer for Desktop
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: "#1e1e2d",
              color: "#fff",
            },
          }}
        >
          <SidebarContent menuItems={menuItems} navigate={navigate} />
        </Drawer>
      )}
    </>
  );
};

const SidebarContent = ({ menuItems, navigate }) => (
  <>
    {/* Sidebar Header */}
    <Typography
      variant="h6"
      component="div"
      sx={{
        textAlign: "center",
        fontWeight: "bold",
        padding: "16px 0",
        backgroundColor: "#2c2c3e",
      }}
    >
      Task Dashboard
    </Typography>
    {/* Sidebar Menu */}
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          key={item.text}
          onClick={() => navigate(item.path)}
          sx={{
            "&:hover": {
              backgroundColor: "#333347",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  </>
);

export default Sidebar;
