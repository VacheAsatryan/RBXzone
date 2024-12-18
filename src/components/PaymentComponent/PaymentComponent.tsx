import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Slider,
  InputAdornment,
} from "@mui/material";
import useIsMobile from "../../hooks/useIsMobile";

const calculateRobux = (rublu: number): number => {
  // Примерный алгоритм для расчета Robux (1 рубль = 1.35 Robux)
  return Math.floor(rublu * 1.35); // Формула для конвертации
};

const PaymentComponent: React.FC = () => {
  const isMobile = useIsMobile();
  const [rublu, setRublu] = useState(0);
  const [robux, setRobux] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  // Обработчик для изменения суммы в рублях с текстового поля
  const handleRubluChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setRublu(value);
    setRobux(calculateRobux(value));
    setIsDisabled(value < 100); // Кнопка становится неактивной, если меньше 100
  };

  // Обработчик для изменения суммы слайдера
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const value = newValue as number;
    setRublu(value);
    setRobux(calculateRobux(value));
    setIsDisabled(value < 100); // Кнопка становится неактивной, если меньше 100
  };

  return (
    <Box
      sx={{
        width: isMobile ? "100%" : "27%",
        bgcolor: "#f4f4f4",
        padding: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Ты платишь
      </Typography>
      <TextField
        label="Введите сумму в рублях"
        variant="outlined"
        fullWidth
        type="number"
        value={rublu}
        onChange={handleRubluChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">₽</InputAdornment>,
        }}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button
          variant="outlined"
          onClick={() => setRublu(500)}
          sx={{ flex: 1 }}
        >
          500₽
        </Button>
        <Button
          variant="outlined"
          onClick={() => setRublu(1000)}
          sx={{ flex: 1 }}
        >
          1000₽
        </Button>
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Ты получаешь
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {robux} Robux
      </Typography>

      {/* Слайдер для изменения суммы */}
      <Slider
        value={rublu}
        min={100} // Минимальное значение 100
        max={10000} // Максимальное значение 10000
        step={10}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value} ₽`}
        sx={{ mb: 2, width: "100%" }}
      />

      <Typography variant="body2" sx={{ mb: 2 }}>
        Доступно: 500 000 ₽
      </Typography>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={isDisabled}
      >
        Купить Робоксы
      </Button>
    </Box>
  );
};

export default PaymentComponent;
