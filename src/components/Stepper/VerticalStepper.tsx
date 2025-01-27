import React, { FC, useEffect, useRef, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
  TextField,
  Avatar,
} from "@mui/material";
import {
  getPlace,
  getUserAvatar,
  getUserGamePass,
  postUserName,
} from "../../api/users";
import Popup from "../PopupComponent/PopupComponent";
import { useNavigate } from "react-router-dom";
import RobuxIcon from "../../assets/icons/RobuxIcon";
interface verticalStepperProps {
  isStepperOpen?: boolean;
  setIsStepperOpen?: any;
  selectedPrice?: number;
}
const VerticalStepper: FC<verticalStepperProps> = ({
  isStepperOpen,
  setIsStepperOpen,
  selectedPrice,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [serverError, setServerError] = useState("");
  const [avatar, setAvatar] = useState<string | null>();
  const [placeName, setPlaceName] = useState("");
  const [placeID, setPlaceID] = useState();
  const [robux, setRobux] = useState(0);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const savedRobux = localStorage.getItem("robux");
  const navigate = useNavigate();
  useEffect(() => {
    if (!savedRobux) {
      navigate("/");
    }
  });

  // useEffect(() => {
  //   const handleClick = (event: MouseEvent) => {
  //     if (
  //       popupRef.current &&
  //       !popupRef.current.contains(event.target as Node)
  //     ) {
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClick);

  //   // Удаляем слушатель при размонтировании
  //   return () => {
  //     document.removeEventListener("mousedown", handleClick);
  //   };
  // }, [setIsStepperOpen]);

  const handleNicknameSubmit = async () => {
    setNicknameError("");
    setServerError("");

    try {
      const response = await postUserName({ usernames: [nickname] });
      console.log("Response from server:", response.data);

      const userID = response.data?.[0]?.id;
      if (!userID) {
        console.error("No user ID found in the response");
        setServerError("Не удалось получить ID пользователя.");
        return;
      }

      try {
        const req = await getPlace(userID);
        const avatarResponse = await getUserAvatar(userID);
        if (avatarResponse[0].imageUrl) {
          setAvatar(avatarResponse[0].imageUrl);
        } else {
          console.error("Avatar image URL not found");
          setServerError("Не удалось загрузить аватар.");
        }

        if (req?.[0]?.id) {
          console.log("User place ID:", req[0]);
          setPlaceName(req?.[0].name);
          setPlaceID(req?.[0].id);
          await handleNext();
        } else {
          console.error("No user place found in the response");
          setServerError("Не удалось получить информацию о месте.");
        }
      } catch (placeError) {
        console.error("Error fetching user place:", placeError);
        setServerError("Не удалось получить информацию о месте.");
      }
    } catch (error: any) {
      console.error("API error:", error);
      setServerError("Произошла ошибка при отправке данных. Попробуйте снова.");
    }
  };

  const handleGamePassSubmit = async () => {
    try {
      if (!placeID) {
        console.error("Place ID is not set");
        return;
      }

      const req = await getUserGamePass(placeID);
      console.log(req, "req");

      if (!req || req.length === 0) {
        console.error("No game passes found for the given place ID.");
        return;
      }

      const price = req.filter((el: any) => el?.price === Number(savedRobux));
      console.log(price, "price");
      setRobux(price);
      console.log(savedRobux, "saved");
      console.log(price, "price");

      if (!price || price.length === 0) {
        console.error("Selected price not found in the game passes.");
        setServerError("Выбранная цена не найдена. Попробуйте снова.");
        return;
      }

      await handleNext();
    } catch (placeError) {
      console.error("Error fetching game pass data:", placeError);
      setServerError(
        "Произошла ошибка при получении данных. Попробуйте снова."
      );
    }
  };
  console.log(open, "openn");
  const handlePopupOpen = () => {
    setOpen(true);
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
      "& input": {
        color: "white",
        backgroundColor: "black",
      },
    },
    "& .MuiInputLabel-root": {
      color: "gray",
    },
    "& .MuiInputBase-input": {
      color: "red",
    },
  };

  return (
    <div
      ref={popupRef}
      style={{
        width: "100vw",
        height: "100%",
        backgroundColor: "rgb(184, 134, 11)",
        zIndex: 1300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
                sx={{
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
                  "& input": {
                    color: "white",
                    backgroundColor: "black",
                    fontSize: "16px",
                    caretColor: "white",
                  },
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 100px black inset",
                    WebkitTextFillColor: "white",
                    caretColor: "white",
                    backgroundColor: "black !important",
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray",
                  },
                }}
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
            <StepLabel sx={{ color: "white" }}>
              <Typography sx={{ color: "white" }}> Place</Typography>
            </StepLabel>
            <StepContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Box
                  sx={{
                    border: "1px solid rgb(184, 134, 11)",
                    padding: "10px",
                    margin: "20px",
                    marginLeft: "0px",
                    display: "flex",
                    gap: "20px",
                    borderRadius: "20px",
                    width: "fit-content",
                  }}
                >
                  <Avatar src={avatar ? avatar : ""} alt="avatar" />
                  <Box>
                    <Typography color="#ffffff">{placeName}</Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  onClick={handleNicknameSubmit}
                  sx={{
                    background: "rgb(184, 134, 11)",
                    color: "white",
                    alignSelf: "flex-start",
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
              </Box>
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
                href={`https://create.roblox.com/dashboard/creations/experiences/${placeID}/passes/create`}
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
                onClick={handleGamePassSubmit}
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
                Подтверждение заказа
              </Typography>
            </StepLabel>
            <StepContent
              sx={{
                display: "flex",
              }}
            >
              <Typography
                fontSize="small"
                textAlign="start"
                mt="40px"
                color="grey"
              >
                Проверьте детали вашего заказа и нажмите оплатить доставку
                робуксов занимает 5-7 дней
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Box
                  sx={{
                    border: "1px solid rgb(184, 134, 11)",
                    padding: "10px",
                    margin: "20px",
                    marginLeft: "0px",
                    display: "flex",
                    gap: "20px",
                    borderRadius: "20px",
                    width: "fit-content",
                  }}
                >
                  <Avatar src={avatar ? avatar : ""} alt="avatar" />
                  <Box>
                    <Typography color="#ffffff">{placeName}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "5px" }}>
                <Typography textAlign="start" fontSize="small" color="grey">
                  к покупке {savedRobux}
                </Typography>
                <RobuxIcon />
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={handlePopupOpen}
                sx={{
                  mt: 2,
                  borderRadius: "20px",
                  backgroundColor: "rgb(184, 134, 11)",
                  "&:hover": {
                    backgroundColor: "rgb(184, 134, 11)",
                  },
                }}
              >
                Оплатить
              </Button>
              <Popup
                open={open}
                onClose={() => setOpen(false)}
                title="Example Popup"
                actions={
                  <>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => alert("Action performed")}>
                      Confirm
                    </Button>
                  </>
                }
              >
                <p>This is the content of the popup.</p>
              </Popup>
            </StepContent>
          </Step>
        </Stepper>
      </Box>
    </div>
  );
};

export default VerticalStepper;
