import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";
import Logo from "../assets/logo.png";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import driveformpic from "../assets/driveformpic.jpeg";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { FormControl, FormHelperText, InputAdornment, OutlinedInput } from "@mui/material";
import bannerBg from "../assets/bannerImage.jpg";
import SizeInfoList from "./sizeInfoList";

export default function DriveForm() {
  const { currentUser } = useUserContext();

  const [error, setError] = useState("");
  const [submitResult, setSubmitResult] = useState("");
  const [availableSpace, setAvailableSpace] = useState([]);

  //defining the sizes for dropdown textfield
  let spaceSizes = ["Small", "Medium", "Large", "Extra Large"];

  //updating input field state
  const handleChange = (e) => {
    setAvailableSpace(e.target.value);
  };

  //handles the submission of a new trip
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitResult("");

    //getting input data from form
    const data = new FormData(e.currentTarget);
    data.append("userId", currentUser.id);

    try {
      //posting to database
      const response = await axios.post("/api/trips/register", Object.fromEntries(data.entries()));
      const result = response.data.result;
      const trip = response.data.data;

      if (trip) {
        setError("");
        setSubmitResult(result);
        //reset the form fields
        e.target.reset();
      }
    } catch (error) {
      setError(error.response.data.result);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box className="banner-content" id="second-banner-top" sx={{ width: "100%", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundImage: `url(${bannerBg})` }}>
        <Box className="banner-section-box">
          <Box className="banner-section-heading">
            <Typography variant="h4" className="breakline">
              —
            </Typography>
            <Typography gutterBottom variant="h1" id="banner-main-header" sx={{ letterSpacing: -5 }}>
              GOING SOMEWHERE?
            </Typography>
            <Typography variant="subtitle1" id="banner-main-subtitle">
              Why not earn some extra cash on the way!
            </Typography>
            <Typography variant="h4" className="breakline">
              —
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid
        container
        component="main"
        sx={{
          padding: "1em",
          backgroundColor: "white",
        }}
      >
        <Grid
          item
          xs={null}
          sm={6}
          md={5}
          sx={{
            backgroundImage: `url(${driveformpic})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundColor: "white",
            backgroundPosition: "center",
          }}
        ></Grid>

        <Grid item xs={12} sm={6} md={7} sx={{ p: "1em", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <Box sx={{ mt: 8, mb: 1, mx: 2 }}>
            <Box className="logo-container">
              <Icon icon="solar:box-bold-duotone" height="41" className="icon-parcel" />
              <img src={Logo} alt="Logo" className="login-logo" />
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 300 }}>
              Fill out the details of your trip!
            </Typography>
          </Box>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: "0.5em", mb: "2em" }}>
            <Box sx={{ pb: "1em" }}>
              <Typography variant="body2" color="red">
                {error}
              </Typography>
              <Typography variant="body2" color="green">
                {submitResult}
              </Typography>
            </Box>

            <Grid container spacing={0}>
              <Grid item xs={12} sx={{ textAlign: "left", ml: "1em" }}>
                <Typography sx={{ fontSize: "0.75em", color: "rgba(0, 0, 0, 0.6)" }}>Where from?</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} sx={{ p: "0.25em", mt: "0.2em" }}>
                <TextField fullWidth id="suburbFrom" label="Suburb" name="suburbFrom" autoComplete="suburb" />
              </Grid>
              <Grid item xs={12} sm={12} md={4} sx={{ p: "0.25em", mt: "0.2em" }}>
                <TextField required fullWidth id="cityFrom" label="City" name="cityFrom" autoComplete="city" />
              </Grid>
              <Grid item xs={12} sm={12} md={4} sx={{ p: "0.25em", mt: "0.2em" }}>
                <TextField required fullWidth id="stateFrom" label="State" name="stateFrom" autoComplete="state" />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "left", ml: "1em", mt: "0.2em" }}>
                <Typography sx={{ fontSize: "0.75em", color: "rgba(0, 0, 0, 0.6)" }}>Where to?</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} sx={{ p: "0.25em", mt: "0.2em" }}>
                <TextField fullWidth id="suburbTo" label="Suburb" name="suburbTo" autoComplete="suburb" />
              </Grid>

              <Grid item xs={12} sm={12} md={4} sx={{ p: "0.25em", mt: "0.2em" }}>
                <TextField required fullWidth id="cityTo" label="City" name="cityTo" autoComplete="city" />
              </Grid>
              <Grid item xs={12} sm={12} md={4} sx={{ p: "0.25em", mt: "0.2em" }}>
                <TextField required fullWidth id="stateTo" label="State" name="stateTo" autoComplete="state" />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "left", ml: "1em", mt: "0.2em" }}>
                <Typography sx={{ fontSize: "0.75em", color: "rgba(0, 0, 0, 0.6)" }}>Dates </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} sx={{ p: "0.25em", mt: "0.2em" }}>
                <TextField required fullWidth name="departureDate" label="DD-MM-YYYY" id="departureDate" format="DD-MM-YYYY" helperText="Departure" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} sx={{ p: "0.25em", mt: "0.2em" }}>
                <TextField required fullWidth name="arrivalDate" label="DD-MM-YYYY" id="arrivalDate" format="DD-MM-YYYY" helperText="Arrival" />
              </Grid>

              <Grid item xs={12} sm={12} md={5.5} sx={{ p: "0.25em", mt: "0.2em" }}>
                <FormControl fullWidth required>
                  <InputLabel htmlFor="availableSpace" sx={{ fontSize: "0.75em" }}>
                    From
                  </InputLabel>
                  <OutlinedInput fullWidth name="startingPrice" label="from" id="startingPrice" startAdornment={<InputAdornment position="start">$</InputAdornment>} />
                  <FormHelperText>Starting price</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={11} md={5.5} sx={{ p: "0.25em", mt: "0.2em" }}>
                <FormControl fullWidth required>
                  <InputLabel htmlFor="availableSpace">Up to</InputLabel>
                  <Select required id="availableSpace" label="Up to" name="availableSpace" value={availableSpace} onChange={handleChange}>
                    {spaceSizes.map((spaceSize) => (
                      <MenuItem key={spaceSize} value={spaceSize}>
                        {spaceSize}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Available space</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={1} sx={{ py: "1.2em", color: "#D2B356", mt: "-0.1em" }}>
                <SizeInfoList />
              </Grid>

              <Grid item xs={12} sx={{ p: "0.25em", mt: "0.2em" }}>
                <TextField fullWidth multiline maxRows={4} name="comments" label="Any additional comments" id="comments" autoComplete="comments" />
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  my: "2em",
                  mx: "8em",
                  backgroundColor: "#D2B356",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "#D2B356",
                    border: "none",
                  },
                }}
              >
                POST TRIP
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
