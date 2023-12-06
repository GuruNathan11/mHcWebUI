import { FunctionComponent } from "react";
import { FormControlLabel, Radio } from "@mui/material";
import "./FormRadio.css";
import React from "react";
const FormRadio: FunctionComponent = () => {
  return (
    <FormControlLabel
      className="radio-buttongray"
      label=""
      control={<Radio color="primary" />}
    />
  );
};

export default FormRadio;
