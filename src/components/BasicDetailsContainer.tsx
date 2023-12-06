import { FunctionComponent, useCallback } from "react";
import FormsIdle from "./FormsIdle";
import Formsdropdown from "./Formsdropdown";
import FormDate from "./FormDate";
import "./BasicDetailsContainer.css";
import React from "react";
const BasicDetailsContainer: FunctionComponent = () => {
  const onFrameContainerClick = useCallback(() => {
    // Please sync "mettlerhealth-create-patient" to the project
  }, []);

  const onFrameContainer1Click = useCallback(() => {
    // Please sync "mettlerhealth-create-patient" to the project
  }, []);

  return (
    <div className="basic">
      <div className="basic-child" />
      <FormsIdle
        finalSizeWidth="SSN"
        parties="--"
        formsIdlePosition="absolute"
        formsIdleWidth="233px"
        formsIdleTop="351px"
        formsIdleLeft="29px"
      />
      <FormsIdle
        finalSizeWidth="License/ID"
        parties="--"
        formsIdlePosition="absolute"
        formsIdleWidth="234px"
        formsIdleTop="351px"
        formsIdleLeft="283px"
      />
      <Formsdropdown
        label="Marital Status"
        autoSuggest="Single"
        showRectangle
        showIconarrowDown
        showLabel
        showAutoSuggest
        formsdropdownPosition="absolute"
        formsdropdownWidth="233px"
        formsdropdownTop="351px"
        formsdropdownLeft="538px"
        iconarrowDownTop="calc(50% + 1px)"
      />
      <div className="formsdropdowngender-parent">
        <Formsdropdown
          label="Gender Identity"
          autoSuggest="Male"
          showRectangle
          showIconarrowDown
          showLabel={false}
          showAutoSuggest
          formsdropdownPosition="absolute"
          formsdropdownWidth="359px"
          formsdropdownTop="51px"
          formsdropdownLeft="0px"
          iconarrowDownTop="calc(50% + 1px)"
        />
        <Formsdropdown
          label="Gender Identity"
          autoSuggest="Identifies as Male"
          showRectangle
          showIconarrowDown
          showLabel={false}
          showAutoSuggest
          formsdropdownPosition="absolute"
          formsdropdownWidth="359px"
          formsdropdownTop="51px"
          formsdropdownLeft="380px"
          iconarrowDownTop="calc(50% + 1px)"
        />
        <div className="check-boxgary-parent2" onClick={onFrameContainerClick}>
          <div className="check-boxgary26">
            <div className="check-box26">
              <div className="check-box26">
                <div className="group-child32" />
              </div>
            </div>
          </div>
          <div className="declined-to-specify">Declined to Specify</div>
        </div>
        <div className="check-boxgary-parent3" onClick={onFrameContainer1Click}>
          <div className="check-boxgary26">
            <div className="check-box26">
              <div className="check-box26">
                <div className="group-child32" />
              </div>
            </div>
          </div>
          <div className="declined-to-specify">Declined to Specify</div>
        </div>
        <div className="gender">Gender</div>
        <div className="sexual-orientation">Sexual Orientation</div>
      </div>
      <FormDate
        finalSizeWidth="Date of Birth"
        parties="July 15, 1987"
        formDatePosition="absolute"
        formDateWidth="359px"
        formDateTop="263px"
        formDateLeft="29px"
      />
      <FormsIdle
        finalSizeWidth="First Name"
        parties="--"
        formsIdlePosition="absolute"
        formsIdleWidth="234px"
        formsIdleTop="176px"
        formsIdleLeft="29px"
      />
      <FormsIdle
        finalSizeWidth="Email ID"
        parties="--"
        formsIdlePosition="absolute"
        formsIdleWidth="359px"
        formsIdleTop="263px"
        formsIdleLeft="412px"
      />
      <FormsIdle
        finalSizeWidth="Middle Name"
        parties="--"
        formsIdlePosition="absolute"
        formsIdleWidth="234px"
        formsIdleTop="176px"
        formsIdleLeft="283px"
      />
      <FormsIdle
        finalSizeWidth="Last Name"
        parties="--"
        formsIdlePosition="absolute"
        formsIdleWidth="234px"
        formsIdleTop="176px"
        formsIdleLeft="537px"
      />
      <Formsdropdown
        label="Title"
        autoSuggest="Mr."
        showRectangle
        showIconarrowDown
        showLabel
        showAutoSuggest
        formsdropdownPosition="absolute"
        formsdropdownWidth="488px"
        formsdropdownTop="85px"
        formsdropdownLeft="29px"
        iconarrowDownTop="calc(50% + 1px)"
      />
      <div className="basic-item" />
      <div className="contact3">
        <div className="expand-more-24px-parent2">
          <img
            className="expand-more-24px-icon4"
            alt=""
            src="/expand-more-24px.svg"
          />
          <div className="basic-details1">Basic Details</div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsContainer;
