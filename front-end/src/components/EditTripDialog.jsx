import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Box, TextField } from "@mui/material";
import formatDateBackend from "./FormatDateBackend";

export default function EditTripDialog({ open, close, trip, setUpdateList }) {
  const [editedTrip, setEditedTrip] = useState({
    id: "",
    suburbFrom: "",
    cityFrom: "",
    stateFrom: "",
    suburbTo: "",
    cityTo: "",
    stateTo: "",
    availableSpace: "",
    departureDate: "",
    arrivalDate: "",
  });

  const [submitResult, setSubmitResult] = useState("");
  const [error, setError] = useState("");

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    if (trip) {
      const originalTrip = {
        id: trip.id,
        suburbFrom: capitalizeFirstLetter(trip.suburbFrom),
        cityFrom: capitalizeFirstLetter(trip.cityFrom),
        stateFrom: capitalizeFirstLetter(trip.stateFrom),
        suburbTo: capitalizeFirstLetter(trip.suburbTo),
        cityTo: capitalizeFirstLetter(trip.cityTo),
        stateTo: capitalizeFirstLetter(trip.stateTo),
        availableSpace: capitalizeFirstLetter(trip.availableSpace),
        departureDate: formatDateBackend(trip.departureDate),
        arrivalDate: formatDateBackend(trip.arrivalDate),
        comments: capitalizeFirstLetter(trip.comments),
      };
      setEditedTrip(originalTrip);
    }
  }, [trip]);

  useEffect(() => {
    if (!open) {
      setSubmitResult("");
    }
  }, [open]);

  const handleEditForm = (e) => {
    const { name, value } = e.target;
    setEditedTrip((originalTrip) => ({
      ...originalTrip,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8000/api/trips/${trip.id}`, editedTrip);
      setError("");
      setSubmitResult(response.data.result);
      setUpdateList(editedTrip);
      close();
    } catch (error) {
      console.error("An error occurred while updating the trip:", error.response.data.result);
      setError("An error occurred while updating your trip");
    }
  };

  return (
    <Dialog fullWidth open={open}>
      <DialogTitle>
        <Typography variant="h6" className="section-subhead" sx={{ fontSize: "0.6em" }}>
          EDIT DETAILS
        </Typography>
        <Typography variant="h4" className="section-title" sx={{ fontSize: "1em", fontWeight: 800 }}>
          Edit your trip
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="error">
            {error}
          </Typography>
          <Typography variant="body2" color="green">
            {submitResult}
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ pr: "1em" }}>
          <Box sx={{ display: "flex" }}>
            <TextField sx={{ m: "0.5em" }} fullWidth name="suburbFrom" label="From Suburb" value={editedTrip.suburbFrom} onChange={handleEditForm} />
            <TextField sx={{ m: "0.5em" }} required fullWidth name="cityFrom" label="From City" value={editedTrip.cityFrom} onChange={handleEditForm} />
            <TextField sx={{ m: "0.5em" }} required fullWidth name="stateFrom" label="From State" value={editedTrip.stateFrom} onChange={handleEditForm} />
          </Box>
          <Box sx={{ display: "flex" }}>
            <TextField sx={{ m: "0.5em" }} fullWidth name="suburbTo" label="To Suburb" value={editedTrip.suburbTo} onChange={handleEditForm} />
            <TextField sx={{ m: "0.5em" }} required fullWidth name="cityTo" label="To City" value={editedTrip.cityTo} onChange={handleEditForm} />
            <TextField sx={{ m: "0.5em" }} required fullWidth name="stateTo" label="To State" value={editedTrip.stateTo} onChange={handleEditForm} />
          </Box>
          <Box sx={{ display: "flex" }}>
            <TextField sx={{ m: "0.5em" }} required fullWidth name="departureDate" label="Departure Date" value={editedTrip.departureDate} onChange={handleEditForm} />
            <TextField sx={{ m: "0.5em" }} required fullWidth name="arrivalDate" label="Arrival Date" value={editedTrip.arrivalDate} onChange={handleEditForm} />
          </Box>
          <TextField sx={{ m: "0.5em" }} required fullWidth name="availableSpace" label="Available Space" value={editedTrip.availableSpace} onChange={handleEditForm} />
          <TextField sx={{ m: "0.5em" }} multiline maxRows={10} fullWidth name="comments" label="Comments" value={editedTrip.comments} onChange={handleEditForm} />
          <Box sx={{ pt: "1em", textAlign: "center" }}>
            <Button type="submit" variant="filled">
              Save
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="filled" onClick={close}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
