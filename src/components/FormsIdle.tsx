import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "./FormsIdle.css";
import React from "react";

type FormsIdleType = {
  finalSizeWidth?: string;
  parties?: string;

  /** Style props */
  formsIdlePosition?: Property.Position;
  formsIdleWidth?: Property.Width;
  formsIdleTop?: Property.Top;
  formsIdleLeft?: Property.Left;
};

const FormsIdle: FunctionComponent<FormsIdleType> = ({
  finalSizeWidth,
  parties,
  formsIdlePosition,
  formsIdleWidth,
  formsIdleTop,
  formsIdleLeft,
}) => {
  const formsIdleStyle: CSS.Properties = useMemo(() => {
    return {
      position: formsIdlePosition,
      width: formsIdleWidth,
      top: formsIdleTop,
      left: formsIdleLeft,
    };
  }, [formsIdlePosition, formsIdleWidth, formsIdleTop, formsIdleLeft]);

  return (
    <div className="formsidle" style={formsIdleStyle}>
      <div className="rectangle3" />
      <div className="final-size-width2">{finalSizeWidth}</div>
      <div className="parties2">{parties}</div>
    </div>
  );
};

export default FormsIdle;
