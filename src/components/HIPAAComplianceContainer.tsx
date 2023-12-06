import { FunctionComponent, useMemo } from "react";
import { Button, Icon } from "@mui/material";
import CSS, { Property } from "csstype";
import "./HIPAAComplianceContainer.css";
import newImage from './../assets/images/mettler_images/rectangle-5999.svg'
import React from "react";

type HIPAAComplianceContainerType = {
  complianceDocumentation?: string;

  /** Style props */
  propTop?: Property.Top;
};

const HIPAAComplianceContainer: FunctionComponent<
  HIPAAComplianceContainerType
> = ({ complianceDocumentation, propTop }) => {
  const frameDiv2Style: CSS.Properties = useMemo(() => {
    return {
      top: propTop,
    };
  }, [propTop]);

  return (
    <div className="vector-container" style={frameDiv2Style}>
      <img className="frame-child7" alt="" src={newImage} />
      <Button
        className="buttoncontainedtruefalse1"
        variant="outlined"
        color="primary"
        startIcon={<Icon>attachment_sharp</Icon>}
      >
        Attach Document
      </Button>
      <div className="label6">{complianceDocumentation}</div>
    </div>
  );
};

export default HIPAAComplianceContainer;
