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
import { useLocation, Link } from "react-router-dom"; // Используем Link для маршрутизации
import useIsMobile from "../../hooks/useIsMobile"; // Хук для мобильных устройств

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Используем хук для проверки мобильного устройства
  const isMobile = useIsMobile();

  // Получаем текущий маршрут с помощью useLocation
  const location = useLocation();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  // Функция для проверки активного таба
  const isActiveTab = (tab: string) => {
    return (
      location.pathname === tab || (tab === "/" && location.pathname === "/")
    );
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
      <Toolbar className="flex justify-between items-center">
        {/* Логотип */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "white" }}
          className="hover:text-gray-400"
        >
          RBXZone
        </Typography>

        {/* Кнопки для мобильных устройств */}
        {isMobile ? (
          <IconButton edge="end" color="inherit" onClick={handleMenuClick}>
            <span className="text-white">☰</span>
          </IconButton>
        ) : (
          <div className="flex space-x-6">
            <Link to="/">
              <Button
                sx={{
                  color: isActiveTab("/") ? "red" : "white",
                  fontWeight: "bold",
                }}
                className={`hover:text-gray-400 ${
                  isActiveTab("/") ? "text-red-500" : ""
                }`}
              >
                Купить Робуксы
              </Button>
            </Link>
            <Link to="/pomosh">
              <Button
                sx={{
                  color: isActiveTab("/pomosh") ? "red" : "white",
                  fontWeight: "bold",
                }}
                className={`hover:text-gray-400 ${
                  isActiveTab("/pomosh") ? "text-red-500" : ""
                }`}
              >
                Помощь
              </Button>
            </Link>
          </div>
        )}

        {/* Меню для мобильных устройств */}
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
