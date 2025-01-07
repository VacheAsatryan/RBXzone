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
import { useState } from "react";

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
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
        <Typography
          variant="h6"
          fontStyle="italic"
          color="rgb(184, 134, 11)"
          sx={{
            fontWeight: "bold",

            transition: "transform 0.4s",
            "&:hover": {
              transform: "scale(1.3)",
            },
          }}
          className="hover:text-[rgb(184, 134, 11)]"
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
                  color: isActiveTab("/") ? "rgb(184, 134, 11)" : "#A8A8A8A8",
                  fontWeight: "bold",
                }}
                className="hover:text-gray-400"
              >
                Купить Робуксы
              </Button>
            </Link>
            <Button
              sx={{
                color: isActiveTab("/") ? "rgb(184, 134, 11)" : "#A8A8A8A8",
                fontWeight: "bold",
              }}
              className="hover:text-gray-400"
              onClick={() => handleScroll("footer")}
            >
              Помощь
            </Button>
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
