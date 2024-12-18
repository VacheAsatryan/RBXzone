import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const isMobile = useIsMobile();

  const location = useLocation();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const isActiveTab = (tab: string) => {
    return (
      location.pathname === tab || (tab === "/" && location.pathname === "/")
    );
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "black",
        boxShadow: "0 1px 1px #A8A8A8A8",
      }}
    >
      <Toolbar className="flex justify-between items-center">
        {/* Логотип */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "white" }}
          className="hover:text-gray-400"
        >
          RBXZone
        </Typography>

        {isMobile ? (
          <IconButton edge="end" color="inherit" onClick={handleMenuClick}>
            <span className="text-white">☰</span>
          </IconButton>
        ) : (
          <div className="flex space-x-6">
            <Link to="/">
              <Button
                sx={{
                  color: isActiveTab("/") ? "#A8A8A8A8" : "white",
                  fontWeight: "bold",
                }}
                className={`hover:text-gray-400`}
              >
                Купить Робуксы
              </Button>
            </Link>
            <Link to="/pomosh">
              <Button
                sx={{
                  color: isActiveTab("/pomosh") ? "#A8A8A8A8" : "white",
                  fontWeight: "bold",
                }}
                className={`hover:text-gray-400 `}
              >
                Помощь
              </Button>
            </Link>
          </div>
        )}

        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          sx={{ color: "black" }}
        >
          <MenuItem
            onClick={() => handleMenuClose()}
            component={Link}
            to="/kupit-robuksy"
          >
            Купить Робуксы
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuClose()}
            component={Link}
            to="/pomosh"
          >
            Помощь
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
