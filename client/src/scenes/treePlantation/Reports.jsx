import React, { useState } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

export default function Reports() {
  // Sample data for the DataGrid
  const rows = [
    { id: 1, EventName: 'Manusath derana tree plantation 2020', date: '2024-02-21', Locations:'Dabulla', Amountoftrees:'100', status: 'Completed' },
    { id: 2, EventName: 'Manusath derana tree plantation 2021', date: '2024-02-22', Locations:'Ampara', Amountoftrees:'100', status: 'Pending' },
    { id: 3, EventName: 'Manusath derana tree plantation 2022', date: '2024-02-23', Locations:'Anuradhapura', Amountoftrees:'100', status: 'In Progress' },
  ];

  // Define columns for the DataGrid
  const columns = [
    { field: 'EventName', headerName: 'Event Name', width: 300 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'Locations', headerName: 'Locations', width: 150 },
    { field: 'Amountoftrees', headerName: 'Amount of Trees', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  // State for filter values
  const [filterValues, setFilterValues] = useState({
    startDate: '',
    endDate: '',
    amountOfTrees: '',
    status: ''
  });

  // Handle filter changes
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = value; // Initialize with the value as is
    
    // If it's the start date field, format the date to dd/mm/yyyy
    if (name === 'startDate') {
      const [year, month, day] = value.split('-'); // Split the received value
      formattedValue = `${day}/${month}/${year}`; // Reconstruct with the desired format
    }

    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: formattedValue // Use the formatted value
    }));
  };

  // Determine whether to display the start date label
  const isStartDateSelected = filterValues.startDate !== '';
  const isEndDateSelected = filterValues.endDate !== '';


  // Filtered rows based on filter values
  const filteredRows = rows.filter(row => {
    const startDate = new Date(filterValues.startDate);
    const endDate = new Date(filterValues.endDate);
    const rowDate = new Date(row.date);
    
    return (
      (filterValues.startDate === '' || rowDate >= startDate) &&
      (filterValues.endDate === '' || rowDate <= endDate) &&
      row.Amountoftrees.includes(filterValues.amountOfTrees) &&
      row.status.includes(filterValues.status)
    );
  });

  return (
    <Box m="1.5rem 2.5rem" position="relative">
      <Header title="Tree Plantation" subtitle="Manage tree plantations" />
      <Grid container spacing={2} mt={2} mb={2}> {/* Increased margin at the top */}
        <Grid item xs={3}>
          <TextField
            fullWidth
            type="date"
            label={isStartDateSelected ? "Start Date" : ''} // Conditional rendering of the label
            name="startDate"
            value={filterValues.startDate}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            type="date"
            label={isEndDateSelected ? "End Date" : ''} // Conditional rendering of the label
            name="endDate"
            value={filterValues.endDate}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            name="amountOfTrees"
            label="Amount of Trees"
            value={filterValues.amountOfTrees}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={filterValues.status}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </Box>
  );
}
