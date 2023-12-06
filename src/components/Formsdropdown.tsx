import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "./Formsdropdown.css";
import React from "react";

type FormsdropdownType = {
  label?: string;
  autoSuggest?: string;
  showRectangle?: boolean;
  showIconarrowDown?: boolean;
  showLabel?: boolean;
  showAutoSuggest?: boolean;

  /** Style props */
  formsdropdownPosition?: Property.Position;
  formsdropdownWidth?: Property.Width;
  formsdropdownTop?: Property.Top;
  formsdropdownLeft?: Property.Left;
  iconarrowDownTop?: Property.Top;
};

const Formsdropdown: FunctionComponent<FormsdropdownType> = ({
  label,
  autoSuggest,
  showRectangle,
  showIconarrowDown,
  showLabel,
  showAutoSuggest,
  formsdropdownPosition,
  formsdropdownWidth,
  formsdropdownTop,
  formsdropdownLeft,
  iconarrowDownTop,
}) => {
  const formsdropdownStyle: CSS.Properties = useMemo(() => {
    return {
      position: formsdropdownPosition,
      width: formsdropdownWidth,
      top: formsdropdownTop,
      left: formsdropdownLeft,
    };
  }, [
    formsdropdownPosition,
    formsdropdownWidth,
    formsdropdownTop,
    formsdropdownLeft,
  ]);

  const iconarrowDownStyle: CSS.Properties = useMemo(() => {
    return {
      top: iconarrowDownTop,
    };
  }, [iconarrowDownTop]);

  return (
    <div className="formsdropdown" style={formsdropdownStyle}>
      <div className="group10">
        {showRectangle && <div className="rectangle1" />}
        {showIconarrowDown && (
          <img
            className="iconarrow-down"
            alt=""
            src="/iconarrow-down.svg"
            style={iconarrowDownStyle}
          />
        )}
        {showLabel && <div className="label">{label}</div>}
        {showAutoSuggest && <div className="auto-suggest">{autoSuggest}</div>}
      </div>
    </div>
  );
};

export default Formsdropdown;
