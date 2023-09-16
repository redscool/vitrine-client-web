import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { auth_request } from "../../utils/Service";
import { authKeySelector, setAuthKey } from "../../redux/authReducer";
import {
  Button,
  Box,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  Select,
  useMediaQuery,
  IconButton,
  Modal,
} from "@mui/material";
import {
  AccountCircle,
  LockOpen,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import GoogleAuth from "../GoogleAuth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem("refreshToken");
  useEffect(() => {
    if (refreshToken) navigate("/dashboard");
  });
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
  const dispatch = useDispatch();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const verifyProfileToken = useSelector(authKeySelector("verifyProfileToken"));
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [success, setSuccess] = useState(
    verifyProfileToken ? "Please select a role to continue" : false
  );
  const [showPassword, setShowPassword] = useState(false);
  const googleSignup = () => {
    if (!type) {
      alert("Please Select a type");
      return;
    }
    console.log(type);
    const body = { verifyProfileToken, type };
    auth_request(
      "post",
      "/api/auth/user/verifyProfile",
      body,
      ({ data }) => {
        for (const key in data) {
          const value = data[key];
          dispatch(setAuthKey([key, value]));
        }
        console.log(data);
        navigate("/dashboard");
      },
      console.log
    );
  };

  const signupHandleClick = () => {
    if (!email) {
      setSuccess("Enter a valid e-mail.");
      return;
    }
    if (!password) {
      setSuccess("Please enter password.");
      return;
    }
    if (!cpassword) {
      setSuccess("Please confirm your password.");
      return;
    }
    if (password !== cpassword) {
      setSuccess("Password didn't match");
      return;
    }
    if (!type) {
      setSuccess("Please Select a type");
      return;
    }
    console.log(type);
    const body = { email, password, type };
    auth_request(
      "post",
      "/api/auth/user/signup",
      body,
      (res) => {
        setSuccess(res.data.message);
        console.log(res.data);
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
        Sign up
      </Typography>
      <Typography variant="body1" color="text.primary">
        Create an account to access all the content.
      </Typography>
      <GoogleAuth />
      <Typography variant="body1" color="text.primary">
        OR
      </Typography>
      {!verifyProfileToken ? (
        <>
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
        </>
      ) : null}
      <FormControl sx={{ margin: "2vh 0", minWidth: 120 }}>
        <InputLabel
          id="demo-multiple-name-label"
          sx={{ color: "text.primary" }}
        >
          User Type
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={type}
          label="Type"
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="PROVIDER">Provider</MenuItem>
          <MenuItem value="CONSUMER">Consumer</MenuItem>
        </Select>
      </FormControl>

      <Button
        onClick={verifyProfileToken ? googleSignup : signupHandleClick}
        variant="contained"
        sx={{
          backgroundColor: "primary.shade1",
          margin: "2vh",
          ".MuiButton-contained:hover": {
            color: "#FFF",
          },
        }}
      >
        Sign up
      </Button>
    </Grid>
  );
}
