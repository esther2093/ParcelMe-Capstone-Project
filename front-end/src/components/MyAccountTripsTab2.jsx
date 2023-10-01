import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useUserContext } from "../context/UserContext";
import useTripData from "../hooks/useTripData";
import useEnquiryData from "../hooks/useEnquiryData";
import formatDate from "./FormatDate";
import { Icon } from "@iconify/react";
import EditEnquiryDialog from "./EditEnquiryDialog";
import DeleteEnquiryDialog from "./DeleteEnquiryDialog";

export default function TripsTab2() {
  const { currentUser } = useUserContext();
  const { allTrips } = useTripData();
  const { enquiries } = useEnquiryData();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [enquiriesList, setEnquiriesList ] = useState([]);

  const handleEditDialogOpen = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setSelectedEnquiry(null);
    setEditDialogOpen(false);
  };

  const handleDeleteDialogOpen = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setSelectedEnquiry(null);
    setDeleteDialogOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "from", label: "From", minWidth: 180 },
    { id: "to", label: "To", minWidth: 150 },
    { id: "dates", label: "Dates", minWidth: 150 },
    { id: "enquiry", label: "Enquiry", minWidth: 70 },
    { id: "enquiryDate", label: "Date Enquired", minWidth: 70 },
    { id: "editEnquiry", label: "", minWidth: 20 },
    { id: "deleteEnquiry", label: "", minWidth: 20 },
    { id: "status", label: "Status", minWidth: 20 },
  ];

  useEffect (() => {
    const userEnquiries = enquiries.filter((enquiry) => enquiry.userId === currentUser.id);
    setEnquiriesList(userEnquiries);
  }, [enquiries, currentUser, enquiriesList]);

  const rows = enquiriesList.map((enquiry) => {
  
    const trip = allTrips.find((trip) => trip.id === enquiry.tripId);
    const suburbFrom = trip.suburbFrom === null ? "" : trip.suburbFrom;
    const suburbTo = trip.suburbTo === null ? "" : trip.suburbTo;

    let statusIcon;
    if (enquiry.accepted === null) {
      statusIcon = <Box sx={{textAlign: "center"}}><Icon icon="eos-icons:three-dots-loading" width="16.4" /></Box>;
    } else if (enquiry.accepted === true) {
      statusIcon = <Box sx={{textAlign: "center"}}><Icon icon="subway:tick" color="green" width="15" /></Box>;
    } else if (enquiry.accepted === false) {
      statusIcon = <Box sx={{textAlign: "center"}}><Icon icon="foundation:x" color="red" width="15" /></Box>;
    } else {
      statusIcon = null;
    }

    return {
      from: `${suburbFrom} ${trip.cityFrom}, ${trip.stateFrom}`,
      to: `${suburbTo} ${trip.cityTo}, ${trip.stateTo}`,
      dates: `${formatDate(trip.departureDate)} - ${formatDate(trip.arrivalDate)}`,
      enquiry: 
      <Typography sx={{
        fontSize: "0.875rem",
        maxWidth: 300,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }}
    >
      {enquiry.comments}
    </Typography>,
      enquiryDate: formatDate(enquiry.updatedAt),
      status: statusIcon,
      editEnquiry: <Icon icon="material-symbols:edit-outline" onClick={() => handleEditDialogOpen(enquiry)} />,
      deleteEnquiry: <Icon color="#c1121f" icon="ph:x-fill" onClick={() => handleDeleteDialogOpen(enquiry)} />
    };
  });

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" className="section-subhead" sx={{ fontSize: "0.9em" }}>
          ENQUIRIES
        </Typography>
        <Typography variant="h4" className="section-title" sx={{ fontSize: "1.5em", fontWeight: 800 }}>
          Enquiries Sent:
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, p: "0.5em" }}>
        <TableContainer sx={{ minHeight: 150 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align="left" style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align="left">
                      {row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {rows.length === 0 && (
          <Typography variant="body1" sx={{ padding: "0.5em 1em 2em 0.5em" }}>
            You haven't received any enquiries yet :(
          </Typography>
        )}
      </Box>
      <EditEnquiryDialog open={editDialogOpen} close={handleEditDialogClose} enquiry={selectedEnquiry} />
      <DeleteEnquiryDialog open={deleteDialogOpen} close={handleDeleteDialogClose} enquiry={selectedEnquiry} />
    </Box>
  );
}
