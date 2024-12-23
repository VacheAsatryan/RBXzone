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
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        }}
      />

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button
          variant="outlined"
          onClick={() => handleRubluChange({ target: { value: "500" } } as any)}
          sx={{ flex: 1 }}
        >
          500₽
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            handleRubluChange({ target: { value: "1000" } } as any)
          }
          sx={{ flex: 1 }}
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
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
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
        sx={{ mb: 2, width: "100%" }}
      />

      <Typography color="snow" variant="body2" sx={{ mb: 2 }}>
        Доступно: 500 000 ₽
      </Typography>
      <RobuxIcon />
      <div className="bg-black">
        <Button
          variant="contained"
          sx={{
            background:
              "linear-gradient(45deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
            color: "white",
            "&:hover": {
              background:
                "linear-gradient(45deg, rgba(253,187,45,1) 0%, rgba(34,193,195,1) 100%)",
            },
            "&.Mui-disabled": {
              background: "rgba(0, 0, 255, 0.5)",
              color: "rgba(255, 255, 255, 0.7)",
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
