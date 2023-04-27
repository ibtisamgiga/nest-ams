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
import { siginIn } from "../redux/login/userAction";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../utils/localStorageHelper";
import { useState } from "react";
const theme = createTheme();

export default function LoginPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const response = useSelector((state) => state.userData);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      siginIn({
        email: data.get("email"),
        password: data.get("password"),
      })
    );
  };
  React.useEffect(() => {
    if (response.error) {
      console.log(response,'res')
      setError(response.error);
      // navigate(0);
    }
     else {
      setError("");
     //navigate("/");
      //   // navigate(0);
    }
  }, [response]);

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
              onSubmit={handleSubmit}
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
                <Typography variant="p">Welcome Back!</Typography>
                <Typography sx={{ fontSize: "10px", marginTop: "-10px" }}>
                  {"\n"}
                </Typography>
                <Typography
                  variant="p"
                  sx={{ fontSize: "10px", color: "#a5a5a5" }}
                >
                  Enter Your Credentials to Acess Your Account
                </Typography>

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
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Enter Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                />
                <div className="error">{error}</div>
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
                  Sign In
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
