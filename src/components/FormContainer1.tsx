import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "./FormContainer1.css";
import newImage from './../assets/images/mettler_images/rectangle-6213.svg';
import React from "react";

type FormContainer1Type = {
  relationship?: string;

  /** Style props */
  propTop?: Property.Top;
};

const FormContainer1: FunctionComponent<FormContainer1Type> = ({
  relationship,
  propTop,
}) => {
  const component502Style: CSS.Properties = useMemo(() => {
    return {
      top: propTop,
    };
  }, [propTop]);

  return (
    <div className="component-502" style={component502Style}>
      <img className="component-502-child" alt="" src={newImage} />
      <div className="father">{relationship}</div>
      <div className="no">No</div>
      <div className="yes">yes</div>
      <div className="div37">--</div>
      <div className="no1">No</div>
      <div className="div38">--</div>
      <div className="div39">--</div>
      <div className="div40">--</div>
      <div className="div41">--</div>
    </div>
  );
};

export default FormContainer1;
