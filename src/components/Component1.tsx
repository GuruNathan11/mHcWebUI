import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "./Component1.css";
import React from "react";
import vectorImage from './../assets/images/mettler_images/vector.svg';

type Component1Type = {
  avatar?: string;
  avatar2?: string;
  avatar2Icon?: boolean;

  /** Style props */
  component1Position?: Property.Position;
  component1Top?: Property.Top;
  component1Left?: Property.Left;
};

const Component1: FunctionComponent<Component1Type> = ({
  avatar,
  avatar2,
  avatar2Icon,
  component1Position,
  component1Top,
  component1Left,
}) => {
  const component1Style: CSS.Properties = useMemo(() => {
    return {
      position: component1Position,
      top: component1Top,
      left: component1Left,
    };
  }, [component1Position, component1Top, component1Left]);

  return (
    <div className="component-1" style={component1Style}>
      <div className="component-1-child" />
      <img className="avatar-icon1" alt="" src={avatar} />
      {!avatar2Icon && <img className="avatar2-icon" alt="" src={avatar2} />}
      <img className="vector-icon1" alt="" src={vectorImage} />
      <div className="doug-mcmillan">Doug McMillan</div>
    </div>
  );
};

export default Component1;
