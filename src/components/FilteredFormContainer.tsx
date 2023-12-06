import { FunctionComponent, useCallback } from "react";
import "./FilteredFormContainer.css";
import React from "react";
const FilteredFormContainer: FunctionComponent = () => {
  const onBasicClick = useCallback(() => {
    // Please sync "mettlerhealth-create-patient" to the project
  }, []);

  const onContactClick = useCallback(() => {
    // Please sync "mettlerhealth-create-patient" to the project
  }, []);

  const onEmployerClick = useCallback(() => {
    // Please sync "mettlerhealth-create-patient" to the project
  }, []);

  const onGuardianClick = useCallback(() => {
    // Please sync "mettlerhealth-create-patient" to the project
  }, []);

  const onMiscClick = useCallback(() => {
    // Please sync "mettlerhealth-create-patient" to the project
  }, []);

  const onStatsClick = useCallback(() => {
    // Please sync "mettlerhealth-create-patient" to the project
  }, []);

  const onInsuranceClick = useCallback(() => {
    // Please sync "mettlerhealth-create-patient" to the project
  }, []);

  const onFamilyClick = useCallback(() => {
    // Please sync "mettlerhealth-create-patient" to the project
  }, []);

  const onSocialClick = useCallback(() => {
    // Please sync "mettlerhealth-create-patient" to the project
  }, []);

  return (
    <div className="component-515">
      <div className="basic1" onClick={onBasicClick} />
      <div className="contact5" onClick={onContactClick} />
      <div className="employer1" onClick={onEmployerClick} />
      <div className="guardian1" onClick={onGuardianClick} />
      <div className="misc1" onClick={onMiscClick} />
      <div className="stats1" onClick={onStatsClick} />
      <div className="insurance1" onClick={onInsuranceClick} />
      <div className="family" onClick={onFamilyClick} />
      <div className="social" onClick={onSocialClick} />
    </div>
  );
};

export default FilteredFormContainer;
