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
import RobuxIcon from "../../assets/icons/RobuxIcon";
import VerticalStepper from "../Stepper/VerticalStepper";

const calculateRobux = (rublu: number): number => {
  return Math.floor(rublu * 1.35);
};

const calculateRubluFromRobux = (robux: number): number => {
  return Math.floor(robux / 1.35);
};

const PaymentComponent: React.FC = () => {
  const isMobile = useIsMobile();
  const [rublu, setRublu] = useState<string>("");
  const [robux, setRobux] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isStepperOpen, setIsStepperOpen] = useState<boolean>(false);

  const handleRubluChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRublu(value);

    if (!value || isNaN(parseFloat(value))) {
      setRobux("");
      setIsDisabled(true);
    } else {
      const numericValue = parseFloat(value);
      setRobux(calculateRobux(numericValue).toString());
      setIsDisabled(numericValue < 100);
    }
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const value = newValue as number;
    setRublu(value.toString());
    setRobux(calculateRobux(value).toString());
    setIsDisabled(value < 100);
  };

  const handleRobuxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRobux(value);

    if (!value || isNaN(parseFloat(value))) {
      setRublu("");
      setIsDisabled(true);
    } else {
      const numericValue = parseFloat(value);
      setRublu(calculateRubluFromRobux(numericValue).toString());
      setIsDisabled(numericValue < 100);
    }
  };

  const handleBuyClick = () => {
    if (!isDisabled) {
      setIsStepperOpen(true);
    }
  };

  return (
    <Box
      sx={{
        width: isMobile ? "100%" : "37%",
        bgcolor: "black",
        padding: 4,
        borderRadius: 2,
        boxShadow: "rgba(168, 168, 168, 0.66) 0px 1px 4px",
        marginTop: "20px",
      }}
    >
      <Typography color="snow" variant="h6" sx={{ mb: 2 }}>
        Ты платишь
      </Typography>
      <TextField
        label="Введите сумму в рублях"
        variant="outlined"
        fullWidth
        type="text"
        value={rublu}
        onChange={handleRubluChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">₽</InputAdornment>,
          style: { color: "snow" },
        }}
        InputLabelProps={{
          style: { color: "snow" },
        }}
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgb(184, 134, 11)",
              outline: "red",
            },
            "&:hover fieldset": {
              borderColor: "rgb(184, 134, 11)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "rgb(184, 134, 11)",
            },
          },
        }}
      />

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button
          variant="outlined"
          onClick={() => handleRubluChange({ target: { value: "500" } } as any)}
          sx={{
            flex: 1,
            borderColor: "rgb(184, 134, 11)",
            color: "snow",
          }}
        >
          500₽
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            handleRubluChange({ target: { value: "1000" } } as any)
          }
          sx={{
            flex: 1,
            borderColor: "rgb(184, 134, 11)",
            color: "snow",
          }}
        >
          1000₽
        </Button>
      </Box>

      <Typography color="snow" variant="h6" sx={{ mb: 2 }}>
        Ты получаешь
      </Typography>

      <TextField
        label="Введите сумму в Robux"
        variant="outlined"
        fullWidth
        type="text"
        value={robux}
        onChange={handleRobuxChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
          style: { color: "snow" },
        }}
        InputLabelProps={{
          style: { color: "snow" },
        }}
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgb(184, 134, 11)",
              outline: "red",
            },
            "&:hover fieldset": {
              borderColor: "rgb(184, 134, 11)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "rgb(184, 134, 11)",
            },
          },
        }}
      />

      <Slider
        value={parseFloat(rublu) || 100}
        min={100}
        max={10000}
        step={10}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value} ₽`}
        sx={{
          mb: 2,
          width: "100%",
          color: "yellow", // Основной цвет слайдера
          "& .MuiSlider-thumb": {
            backgroundColor: "rgb(184, 134, 11)", // Цвет кружка (ползунка)
          },
          "& .MuiSlider-track": {
            backgroundColor: "rgb(184, 134, 11)", // Цвет линии, пройденной слайдером
          },
          "& .MuiSlider-rail": {
            backgroundColor: "rgb(184, 134, 11)", // Цвет задней линии
          },
          "& .MuiSlider-valueLabel": {
            backgroundColor: "rgb(184, 134, 11)", // Цвет подсказки с меткой
          },
        }}
      />

      {/* <RobuxIcon /> */}
      <div className="bg-black">
        <Button
          variant="contained"
          sx={{
            background: "rgb(184, 134, 11)",
            color: "white",
            "&:hover": {
              background: "",
            },
            "&.Mui-disabled": {
              background: "#f7d06e",
              color: " #f2f2f2",
              opacity: "50",
            },
          }}
          color="primary"
          fullWidth
          disabled={isDisabled}
          onClick={handleBuyClick}
        >
          Купить Робоксы
        </Button>
      </div>

      {isStepperOpen && <VerticalStepper />}
    </Box>
  );
};

export default PaymentComponent;
