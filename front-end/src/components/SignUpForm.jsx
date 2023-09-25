import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Icon } from "@iconify/react";
import Logo from "../assets/logo.png";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

export default function SignUpForm() {
  const [error, setError] = useState("");
  const [submitResult, setSubmitResult] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false); // Add state for redirection

  const [result, setResult] = React.useState('');
  const { currentUser, handleUpdateUser } = useUserContext();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    const userFirstName = data.get("firstName");
    const userLastName = data.get("lastName");
    const userPassword = data.get("password");
    const userEmail = data.get("email");
    const userPhoneNumber = data.get("phoneNumber");
    const userDateOfBirth = data.get("dateOfBirth")
  
    if (userPassword.length < 6) {
      setError("Password must be at least 6 characters long");
    } else if (userPassword === userEmail) {
      setError("Password cannot be the same as your email address");
    } else if (!/^[A-Za-z]+$/i.test(userFirstName)) {
      setError("Invalid first name");
    } else if (!/^[A-Za-z]+$/i.test(userLastName)) {
      setError("Invalid last name");
    } else if (!/^[0-9]+$/.test(userPhoneNumber)) {
      setError("Phone Number must contain only numbers");
    } else if (!/^[0-9]+$/.test(userDateOfBirth)) {
      setError("Date of Birth must contain only numbers");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(userEmail)) {
      setError("Invalid email address");
    } else {
      setError("");
  
      // convert form data to object and post to the backend
      axios
        .post("http://localhost:8000/api/users/register", Object.fromEntries(data.entries()))
        .then((response) => {
          let result = response.data.result;
          let user = response.data.data;
          console.log(user);
  
          setResult(result);
          if (user) {
            handleUpdateUser(user);
            setSubmitResult("Welcome to the family!");

            // Delay redirection after 5 seconds
            setTimeout(() => {
              setRedirect(true);
            }, 5000);
          }
        })
        .catch((error) => {
          console.log(error);
          setResult("There has been an error");
        });
    }
  };

  // Use useEffect to handle the redirection
  useEffect(() => {
    if (redirect) {
      navigate("/login");
    }
  }, [redirect]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box className="banner-content" id="second-banner-top">
        <Box className="banner-section-box">
          <Box className="banner-section-heading">
            <Typography variant="h4" className="breakline">
              —
            </Typography>
            <Typography
              gutterBottom
              variant="h4"
              id="banner-main-header"
              sx={{ letterSpacing: -5 }}
            >
              JOINING THE FAMILY?
            </Typography>
            <Typography variant="subtitle1" id="banner-main-subtitle">
              Let's be friends!
            </Typography>
            <Typography variant="h4" className="breakline">
              —
            </Typography>
          </Box>
        </Box>
      </Box>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container
          component="main"
          maxWidth="sm"
          sx={{ paddingBottom: "10em" }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="logo-container">
              <Icon
                icon="solar:box-bold-duotone"
                height="41"
                className="icon-parcel"
              />
              <img src={Logo} alt="Logo" className="login-logo" />
            </div>
            <Typography variant="body2" sx={{ fontWeight: 300, textAlign: "center" }}>
              Please fill out your details below to join the party!
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3, pr:"1em"}}
            >
              <Typography variant="body2" color="error">
                {error}
              </Typography>{" "}
              <Typography variant="body2" color="success">
                {submitResult}
              </Typography>
              <br />

              <Grid container spacing={2} sx={{ paddingRight: "1em"}}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="filled" fullWidth>
                    <InputLabel htmlFor="password" required>
                      Password
                    </InputLabel>
                    <FilledInput
                      id="password"
                      name="password"
                      autoComplete="password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="dateOfBirth"
                    label="DD-MM-YYYY"
                    id="dateOfBirth"
                    format="DD-MM-YYYY"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="phone-number"
                  />
                </Grid>

                <Grid item xs={12} sx={{ textAlign: "left" }}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label={
                      <Typography sx={{ fontSize: "0.7em" }}>
                        I want to receive inspiration, marketing promotions and
                        updates via email.
                      </Typography>
                    }
                  />
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  margin: "3em 0.3em 3em 1.5em",
                  backgroundColor: "#D2B356",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "#D2B356",
                    border: "none",
                  },
                }}
              >
                Sign Up
              </Button>
              </Grid>
              

              <Box
                display="flex"
                justifyContent="center"
                sx={{ marginBottom: "4.7em" }}
              >
                <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
                  <Link href="/signup" variant="body2">
                    Already have an account? Log in HERE!
                  </Link>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Container>
      </LocalizationProvider>
    </Box>
  );
}
