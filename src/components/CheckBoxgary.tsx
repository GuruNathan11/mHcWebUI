import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "./CheckBoxgary.css";
import React from "react";

type CheckBoxgaryType = {
  /** Style props */
  checkBoxgaryWidth?: Property.Width;
  checkBoxgaryHeight?: Property.Height;
};

const CheckBoxgary: FunctionComponent<CheckBoxgaryType> = ({
  checkBoxgaryWidth,
  checkBoxgaryHeight,
}) => {
  const checkBoxgaryStyle: CSS.Properties = useMemo(() => {
    return {
      width: checkBoxgaryWidth,
      height: checkBoxgaryHeight,
    };
  }, [checkBoxgaryWidth, checkBoxgaryHeight]);

  return (
    <div className="check-boxgary10" style={checkBoxgaryStyle}>
      <div className="check-box10">
        <div className="check-box10">
          <div className="group-child7" />
        </div>
      </div>
    </div>
  );
};

export default CheckBoxgary;
