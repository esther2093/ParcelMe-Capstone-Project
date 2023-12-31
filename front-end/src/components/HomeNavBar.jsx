import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";
import { HashLink } from "react-router-hash-link";

const sections = [
  { link: "/#banner-top", label: "HOME" },
  { link: "/#about-top", label: "ABOUT" },
  { link: "/#services-top", label: "SERVICES" },
];

const pages = [
  { link: "/trips/", label: "SEND" },
  { link: "/drive/", label: "DRIVE" },
];

const settings = [
  { link: "/login/", label: "LOGIN" },
  { link: "/myaccount/", label: "ACCOUNT" },
];

export default function NavBar() {
  const [sticky, setSticky] = useState(false);
  const [transparent, setTransparent] = useState(true);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  //handles to control open and close of nav and menu
  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };
 
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //sets the navClass depending on the variables
  const className = sticky //check if sticky is true
    ? "navbar-slide-down" //if sticky is true is assigned this value
    : transparent //check if transparent is true
    ? "navbar-transparent" //if sticky is true and transparent is falsey then assigned this value
    : "navbar"; //if both false then assigned this value

  //handle to update sticky and transparency of navbar
  const handleScroll = () => {
    const scrollY = window.scrollY;
    //setting navbar sticky before 400px
    setSticky(scrollY >= 400);
    //setting navbar to transparent after 400px
    setTransparent(scrollY <= 400);
  };

  //attach an event listener for scrolling
  useEffect(() => {
    //add event listener whenever page is scrolled
    window.addEventListener("scroll", handleScroll);
    //remove event listener when no longer scrolling
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar position={sticky ? "fixed" : "static"} color="secondary" className={className} sx={{ width: "100%" }}>
      <Container maxWidth="false">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            className="navbar-logo"
            sx={{
              display: { xs: "none", md: "flex" },
              color: "inherit",
              textDecoration: "none",
              fontWeight: "700",
              fontSize: "1.5em",
              letterSpacing: "-0.1em",
              marginRight: "2rem",
            }}
          >
            PARCELME
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {sections.map((section) => (
                <Button
                  key={section.link}
                  component={HashLink}
                  smooth
                  onClick={handleCloseNavMenu}
                  to={section.link}
                  sx={{
                    display: { xs: "block", md: "none" },
                    lineHeight: 1.5,
                    paddingTop: 0.75,
                    paddingBottom: 0.75,
                    paddingLeft: 2,
                    paddingRight: 2,
                    textAlign: "center",
                    minWidth: "10em",
                  }}
                >
                  {section.label}
                </Button>
              ))}
              {pages.map((page) => (
                <Button
                  key={page.link}
                  component={NavLink}
                  onClick={handleCloseNavMenu}
                  to={page.link}
                  sx={{
                    display: { xs: "block", md: "none" },
                    lineHeight: 1.5,
                    paddingTop: 0.75,
                    paddingBottom: 0.75,
                    paddingLeft: 2,
                    paddingRight: 2,
                    textAlign: "center",
                  }}
                >
                  {page.label}
                </Button>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              fontSize: "1.5em",
              letterSpacing: "-0.1em",
              marginRight: "2rem",
            }}
          >
            PARCELME
          </Typography>

          <Box
            className="nav-links"
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {sections.map((page) => (
              <Button key={page.link} onClick={handleCloseNavMenu} component={HashLink} smooth to={page.link} sx={{ fontSize: "1em" }}>
                {page.label}
              </Button>
            ))}
            {pages.map((page) => (
              <Button key={page.link} onClick={handleCloseNavMenu} component={NavLink} to={page.link} sx={{ fontSize: "1em" }}>
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account Information" placement="left">
              <Icon icon="fa-regular:user" width="20" className="user-icon" onClick={handleOpenUserMenu} />
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{
                display: { xs: "block", md: "block" },
              }}
            >
              {settings.map((setting) => (
                <Button
                  key={setting.link}
                  component={NavLink}
                  to={setting.link}
                  onClick={handleCloseUserMenu}
                  sx={{
                    display: { xs: "block" },
                    lineHeight: 1.5,
                    paddingTop: 0.75,
                    paddingBottom: 0.75,
                    paddingLeft: 2,
                    paddingRight: 2,
                    textAlign: "center",
                    minWidth: "10em",
                  }}
                >
                  {setting.label}
                </Button>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
