import React, { useState } from "react";
import { auth_request } from "../../utils/Service";
import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
export default function ForgetPassword() {
  const navigate = useNavigate();
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 380,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [success, setSuccess] = useState(false);
  const onClickReset = () => {
    auth_request(
      "post",
      "/api/auth/user/forgotpassword",
      { email },
      ({ data }) => {
        setSuccess(data.message);
      },
      console.log
    );
  };
  const [email, setEmail] = useState();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      width={isMatch ? 19 / 20 : 2 / 5}
      sx={{
        minHeight: 17 / 20,
        border: "1px solid red",
        borderColor: "primary.outline",
        padding: 1,
        margin: "0 auto",
      }}
    >
      <Modal
        open={success}
        onClose={() => setSuccess(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            color="text.primary"
          >
            {success}
          </Typography>
        </Box>
      </Modal>
      <Typography
        variant="h4"
        sx={{ mb: 2, fontWeight: "700" }}
        color="text.primary"
      >
        Reset Password
      </Typography>
      <Typography variant="body1" color="text.primary">
        Enter your email to get password reset mail.
      </Typography>

      <Box
        alignSelf="center"
        width={isMatch ? 8 / 10 : 1 / 2}
        sx={{
          display: "flex",
          alignItems: "flex-end",
          margin: "2vh auto",
        }}
      >
        <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="input-with-sx"
          sx={{ width: 1 }}
          label="Email"
          variant="standard"
        />
      </Box>

      <Button
        variant="text"
        onClick={() => {
          navigate("/login");
        }}
      >
        Back to Login
      </Button>
      <Button
        onClick={onClickReset}
        variant="contained"
        sx={{
          backgroundColor: "primary.shade1",
          margin: "2vh",
          ".MuiButton-contained:hover": {
            color: "#FFF",
          },
        }}
      >
        Reset Password
      </Button>
    </Grid>
  );
}
