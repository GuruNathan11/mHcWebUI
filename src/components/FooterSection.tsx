import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";
import "./FooterSection.css";
import React from "react";

type FooterSectionType = {
  /** Style props */
  propHeight?: Property.Height;
  propTop?: Property.Top;

  /** Action props */
  onPreviousContainerClick?: () => void;
  onNextContainerClick?: () => void;
};

const FooterSection: FunctionComponent<FooterSectionType> = ({
  propHeight,
  propTop,
  onPreviousContainerClick,
  onNextContainerClick,
}) => {
  const frameDiv2Style: CSS.Properties = useMemo(() => {
    return {
      height: propHeight,
      top: propTop,
    };
  }, [propHeight, propTop]);

  return (
    <div
      className="add-patient-family-health-his-inner2"
      style={frameDiv2Style}
    >
      <div className="cancel-parent3">
        <SecondaryButton label="Cancel" secondaryButtonCursor="unset" />
        <SecondaryButton
          label="Previous"
          secondaryButtonCursor="pointer"
          onCancelContainerClick={onPreviousContainerClick}
        />
        <PrimaryButton
          label="Next"
          primaryButtonCursor="pointer"
          onNextContainerClick={onNextContainerClick}
        />
      </div>
    </div>
  );
};

export default FooterSection;
