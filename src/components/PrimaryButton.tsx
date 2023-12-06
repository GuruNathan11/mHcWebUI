import React, { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "./PrimaryButton.css";
import newImage from './../assets/images/mettler_images/bg1.svg'

type PrimaryButtonType = {
  label?: string;

  /** Style props */
  primaryButtonCursor?: Property.Cursor;

  /** Action props */
  onNextContainerClick?: () => void;
};

const PrimaryButton: FunctionComponent<PrimaryButtonType> = ({
  label,
  primaryButtonCursor,
  onNextContainerClick,
}) => {
  const primaryButtonStyle: CSS.Properties = useMemo(() => {
    return {
      cursor: primaryButtonCursor,
    };
  }, [primaryButtonCursor]);

  return (
    <div
      className="primary-button"
      style={primaryButtonStyle}
      onClick={onNextContainerClick}
    >
      <img className="bg-icon" alt="" src={newImage} />
      <div className="label">{label}</div>
    </div>
  );
};

export default PrimaryButton;
