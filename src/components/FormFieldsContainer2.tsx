import { FunctionComponent } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
} from "@mui/material";
import "./FormFieldsContainer2.css";
import React from "react";
const FormFieldsContainer2: FunctionComponent = () => {
  return (
    <div className="formContainer2-fields78">
      <TextField
        className="destination-formContainer2Name-input75"
        color="primary"
        variant="outlined"
        type="text"
        label="City"
        placeholder="Placeholder"
        size="medium"
        margin="none"
      />
      <FormControl className="formContainer2Name-input86" variant="outlined">
        <InputLabel color="primary">State</InputLabel>
        <Select color="primary" size="medium" label="State">
          <MenuItem value="Option 1">Option 1</MenuItem>
          <MenuItem value="Option 2">Option 2</MenuItem>
        </Select>
        <FormHelperText />
      </FormControl>
      <FormControl className="formContainer2Name-input86" variant="outlined">
        <InputLabel color="primary">Country</InputLabel>
        <Select color="primary" size="medium" label="Country">
          <MenuItem value="USA">USA</MenuItem>
          <MenuItem value="INDIA">INDIA</MenuItem>
        </Select>
        <FormHelperText />
      </FormControl>
    </div>
  );
};

export default FormFieldsContainer2;
