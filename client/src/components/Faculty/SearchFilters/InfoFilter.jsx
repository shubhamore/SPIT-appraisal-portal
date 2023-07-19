import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

export default function InfoFilter(props) {
  const [newData, setNewData] = React.useState({});
  const handleDataChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  const handleDataSubmit = async (e) => {
    e.preventDefault();
    props.onSubmit(newData);
  };
  return (
    <Box
      className="mt-2 flex flex-row justify-between gap-6 items-center flex-wrap"
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleDataSubmit}
    >
      <p className="text-xl font-semibold">Available Filters</p>
      <div className="flex flex-row gap-6 items-center flex-wrap flex-1">
        <TextField
          required
          name="type"
          id="outlined-required"
          select
          size="small"
          sx={{
            width: "12rem",
            color: "var(--text-color)",
            background: "var(--bg-color-2)",
          }}
          label="Select Year"
          onChange={handleDataChange}
        >
          {props.options.map((item) => {
            return <MenuItem value={item.value}>{item.name}</MenuItem>;
          })}
        </TextField>
        <TextField
          name="branch"
          id="outlined-required"
          select
          size="small"
          sx={{
            width: "12rem",
            color: "var(--text-color)",
            background: "var(--bg-color-2)",
          }}
          label="Select Branch"
          onChange={handleDataChange}
        >
          {props.branchOptions.map((item) => {
            return <MenuItem value={item.value}>{item.name}</MenuItem>;
          })}
        </TextField>
        <TextField
          name="batch"
          id="outlined-required"
          select
          size="small"
          sx={{
            width: "12rem",
            color: "var(--text-color)",
            background: "var(--bg-color-2)",
          }}
          label="Select Batch"
          onChange={handleDataChange}
        >
          {props.batchOptions.map((item) => {
            return <MenuItem value={item.value}>{item.name}</MenuItem>;
          })}
        </TextField>
        {props.filters.map((item) => {
          return (
            <TextField
              id={item.id}
              name={item.id}
              label={item.label}
              variant="outlined"
              size="small"
              onChange={handleDataChange}
              sx={{
                width: "20rem",
                color: "var(--text-color)",
                background: "var(--bg-color-2)",
              }}
            />
          );
        })}
        <Button
          type="submit"
          variant="contained"
          size="small"
          sx={{
            color: "var(--text-light)",
            backgroundColor: "var(--primary-color)",
            borderRadius: "0.5rem",
            paddingX: "1rem",
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              color: "var(--text-dark)",
              backgroundColor: "var(--secondary-color)",
            },
          }}
        >
          Search
        </Button>
      </div>
    </Box>
  );
}