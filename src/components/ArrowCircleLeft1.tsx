import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "./ArrowCircleLeft1.css";
import React from "react";

type ArrowCircleLeft1Type = {
  vector?: string;
  prop?: string;

  /** Style props */
  arrowCircleLeftFlexShrink?: Property.FlexShrink;
};

const ArrowCircleLeft1: FunctionComponent<ArrowCircleLeft1Type> = ({
  vector,
  prop,
  arrowCircleLeftFlexShrink,
}) => {
  const arrowCircleLeft1Style: CSS.Properties = useMemo(() => {
    return {
      flexShrink: arrowCircleLeftFlexShrink,
    };
  }, [arrowCircleLeftFlexShrink]);

  return (
    <div className="arrow-circle-left1" style={arrowCircleLeft1Style}>
      <img className="vector-icon2" alt="" src={vector} />
      <div className="div4">{prop}</div>
    </div>
  );
};

export default ArrowCircleLeft1;
