import { FunctionComponent } from "react";
import "./CreatePatientForm9.css";
import React from "react";

type CreatePatientForm9Type = {
  /** Action props */
  onContactClick?: () => void;
  onEmployerClick?: () => void;
  onGuardianClick?: () => void;
  onMiscClick?: () => void;
  onStatsClick?: () => void;
  onInsuranceClick?: () => void;
  onFamilyHealthHistoryClick?: () => void;
  onSocialHistoryClick?: () => void;
};

const CreatePatientForm9: FunctionComponent<CreatePatientForm9Type> = ({
  onContactClick,
  onEmployerClick,
  onGuardianClick,
  onMiscClick,
  onStatsClick,
  onInsuranceClick,
  onFamilyHealthHistoryClick,
  onSocialHistoryClick,
}) => {
  return (
    <div className="component-517">
      <div className="component-517-child" />
      <div className="basic-details12" />
      <div className="contact13" onClick={onContactClick} />
      <div className="employer10" onClick={onEmployerClick} />
      <div className="guardian10" onClick={onGuardianClick} />
      <div className="misc10" onClick={onMiscClick} />
      <div className="stats10" onClick={onStatsClick} />
      <div className="insurance9" onClick={onInsuranceClick} />
      <div
        className="family-health-history10"
        onClick={onFamilyHealthHistoryClick}
      />
      <div className="social-history10" onClick={onSocialHistoryClick} />
    </div>
  );
};

export default CreatePatientForm9;
