import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { postUserName } from "../../api/users";

const VerticalStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [nickname, setNickname] = useState("");
  const [robuxAmount, setRobuxAmount] = useState(0);
  const [nicknameError, setNicknameError] = useState("");
  const [serverError, setServerError] = useState("");

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);

  const handleNicknameSubmit = async () => {
    setNicknameError("");
    setServerError("");

    try {
      const response = await postUserName({ usernames: [nickname] });
      console.log("Response from server:", response);
      handleNext();
    } catch (error: any) {
      setServerError("Произошла ошибка при отправке данных. Попробуйте снова.");
      console.error("API error:", error);
    }
  };

  const commonInputStyles = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgb(184, 134, 11)",
      },
      "&:hover fieldset": {
        borderColor: "rgb(184, 134, 11)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgb(184, 134, 11)",
      },
    },
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgb(184, 134, 11)",
        zIndex: 1300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          backgroundColor: "black",
          padding: 2,
          borderRadius: 2,
          boxShadow: 3,
          color: "white",
          overflowY: "auto",
          maxHeight: "90vh",
        }}
      >
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{
            padding: "20px",
            "& .MuiStepIcon-root": {
              color: "rgb(184, 134, 11)",
            },
            "& .MuiStepIcon-root.Mui-active": {
              color: "rgb(184, 134, 11)",
            },
            "& .MuiStepIcon-root.Mui-completed": {
              color: "rgb(184, 134, 11)",
            },
          }}
        >
          <Step>
            <StepLabel sx={{ color: "white" }}>
              <Typography sx={{ color: "white" }}>Введите Nickname</Typography>
            </StepLabel>
            <StepContent>
              <TextField
                fullWidth
                label="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                error={!!nicknameError}
                helperText={nicknameError}
                sx={{ ...commonInputStyles, mt: 2 }}
              />
              <Typography fontSize="10px" sx={{ mb: 2, color: "red" }}>
                {serverError}
              </Typography>
              <Button
                variant="contained"
                onClick={handleNicknameSubmit}
                disabled={!nickname}
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
              >
                Далее
              </Button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <Typography sx={{ color: "white" }}>
                Настройка Game Pass
              </Typography>
            </StepLabel>
            <StepContent>
              <iframe
                src="https://www.youtube.com/embed/your-video-id"
                title="Game Pass Setup"
                width="100%"
                height="200"
                style={{ borderRadius: 8 }}
              />
              <Typography sx={{ color: "white" }}>
                После настройки перейдите на свой аккаунт Roblox.
              </Typography>
              <Button
                variant="contained"
                href="https://www.roblox.com/"
                target="_blank"
                sx={{
                  mt: 2,
                  mr: 2,
                  backgroundColor: "rgb(184, 134, 11)",
                  "&:hover": {
                    backgroundColor: "rgb(184, 134, 11)",
                  },
                }}
              >
                Перейти в Roblox
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  mt: 2,
                  backgroundColor: "rgb(184, 134, 11)",
                  "&:hover": {
                    backgroundColor: "rgb(184, 134, 11)",
                  },
                }}
              >
                Далее
              </Button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <Typography sx={{ color: "white" }}>
                Выберите количество Robux
              </Typography>
            </StepLabel>
            <StepContent>
              <TextField
                fullWidth
                type="number"
                label="Количество Robux"
                value={robuxAmount}
                onChange={(e) => setRobuxAmount(Number(e.target.value))}
                sx={{ ...commonInputStyles }}
              />
              <Typography sx={{ color: "white" }}>{serverError}</Typography>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!robuxAmount}
                sx={{
                  mt: 2,
                  backgroundColor: "rgb(184, 134, 11)",
                  "&:hover": {
                    backgroundColor: "rgb(184, 134, 11)",
                  },
                }}
              >
                Купить
              </Button>
            </StepContent>
          </Step>
        </Stepper>
      </Box>
    </div>
  );
};

export default VerticalStepper;
