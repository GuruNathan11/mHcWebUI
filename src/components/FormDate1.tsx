import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "./FormDate1.css";
import React from "react";

type FormDate1Type = {
  finalSizeWidth?: string;
  parties?: string;
  iconscalendar?: boolean;

  /** Style props */
  formDatePosition?: Property.Position;
  formDateWidth?: Property.Width;
  formDateTop?: Property.Top;
  formDateLeft?: Property.Left;
};

const FormDate1: FunctionComponent<FormDate1Type> = ({
  finalSizeWidth,
  parties,
  iconscalendar,
  formDatePosition,
  formDateWidth,
  formDateTop,
  formDateLeft,
}) => {
  const formDate1Style: CSS.Properties = useMemo(() => {
    return {
      position: formDatePosition,
      width: formDateWidth,
      top: formDateTop,
      left: formDateLeft,
    };
  }, [formDatePosition, formDateWidth, formDateTop, formDateLeft]);

  return (
    <div className="formdate1" style={formDate1Style}>
      <div className="rectangle2" />
      <div className="final-size-width1">{finalSizeWidth}</div>
      <div className="parties1">{parties}</div>
      {!iconscalendar && (
        <img className="iconscalendar1" alt="" src="/iconscalendar1.svg" />
      )}
      <img
        className="react-iconsioiomdtime3"
        alt=""
        src="/reacticonsioiomdtime1.svg"
      />
    </div>
  );
};

export default FormDate1;
