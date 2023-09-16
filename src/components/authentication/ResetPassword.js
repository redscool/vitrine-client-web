import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { auth_request } from "../../utils/Service";
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
import { LockOpen, Visibility, VisibilityOff } from "@mui/icons-material";
export default function ResetPassword() {
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
  const { token } = useParams();
  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const onClickReset = () => {
    if (password !== cpassword) {
      setSuccess("Password didn't match");
      return;
    }
    auth_request(
      "post",
      "/api/auth/user/resetpassword",
      { token, password },
      ({ data }) => {
        setSuccess(data.message);
        localStorage.removeItem("accessToken");
        console.log(data);
      },
      console.log
    );
  };
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
        Reset Your Password
      </Typography>
      <Typography variant="body1" color="text.primary">
        Create a password.
      </Typography>

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
          onChange={(e) => setCpassword(e.target.value)}
          value={cpassword}
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
          label="Confirm Password"
          variant="standard"
        />
      </Box>

      <Button
        onClick={onClickReset}
        variant="contained"
        sx={{
          backgroundColor: "primary.shade1",
          margin: "2vh",
        }}
      >
        Change Password
      </Button>
    </Grid>
  );
}
