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

const VerticalStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [nickname, setNickname] = useState("");
  const [places, setPlaces] = useState(["Place 1", "Place 2", "Place 3"]);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [robuxAmount, setRobuxAmount] = useState(0);
  const [nicknameError, setNicknameError] = useState("");
  const [serverError, setServerError] = useState("");

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);

  return (
    <div className="w-full h-full absolute bg-black top-0 left-0 flex items-center justify-center z-20">
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          backgroundColor: "#333",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          color: "white",
        }}
      >
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>Введите Nickname</StepLabel>
            <StepContent>
              <TextField
                fullWidth
                label="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                error={!!nicknameError}
                helperText={nicknameError}
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              />
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!nickname}
                sx={{ mt: 2 }}
              >
                Далее
              </Button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Выберите место</StepLabel>
            <StepContent>
              <RadioGroup
                value={selectedPlace}
                onChange={(e) => setSelectedPlace(e.target.value)}
              >
                {places.map((place) => (
                  <FormControlLabel
                    key={place}
                    value={place}
                    control={<Radio />}
                    label={place}
                  />
                ))}
              </RadioGroup>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!selectedPlace}
                sx={{ mt: 2 }}
              >
                Далее
              </Button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Настройка Game Pass</StepLabel>
            <StepContent>
              <iframe
                src="https://www.youtube.com/embed/your-video-id"
                title="Game Pass Setup"
                width="100%"
                height="200"
                style={{ borderRadius: 8 }}
              />
              <Typography>
                После настройки перейдите на свой аккаунт Roblox.
              </Typography>
              <Button
                variant="contained"
                href="https://www.roblox.com/"
                target="_blank"
                sx={{ mt: 2 }}
              >
                Перейти в Roblox
              </Button>
              <Button variant="contained" onClick={handleNext} sx={{ mt: 2 }}>
                Далее
              </Button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Выберите количество Robux</StepLabel>
            <StepContent>
              <TextField
                fullWidth
                type="number"
                label="Количество Robux"
                value={robuxAmount}
                onChange={(e) => setRobuxAmount(Number(e.target.value))}
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              />
              <Typography color="error">{serverError}</Typography>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!robuxAmount}
                sx={{ mt: 2 }}
              >
                Купить
              </Button>
            </StepContent>
          </Step>

          {/* Шаг 5 */}
          <Step>
            <StepLabel>Оплатить</StepLabel>
            <StepContent>
              <Typography>Ваш Nickname: {nickname}</Typography>
              <Typography>Ваше место: {selectedPlace}</Typography>
              <Typography>Количество Robux: {robuxAmount}</Typography>
              <Button variant="contained" onClick={handleNext} sx={{ mt: 2 }}>
                Оплатить
              </Button>
            </StepContent>
          </Step>
        </Stepper>
      </Box>
    </div>
  );
};

export default VerticalStepper;