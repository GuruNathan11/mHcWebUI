import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "./ArrowCircleLeft.css";
import React from "react";

type ArrowCircleLeftType = {
  vector?: string;
  prop?: string;

  /** Style props */
  arrowCircleLeftFlexShrink?: Property.FlexShrink;
  divColor?: Property.Color;
};

const ArrowCircleLeft: FunctionComponent<ArrowCircleLeftType> = ({
  vector,
  prop,
  arrowCircleLeftFlexShrink,
  divColor,
}) => {
  const arrowCircleLeftStyle: CSS.Properties = useMemo(() => {
    return {
      flexShrink: arrowCircleLeftFlexShrink,
    };
  }, [arrowCircleLeftFlexShrink]);

  const divStyle: CSS.Properties = useMemo(() => {
    return {
      color: divColor,
    };
  }, [divColor]);

  return (
    <div className="arrow-circle-left" style={arrowCircleLeftStyle}>
      <img className="vector-icon1" alt="" src={vector} />
      <div className="div3" style={divStyle}>
        {prop}
      </div>
    </div>
  );
};

export default ArrowCircleLeft;
