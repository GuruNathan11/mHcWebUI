import { FunctionComponent, useState } from "react";
import { TextField, Icon } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "./FormFieldsContainer1.css";
import React from "react";
const FormFieldsContainer1: FunctionComponent = () => {
  const [
    selectOutlinedDateTimePickerValue,
    setSelectOutlinedDateTimePickerValue,
  ] = useState<string | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="ContainerForm1-fields77">
        <TextField
          className="destination-ContainerForm1-input74"
          color="primary"
          variant="outlined"
          type="text"
          label="Family Size"
          placeholder="Placeholder"
          size="medium"
          margin="none"
          required
        />
        <div className="selectoutlined11">
          <DatePicker
            label="Financial Review Date"
            value={selectOutlinedDateTimePickerValue}
            onChange={(newValue: any) => {
              setSelectOutlinedDateTimePickerValue(newValue);
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
        <TextField
          className="destination-ContainerForm1-input74"
          color="primary"
          variant="outlined"
          type="text"
          label="Monthly Income"
          placeholder="Placeholder"
          size="medium"
          margin="none"
          required
        />
      </div>
    </LocalizationProvider>
  );
};

export default FormFieldsContainer1;
