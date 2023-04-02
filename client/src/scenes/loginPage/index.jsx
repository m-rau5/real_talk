import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
          // p="0rem 2rem 0rem 0rem"
        >
          RealTalk
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreen ? "50%" : "90%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: "1.5rem" }}
          textAlign="center"
        >
          Welcome to Real Talk!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
