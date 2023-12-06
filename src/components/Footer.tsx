import { FunctionComponent, useCallback } from "react";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";
import "./Footer.css";
import React from "react";
const Footer: FunctionComponent = () => {
  const onCancelContainerClick = useCallback(() => {
    // Please sync "mettlerhealth Login" to the project
  }, []);

  const onNextContainerClick = useCallback(() => {
    // Please sync "mettlerhealth-create-patient" to the project
  }, []);

  return (
    <div className="component-5011">
      <div className="component-501-item" />
      <div className="cancel-group">
        <SecondaryButton
          label="Cancel"
          secondaryButtonCursor="pointer"
          onCancelContainerClick={onCancelContainerClick}
        />
        <div className="previous1">
          <img className="bg-icon3" alt="" src="/bg.svg" />
          <div className="label4">Previous</div>
        </div>
        <PrimaryButton
          label="Next"
          primaryButtonCursor="pointer"
          onNextContainerClick={onNextContainerClick}
        />
      </div>
    </div>
  );
};

export default Footer;
