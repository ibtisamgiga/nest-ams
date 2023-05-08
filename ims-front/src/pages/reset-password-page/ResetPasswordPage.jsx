import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { siginIn } from "../../redux/login/userAction";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../../utils/localStorageHelper";
import { useState } from "react";
import { resetPassword, sendOtp } from "../../redux/otp/otpAction";
import { EmailRounded } from "@mui/icons-material";
const theme = createTheme();

export default function ResetPasswordPage() {
  const [error, setError] = useState("");
  const body = {
    email: "",
    otp: "",
    password: "",
  };
  const [email, setEmail] = useState("");
  const [currentOtp, setCurrentOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const response = useSelector((state) => state.otpData);
  const otp = useSelector((state) => state.otpData.otp);
  const myerror = useSelector((state) => state.otpData.error);
  const newPassword = useSelector((state) => state.otpData.password);
  const passwordError = useSelector((state) => state.otpData.passwordError);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setEmail(data.get("email"));
    dispatch(sendOtp({ email: data.get("email") }));
  };
  const handleOtp = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setCurrentOtp(data.get("otp"));
    body.email = email;
    setIndex(2);
  };
  const handleSetPassword = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    body.otp = currentOtp;
    body.email = email;
    body.password = data.get("password");
    dispatch(resetPassword(body));
    
    console.log(body);
  };
  console.log(newPassword, "opt");
  console.log(passwordError, "error");
  React.useEffect(() => {
    if (otp) {
      setIndex(1);
      console.log("index:1");
    }
  }, [dispatch, response]);

  return (
    <div className="body">
      <ThemeProvider theme={theme}>
        <Container component="main">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10rem",
            }}
          >
            <img
              width="100px"
              height="100px"
              src="https://cdn.shopify.com/s/files/1/0578/3132/5740/files/ezgif.com-gif-maker_7.png?v=1654195199"
              alt="logo"
            />

            <Box
              component="form"
              onSubmit={
                index == 1
                  ? handleOtp
                  : index == 2
                  ? handleSetPassword
                  : handleSubmit
              }
              sx={{
                mt: 1,
                textAlign: "center",
                mt: "30px",
                alignContent: "center",
              }}
            >
              <Box
                sx={{
                  boxShadow: 5,
                  width: "100%",
                  p: 4,
                  m: 1,
                  borderRadius: 5,
                  textAlign: "center",
                  fontSize: "2rem",
                  fontWeight: "700",
                }}
              >
                {index == 1 ? (
                  <Typography variant="p">Verification Code</Typography>
                ) : index == 2 ? (
                  <Typography variant="p">Enter New Password</Typography>
                ) : (
                  <Typography variant="p">Forgot Password?</Typography>
                )}
                <Typography sx={{ fontSize: "10px", marginTop: "-10px" }}>
                  {"\n"}
                </Typography>
                <Typography
                  variant="p"
                  sx={{ fontSize: "10px", color: "#a5a5a5" }}
                >
                  Don't worry enetr your valid email
                </Typography>

                {index == 1 ? (
                  <TextField
                    margin="normal"
                    fullWidth
                    id="otp"
                    label="Enter otp"
                    name="otp"
                    autoComplete="otp"
                    autoFocus
                    required
                  />
                ) : index == 2 ? (
                  <TextField
                    margin="normal"
                    fullWidth
                    id="password"
                    label="Enter password"
                    name="password"
                    autoComplete="password"
                    autoFocus
                    required
                  />
                ) : (
                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Enter Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    required
                  />
                )}
                <div className="error">{myerror}</div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#2ab38e",
                    borderRadius: "12px",
                  }}
                >
                  Send verification code
                </Button>
              </Box>
              <Grid container>
                <Grid item xs>
                  Forget Your Password?
                  <Link href="#" variant="body2">
                    {" "}
                    Reset Password
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
