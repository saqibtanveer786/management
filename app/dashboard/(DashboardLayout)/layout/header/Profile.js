import React, { useState } from "react"
import { useTheme } from "@mui/material/styles"
import Link from "next/link"
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  ListItemButton,
  List,
  ListItemText
} from "@mui/material"

import { Stack } from "@mui/system"
import {
  IconChevronDown,
  IconCreditCard,
  IconCurrencyDollar,
  IconMail,
  IconShield,
} from "@tabler/icons-react"

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;

  /*profile data*/
  const profiledata = [
    {
      href: "/",
      title: "My Profile",
      subtitle: "Account Settings",
      icon: <IconCurrencyDollar width="20" height="20" />,
      color: primary,
      lightcolor: primarylight,
    }
  ];
  return (
    <Box>
      <IconButton
        size="large"
        aria-label="menu"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            borderRadius: "9px",
          }),
        }}
        onClick={handleClick2}
      >
      <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
            alignItems: "center",
          }}
        >
          <Typography
            color="textSecondary"
            variant="h5"
            fontWeight="400"
            sx={{ ml: 1 }}
          >
          </Typography>
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              ml: 1,
            }}
          >
            Saqib
          </Typography>
          <IconChevronDown width="20" height="20" />
        </Box>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
            p: 2,
            pb: 2,
            pt:0
          },
        }}
      >

        <Box pt={0}>

          <List>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Edit Profile" />
            </ListItemButton>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Account" />
            </ListItemButton>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Change Password" />
            </ListItemButton>
            <ListItemButton component="a" href="#">
              <ListItemText primary="My Settings" />
            </ListItemButton>
          </List>

        </Box>
        <Divider />
        <Box mt={2}>
          <Button fullWidth variant="outlined" color="secondary">
            Logout
          </Button>
        </Box>

      </Menu>
    </Box>
  );
};

export default Profile;
