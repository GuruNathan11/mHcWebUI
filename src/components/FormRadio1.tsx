import { FunctionComponent } from "react";
import { FormControlLabel, Radio } from "@mui/material";
import "./FormRadio1.css";
import React from "react";
const FormRadio1: FunctionComponent = () => {
  return (
    <FormControlLabel
      className="radio-buttonblue"
      label=""
      control={<Radio color="primary" checked />}
    />
  );
};

export default FormRadio1;
