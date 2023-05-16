import { Link } from "react-router-dom";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./../../../redux/hooks";

export default function NavGuest(params: any) {
  const navigate = useNavigate();

  const getNumberOfProductsInCart = useAppSelector(
    (state) => state.cart.listCart.length
  );

  const pages = [
    {
      pageURL: "/",
      pageName: "Home",
    },
  ];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClickMenu = (url: string) => {
    setAnchorElNav(null);
    navigate(url, { replace: true });
  };
  return (
    <AppBar position="static" sx={{ background: "#f6f6f6" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#146C94",
                textDecoration: "none",
              }}
            >
              NShopper
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
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
              {pages.map((page) => (
                <MenuItem
                  key={page.pageName}
                  onClick={() => handleClickMenu(page.pageURL)}
                >
                  <Typography textAlign="center">{page.pageName}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#146C94",
                textDecoration: "none",
              }}
            >
              NShopper
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.pageName}
                onClick={() => handleClickMenu(page.pageURL)}
                sx={{ my: 2, color: "#146C94", display: "block" }}
              >
                {page.pageName}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  mt: "0px",
                  mb: "0px",
                  pb: "0px",
                  color: "#146C94",
                  display: "block",
                }}
              >
                <LoginIcon />
              </Button>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Link to="#" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  pt: "3px",
                  color: "#146C94",
                  display: "block",
                }}
              >
                <Badge color="primary" badgeContent={getNumberOfProductsInCart}>
                  <ShoppingBasketIcon />
                </Badge>
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
