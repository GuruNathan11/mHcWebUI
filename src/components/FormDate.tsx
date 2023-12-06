import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "./FormDate.css";
import React from "react";

type FormDateType = {
  finalSizeWidth?: string;
  parties?: string;

  /** Style props */
  formDatePosition?: Property.Position;
  formDateWidth?: Property.Width;
  formDateTop?: Property.Top;
  formDateLeft?: Property.Left;
};

const FormDate: FunctionComponent<FormDateType> = ({
  finalSizeWidth,
  parties,
  formDatePosition,
  formDateWidth,
  formDateTop,
  formDateLeft,
}) => {
  const formDateStyle: CSS.Properties = useMemo(() => {
    return {
      position: formDatePosition,
      width: formDateWidth,
      top: formDateTop,
      left: formDateLeft,
    };
  }, [formDatePosition, formDateWidth, formDateTop, formDateLeft]);

  return (
    <div className="formdate" style={formDateStyle}>
      <div className="rectangle" />
      <div className="final-size-width">{finalSizeWidth}</div>
      <div className="parties">{parties}</div>
      <img className="iconscalendar" alt="" src="/iconscalendar.svg" />
    </div>
  );
};

export default FormDate;
