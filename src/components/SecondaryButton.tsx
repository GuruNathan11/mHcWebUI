import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "./SecondaryButton.css";
import React from "react";
import newImage from './../assets/images/mettler_images/bg.svg'

type SecondaryButtonType = {
  label?: string;

  /** Style props */
  secondaryButtonCursor?: Property.Cursor;

  /** Action props */
  onCancelContainerClick?: () => void;
};

const SecondaryButton: FunctionComponent<SecondaryButtonType> = ({
  label,
  secondaryButtonCursor,
  onCancelContainerClick,
}) => {
  const secondaryButtonStyle: CSS.Properties = useMemo(() => {
    return {
      cursor: secondaryButtonCursor,
    };
  }, [secondaryButtonCursor]);

  return (
    <div
      className="secondary-button"
      style={secondaryButtonStyle}
      onClick={onCancelContainerClick}
    >
      <img className="bg-icon1" alt="" src={newImage} />
      <div className="label1">{label}</div>
    </div>
  );
};

export default SecondaryButton;
