import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function DeleteTripDialog({ open, close, trip }) {
  const [submitResult, setSubmitResult] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async () => {

    try {
      const response = await axios.delete(`http://localhost:8000/api/trips/${trip.id}`)
      setError("");    
      setSubmitResult(response.data.result);
      }
      catch(error) {
        console.error("An error occurred while deleting the trip:", error.response.data.result);
        setError("An error occurred while deleting your trip");
      };
  };

  return (
    <Dialog open={open} close={close}>
      <DialogTitle sx={{borderBottom: "2px #D2B356 solid"}} >DELETE TRIP</DialogTitle>
      <DialogContent>
        <div sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="error">
            {error}
          </Typography>
          <Typography variant="body2" color="green">
            {submitResult}
          </Typography>
        </div>
        <Typography variant="body2">
          Are you sure you want to delete this trip?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="filled" onClick={handleDelete} color="primary">
          Yes
        </Button>
        <Button onClick={close}>No</Button>
      </DialogActions>
    </Dialog>
  );
}
