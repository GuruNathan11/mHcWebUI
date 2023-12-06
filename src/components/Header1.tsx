import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "./Header1.css";
import React from "react";

type Header1Type = {
  dimensionLabel?: string;
  dimensionValue?: string;
  chevronLeftIcon?: boolean;

  /** Style props */
  propHeight?: Property.Height;
  propWidth?: Property.Width;
  propRight?: Property.Right;
  propBottom?: Property.Bottom;
  propLeft?: Property.Left;
};

const Header1: FunctionComponent<Header1Type> = ({
  dimensionLabel,
  dimensionValue,
  chevronLeftIcon,
  propHeight,
  propWidth,
  propRight,
  propBottom,
  propLeft,
}) => {
  const createPatientStyle: CSS.Properties = useMemo(() => {
    return {
      height: propHeight,
      width: propWidth,
      right: propRight,
      bottom: propBottom,
      left: propLeft,
    };
  }, [propHeight, propWidth, propRight, propBottom, propLeft]);

  return (
    <div className="create-patient" style={createPatientStyle}>
      <div className="profile3">
        <div className="notifications3">
          <img className="notifications-icon5" alt="" src={dimensionLabel} />
          <div className="number6">
            <div className="div90">2</div>
          </div>
        </div>
        <div className="message3">
          <img className="vector-icon77" alt="" src="/vector3.svg" />
          <div className="number7">
            <div className="div90">2</div>
          </div>
        </div>
        <img className="settings-icon6" alt="" src="/settings1.svg" />
        <img className="profile-icon3" alt="" src="/profile1@2x.png" />
      </div>
      <img className="logo-icon2" alt="" src={dimensionValue} />
      <div className="chevron-left-parent">
        <img className="chevron-left-icon4" alt="" src="/chevronleft.svg" />
        {!chevronLeftIcon && (
          <img className="chevron-left-icon5" alt="" src="/chevronleft.svg" />
        )}
        <div className="patient-management4">Create Patient</div>
      </div>
    </div>
  );
};

export default Header1;
