import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "./Remove.css";
import React from "react";

type RemoveType = {
  /** Style props */
  removePosition?: Property.Position;
  removeTop?: Property.Top;
  removeLeft?: Property.Left;
};

const Remove: FunctionComponent<RemoveType> = ({
  removePosition,
  removeTop,
  removeLeft,
}) => {
  const removeStyle: CSS.Properties = useMemo(() => {
    return {
      position: removePosition,
      top: removeTop,
      left: removeLeft,
    };
  }, [removePosition, removeTop, removeLeft]);

  return (
    <div className="remove" style={removeStyle}>
      <div className="remove-child" />
      <div className="remove-item" />
    </div>
  );
};

export default Remove;
