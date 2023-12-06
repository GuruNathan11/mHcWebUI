import { FunctionComponent, useCallback } from "react";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";
import "./BottomFooter.css";
import React from "react";
import newImage from './../assets/images/mettler_images/bg.svg';

const BottomFooter: FunctionComponent = () => {
  const onCancelContainerClick = useCallback(() => {
    // Please sync "mettlerhealth Login" to the project
  }, []);

  const onNextContainerClick = useCallback(() => {
    // Please sync "mettlerhealth-create-patient" to the project
  }, []);

  return (
    <div className="component-5011">
      <div className="cancel-group">
        <SecondaryButton
          label="Cancel"
          secondaryButtonCursor="pointer"
          onCancelContainerClick={onCancelContainerClick}
        />
        <div className="previous1">
          <img className="bg-icon3" alt="" src={newImage} />
          <div className="label5">Previous</div>
        </div>
        <PrimaryButton
          label="Save"
          primaryButtonCursor="pointer"
          onNextContainerClick={onNextContainerClick}
        />
      </div>
    </div>
  );
};

export default BottomFooter;
