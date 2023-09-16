import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth_request } from "../../utils/Service";
import { useDispatch, useSelector } from "react-redux";
import { authKeySelector, setAuthKey } from "../../redux/authReducer";
import GoogleAuth from "../GoogleAuth";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import {
  AccountCircle,
  LockOpen,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

export default function Login() {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const verifyProfileToken = useSelector(authKeySelector("verifyProfileToken"));

  const clickLogin = () => {
    if (!email) {
      setSuccess("Please enter email");
      return;
    }
    if (!password) {
      setSuccess("Please enter password");
      return;
    }
    auth_request(
      "post",
      "/api/auth/user/login",
      { email, password },
      ({ data }) => {
        console.log(data);
        if (!data.success) {
          setSuccess(data.message);
          return;
        }
        for (const key in data.userData) {
          const value = data[key];
          dispatch(setAuthKey([key, value]));
        }
        navigate(`/dashboard/`);
      },
      console.log
    );
  };

  useEffect(() => {
    if (verifyProfileToken) navigate("/signup");
  }, [verifyProfileToken, navigate]);

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
        Log in
      </Typography>
      <Typography variant="body1" color="text.primary">
        Welcome back!
      </Typography>
      <Typography variant="body1" color="text.primary">
        Sign in to access your account.
      </Typography>
      <GoogleAuth />
      <Typography variant="body1" color="text.primary">
        OR
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

      <Box
        alignSelf="center"
        width={isMatch ? 8 / 10 : 1 / 2}
        sx={{
          display: "flex",
          alignItems: "flex-end",
          margin: "1vh auto",
        }}
      >
        <LockOpen sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="input-with-sx"
          sx={{ width: 1 }}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="Password"
          variant="standard"
        />
      </Box>
      <Button
        variant="text"
        onClick={() => {
          navigate("/forgetpassword");
        }}
      >
        Forget Password?
      </Button>
      <Button
        onClick={clickLogin}
        variant="contained"
        sx={{
          backgroundColor: "primary.shade1",
          margin: "2vh",
          ".MuiButton-contained:hover": {
            color: "#FFF",
          },
        }}
      >
        Log in
      </Button>
    </Grid>
  );
}
