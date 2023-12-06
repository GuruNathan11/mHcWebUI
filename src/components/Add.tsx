import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "./Add.css";
import React from "react";

type AddType = {
  /** Style props */
  addPosition?: Property.Position;
  addTop?: Property.Top;
  addLeft?: Property.Left;
};

const Add: FunctionComponent<AddType> = ({ addPosition, addTop, addLeft }) => {
  const addStyle: CSS.Properties = useMemo(() => {
    return {
      position: addPosition,
      top: addTop,
      left: addLeft,
    };
  }, [addPosition, addTop, addLeft]);

  return (
    <div className="add" style={addStyle}>
      <div className="add-child" />
      <div className="add-item" />
      <div className="add-inner" />
    </div>
  );
};

export default Add;
