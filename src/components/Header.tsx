import { FunctionComponent, useCallback } from "react";
import "./Header.css";
import React from "react";

const Header: FunctionComponent = () => {
  const onRectangle3Click = useCallback(() => {
    // Please sync "mettlerhealth Login" to the project
  }, []);

  return (
    <div className="component-516">
      <div className="component-516-child" />
      <div className="group-parent3">
        <div className="navigation-home-avatar-but-group">
          <img
            className="navigation-home-avatar-but1"
            alt=""
            src="/navigation--home--avatar-button2.svg"
          />
          <img
            className="merge-horizontal-icon2"
            alt=""
            src="/mergehorizontal.svg"
          />
          <div className="notifications-container">
            <img
              className="notifications-icon5"
              alt=""
              src="/notifications2.svg"
            />
            <div className="rectangle-parent8">
              <div className="group-child34" />
              <div className="div12">2</div>
            </div>
          </div>
          <img className="mail-icon4" alt="" src="/mail.svg" />
          <div className="rectangle-parent9">
            <div className="group-child34" />
            <div className="div12">2</div>
          </div>
        </div>
        <img className="cog-icon2" alt="" src="/cog.svg" />
      </div>
      <img className="component-516-item" alt="" src="/group-5062.svg" />
      <div className="file-document-parent6">
        <img
          className="file-document-icon14"
          alt=""
          src="/filedocument211.svg"
        />
        <img className="chevron-left-icon4" alt="" src="/chevronleft.svg" />
        <div className="patient-management4">Create Patient</div>
      </div>
      <div className="component-516-inner" onClick={onRectangle3Click} />
    </div>
  );
};

export default Header;
