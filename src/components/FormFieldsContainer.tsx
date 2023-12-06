import { FunctionComponent } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
  TextField,
} from "@mui/material";
import "./FormFieldsContainer.css";
import React from "react";
const FormFieldsContainer: FunctionComponent = () => {
  return (
    <div className="form-fields14">
      <FormControl className="destination-name-input11" variant="outlined">
        <InputLabel color="primary">Country</InputLabel>
        <Select color="primary" size="medium" label="Country">
          <MenuItem value="USA">USA</MenuItem>
          <MenuItem value="INDIA">INDIA</MenuItem>
        </Select>
        <FormHelperText />
      </FormControl>
      <TextField
        className="name-input20"
        color="primary"
        variant="outlined"
        type="email"
        label="Email"
        placeholder="Placeholder"
        size="medium"
        margin="none"
      />
      <TextField
        className="name-input20"
        color="primary"
        variant="outlined"
        type="number"
        label="Phone Number"
        placeholder="Placeholder"
        size="medium"
        margin="none"
      />
    </div>
  );
};

export default FormFieldsContainer;
