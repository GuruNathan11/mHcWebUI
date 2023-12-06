import { FunctionComponent, useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
  Icon,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "./FormContainer.css";
import React from "react";
const FormContainer: FunctionComponent = () => {
  const [
    selectOutlinedDateTimePicker2Value,
    setSelectOutlinedDateTimePicker2Value,
  ] = useState<string | null>(null);
  const [
    selectOutlinedDateTimePicker3Value,
    setSelectOutlinedDateTimePicker3Value,
  ] = useState<string | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="secondary-analytics-parent">
        <div className="secondary-analytics11"></div>
        <div className="secondary-form-fields66">
          <TextField
            className="secondary-destination-name-input60"
            color="primary"
            variant="outlined"
            type="text"
            label="SE Zip Code"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
            className="secondary-destination-name-input60"
            color="primary"
            variant="outlined"
            type="text"
            label="Zip Code"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <FormControl className="secondary-name-input77" variant="outlined">
            <InputLabel color="primary">State</InputLabel>
            <Select color="primary" size="medium" label="State">
              <MenuItem value="Option 1">Option 1</MenuItem>
              <MenuItem value="Option 2">Option 2</MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
          <FormControl className="secondary-name-input77" variant="outlined">
            <InputLabel color="primary">Country</InputLabel>
            <Select color="primary" size="medium" label="Country">
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="INDIA">INDIA</MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
        </div>
        <div className="secondary-form-fields67">
          <TextField
            className="secondary-destination-name-input60"
            color="primary"
            variant="outlined"
            type="text"
            label="Subscriber Employer (SE)"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <FormControl className="secondary-name-input77" variant="outlined">
            <InputLabel color="primary">Gender</InputLabel>
            <Select color="primary" size="medium" label="Gender">
              <MenuItem value="Option 1">Option 1</MenuItem>
              <MenuItem value="Option 2">Option 2</MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
        </div>
        <div className="secondary-form-fields68">
          <TextField
            className="secondary-destination-name-input60"
            color="primary"
            variant="outlined"
            type="text"
            label="SE Address"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
        </div>
        <div className="secondary-form-fields69">
          <div className="secondary-form-selectoutlined9">
            <DatePicker
              label="Effective Date"
              value={selectOutlinedDateTimePicker2Value}
              onChange={(newValue: any) => {
                setSelectOutlinedDateTimePicker2Value(newValue);
              }}
              slotProps={{
                textField: {
                  variant: "outlined",
                  size: "medium",
                  fullWidth: true,
                  color: "primary",
                },
              }}
            />
          </div>
          <FormControl className="secondary-name-input77" variant="outlined">
            <InputLabel color="primary">Relationship</InputLabel>
            <Select color="primary" size="medium" label="Relationship">
              <MenuItem value="Option 1">Option 1</MenuItem>
              <MenuItem value="Option 2">Option 2</MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
        </div>
        <div className="secondary-form-fields70">
          <TextField
            className="secondary-destination-name-input60"
            color="primary"
            variant="outlined"
            type="number"
            label="Policy Number"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <div className="secondary-form-selectoutlined9">
            <DatePicker
              label="D.O.B."
              value={selectOutlinedDateTimePicker3Value}
              onChange={(newValue: any) => {
                setSelectOutlinedDateTimePicker3Value(newValue);
              }}
              slotProps={{
                textField: {
                  variant: "outlined",
                  size: "medium",
                  fullWidth: true,
                  color: "primary",
                },
              }}
            />
          </div>
        </div>
        <div className="secondary-form-fields71">
          <TextField
            className="secondary-destination-name-input60"
            color="primary"
            variant="outlined"
            type="number"
            label="Group Number"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
            className="secondary-destination-name-input60"
            color="primary"
            variant="outlined"
            type="text"
            label="S.S.N"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
        </div>
        <div className="secondary-form-fields72">
          <TextField
            className="secondary-destination-name-input60"
            color="primary"
            variant="outlined"
            type="text"
            label="Subscriber Address Line 1"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
            className="secondary-destination-name-input60"
            color="primary"
            variant="outlined"
            type="text"
            label="Subscriber Address Line 2"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
        </div>
        <div className="secondary-form-fields73">
          <TextField
            className="secondary-destination-name-input60"
            color="primary"
            variant="outlined"
            type="text"
            label="Subscriber Phone"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
            className="secondary-destination-name-input60"
            color="primary"
            variant="outlined"
            type="text"
            label="Co-Pay"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <FormControl className="secondary-name-input77" variant="outlined">
            <InputLabel color="primary">Accept Assignment</InputLabel>
            <Select color="primary" size="medium" label="Accept Assignment">
              <MenuItem value="Option 1">Option 1</MenuItem>
              <MenuItem value="Option 2">Option 2</MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
        </div>
        <div className="secondary-form-fields74">
          <TextField
            className="secondary-destination-name-input60"
            color="primary"
            variant="outlined"
            type="text"
            label="SE City"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
            className="secondary-destination-name-input60"
            color="primary"
            variant="outlined"
            type="text"
            label="City"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <FormControl className="secondary-name-input77" variant="outlined">
            <InputLabel color="primary">SE State</InputLabel>
            <Select color="primary" size="medium" label="SE State">
              <MenuItem value="Option 1">Option 1</MenuItem>
              <MenuItem value="Option 2">Option 2</MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
          <FormControl className="secondary-name-input77" variant="outlined">
            <InputLabel color="primary">State</InputLabel>
            <Select color="primary" size="medium" label="State">
              <MenuItem value="Option 1">Option 1</MenuItem>
              <MenuItem value="Option 2">Option 2</MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
        </div>
        <div className="secondary-form-fields75">
          <TextField
            className="secondary-destination-name-input60"
            color="primary"
            variant="outlined"
            type="text"
            label="Plan Name"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
          <TextField
            className="secondary-destination-name-input60"
            color="primary"
            variant="outlined"
            type="text"
            label="Subscriber"
            placeholder="Placeholder"
            size="medium"
            margin="none"
          />
        </div>
        <FormControl
          className="secondary-form-fields76"
          sx={{ width: 735 }}
          variant="outlined"
        >
          <InputLabel color="primary">Secondary Insurance provider</InputLabel>
          <Select
            color="primary"
            size="medium"
            label="Secondary Insurance provider"
          >
            <MenuItem value="Option 1">Option 1</MenuItem>
            <MenuItem value="Option 2">Option 2</MenuItem>
          </Select>
          <FormHelperText />
        </FormControl>
      </div>
    </LocalizationProvider>
  );
};

export default FormContainer;
