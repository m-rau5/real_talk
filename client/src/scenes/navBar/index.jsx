import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
//Button Icons import
import { DarkMode, LightMode, Menu, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const NavBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)"); //@m-ui checks if screen is mobile or not
  const theme = useTheme();
  const neutralLightMode = theme.palette.neutral.light;
  const darkMode = theme.palette.neutral.dark;
  const backgroundTheme = theme.palette.background.default;
  const primaryLightMode = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;
  //const fullName = "Johnathan Joestar";

  //navigation bar box component css + navbar widgets
  return (
    <FlexBetween padding="1rem 5%" backgroundColor={alt}>
      <FlexBetween gap="12.75 rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem,2rem,2.25rem)"
          color="primary"
          p="0rem 2rem 0rem 0rem"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLightMode,
              cursor: "pointer",
            },
          }}
        >
          RealTalk
        </Typography>
      </FlexBetween>

      {/* Desktop Menu */}
      {isNonMobileScreen ? (
        //  Buttons/drop-down menu
        <FlexBetween gap="1.8rem">
          {/* Light/dark mode switch */}
          <IconButton onClick={() => dispatch(setMode())}>
            {/* Calling setMode from states/index.js to check theme mode */}
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: darkMode, fontSize: "25px" }} />
            )}
          </IconButton>
          {/* <Person
            sx={{ fontSize: "25px" }}
            onClick={() => navigate(`/profile/${userId}`)}
          /> */}
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLightMode,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  //arrow for the selection box
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLightMode,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography noWrap>{fullName}</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/");
                  dispatch(setLogout());
                }}
              >
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* Mobile */}
      {!isNonMobileScreen && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="200px"
          backgroundColor={backgroundTheme}
        >
          {/* Close icon */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>
          {/* Mobile Menu */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="2.3rem"
          >
            {/* Light/dark mode switch */}
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {/* Calling setMode from states/index.js */}
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: darkMode, fontSize: "25px" }} />
              )}
            </IconButton>
            {/* <Person
              sx={{ fontSize: "25px" }}
              onClick={() => navigate(`/profile/${userId}`)}
            /> */}
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLightMode,
                  width: "125px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLightMode,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography noWrap>{fullName}</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/");
                    dispatch(setLogout());
                  }}
                >
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default NavBar;
