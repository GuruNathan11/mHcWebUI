import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BasicDetailsContainer from "./BasicDetailsContainer";
import FormDate from "./FormDate";
import FormsIdle from "./FormsIdle";
import Formsdropdown from "./Formsdropdown";
import Footer from "./Footer";
import Header from "./Header";
import SocialHistoryContainer from "./SocialHistoryContainer";
import FilteredFormContainer from "./FilteredFormContainer";
import FrameComponent from "./FrameComponent";
import "./MettlerhealthCreatePatient.css";
import React from "react";

type MettlerhealthCreatePatientType = {
  onClose?: () => void;
};

const MettlerhealthCreatePatient: FunctionComponent<
  MettlerhealthCreatePatientType
> = ({ onClose }) => {
  const navigate = useNavigate();

  const onCancelContainerClick = useCallback(() => {
    // Please sync "mettlerhealth Login" to the project
  }, []);

  const onNextContainerClick = useCallback(() => {
    // Please sync "mettlerhealth-create-patient" to the project
  }, []);

  const onAdminConfigurationClick = useCallback(() => {
    // Please sync "mettlerhealth Login" to the project
  }, []);

  const onPatientsClick = useCallback(() => {
    // Please sync "mettlerhealth Login" to the project
  }, []);

  const onStaffDetailsClick = useCallback(() => {
    navigate("/staff-details");
  }, [navigate]);

  const onOrgDetailsClick = useCallback(() => {
    // Please sync "mettlerhealth Login" to the project
  }, []);

  return (
    <div className="mettlerhealth-create-patient">
      <div className="mettlerhealth-create-patient-child" />
      <BasicDetailsContainer />
      <img
        className="doctor-tools-and-medical-eleme-icon"
        alt=""
        src="/doctor-tools-and-medical-elements-pattern-cartoon-hand-drawn-cartoon-art-illustration-converted-1@2x.png"
      />
      <div className="mettlerhealth-create-patient-item" />
      <img className="group-icon5" alt="" src="/group.svg" />
      <div className="error-message2">Error Message</div>
      <div className="menu-container">
        <div className="menu">
          <div className="rectangle-parent3">
            <div className="instance-inner" />
            <div className="frame-wrapper">
              <div className="create-container">
                <img className="create-icon2" alt="" src="/create.svg" />
                <div className="admin28">Create New</div>
              </div>
            </div>
            <div className="frame-parent11">
              <div className="dashboardicon-container">
                <img
                  className="dashboardicon2"
                  alt=""
                  src="/dashboardicon.svg"
                />
                <img
                  className="react-iconsririsettings4line"
                  alt=""
                  src="/reacticonsriridashboardline.svg"
                />
                <div className="admin29">Dashboard</div>
              </div>
              <div className="file-document-parent4">
                <img
                  className="file-document-icon10"
                  alt=""
                  src="/filedocument21.svg"
                />
                <img className="frame-child5" alt="" src="/group-826.svg" />
                <div className="admin30">Patient Management</div>
              </div>
              <div className="dashboardicon-container">
                <img className="resources-icon2" alt="" src="/resources.svg" />
                <img
                  className="react-iconsririuser2line2"
                  alt=""
                  src="/reacticonsririuser2line1.svg"
                />
                <img
                  className="file-document-icon10"
                  alt=""
                  src="/pocket1.svg"
                />
                <div className="admin31">Staff Details</div>
              </div>
              <div className="frame-parent12">
                <div className="group-parent2">
                  <img className="group-icon6" alt="" src="/group1.svg" />
                  <img
                    className="react-iconsririuser2line2"
                    alt=""
                    src="/reacticonsriribriefcaseline3.svg"
                  />
                  <img
                    className="file-document-icon10"
                    alt=""
                    src="/newspaper.svg"
                  />
                  <div className="admin32">Q-15 Minutes Safety</div>
                </div>
                <div className="count2">
                  <div className="count-inner" />
                  <div className="div9">12</div>
                </div>
              </div>
              <div className="dashboardicon-container">
                <img className="dashboardicon2" alt="" src="/timesheets.svg" />
                <img
                  className="react-iconsioiomdtime4"
                  alt=""
                  src="/reacticonsioiomdtime2.svg"
                />
                <img
                  className="file-document-icon10"
                  alt=""
                  src="/dockbottom.svg"
                />
                <div className="admin33">Content Management</div>
              </div>
              <div className="dashboardicon-container">
                <img className="companies-icon2" alt="" src="/companies.svg" />
                <img
                  className="react-iconsririuser2line2"
                  alt=""
                  src="/reacticonsriribuildingline.svg"
                />
                <img
                  className="file-document-icon10"
                  alt=""
                  src="/briefcase.svg"
                />
                <div className="admin34">Assignments</div>
              </div>
              <div className="arrow-drop-down-24px-container">
                <img
                  className="arrow-drop-down-24px-icon2"
                  alt=""
                  src="/arrow-drop-down-24px.svg"
                />
                <div className="admin35">Settings</div>
              </div>
              <div className="dashboardicon-container">
                <img
                  className="react-iconsririsettings4line"
                  alt=""
                  src="/reacticonsririsettings4line.svg"
                />
                <img
                  className="file-document-icon11"
                  alt=""
                  src="/filedocument111.svg"
                />
                <div className="admin34">Admin Settings</div>
              </div>
              <div className="frame-parent13">
                <div className="invoice-parent4">
                  <img className="resources-icon2" alt="" src="/invoice.svg" />
                  <img
                    className="react-iconsririuser2line2"
                    alt=""
                    src="/reacticonsio5ioreceipt.svg"
                  />
                  <img
                    className="file-document-icon10"
                    alt=""
                    src="/users.svg"
                  />
                  <div className="admin33">Inventory Management</div>
                </div>
                <img
                  className="chevron-right-icon6"
                  alt=""
                  src="/chevronright2.svg"
                />
              </div>
              <div className="meetings-parent2">
                <img className="dashboardicon2" alt="" src="/meetings.svg" />
                <img
                  className="react-iconsririuser2line2"
                  alt=""
                  src="/reacticonsriricalendar2line6.svg"
                />
                <img
                  className="file-document-icon10"
                  alt=""
                  src="/chartbar.svg"
                />
                <div className="admin33">Report/Dashboard</div>
              </div>
              <div className="meetings-parent2">
                <img className="dashboardicon2" alt="" src="/meetings.svg" />
                <img
                  className="react-iconsririuser2line2"
                  alt=""
                  src="/reacticonsriricalendar2line6.svg"
                />
                <img
                  className="file-document-icon10"
                  alt=""
                  src="/database.svg"
                />
                <div className="admin33">Master Data Config</div>
              </div>
            </div>
            <img className="instance-child1" alt="" src="/rectangle-13.svg" />
            <img className="instance-child2" alt="" src="/group-5065.svg" />
            <img className="instance-child3" alt="" src="/group-506111.svg" />
            <img className="menu-icon7" alt="" src="/menu.svg" />
          </div>
        </div>
        <img className="instance-child4" alt="" src="/rectangle-131.svg" />
        <img className="menu-icon8" alt="" src="/menu1.svg" />
      </div>
      <div className="rectangle-parent4">
        <div className="group-child26" />
        <FormDate
          finalSizeWidth="Date of Birth"
          parties="July 15, 1987"
          formDatePosition="absolute"
          formDateWidth="359px"
          formDateTop="265px"
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
          finalSizeWidth="S.S"
          parties="--"
          formsIdlePosition="absolute"
          formsIdleWidth="234px"
          formsIdleTop="356px"
          formsIdleLeft="29px"
        />
        <FormsIdle
          finalSizeWidth="Marital Status"
          parties="--"
          formsIdlePosition="absolute"
          formsIdleWidth="234px"
          formsIdleTop="446px"
          formsIdleLeft="29px"
        />
        <FormsIdle
          finalSizeWidth="Email ID"
          parties="--"
          formsIdlePosition="absolute"
          formsIdleWidth="359px"
          formsIdleTop="265px"
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
        <FormsIdle
          finalSizeWidth="License/ID"
          parties="--"
          formsIdlePosition="absolute"
          formsIdleWidth="234px"
          formsIdleTop="356px"
          formsIdleLeft="537px"
        />
        <FormsIdle
          finalSizeWidth="Sexual Orientation"
          parties="--"
          formsIdlePosition="absolute"
          formsIdleWidth="234px"
          formsIdleTop="446px"
          formsIdleLeft="537px"
        />
        <Formsdropdown
          label="Title"
          autoSuggest="R-Patient Room"
          showRectangle
          showIconarrowDown
          showLabel
          showAutoSuggest
          formsdropdownPosition="absolute"
          formsdropdownWidth="742px"
          formsdropdownTop="85px"
          formsdropdownLeft="29px"
          iconarrowDownTop="calc(50% + 25px)"
        />
        <Formsdropdown
          label="Gender"
          autoSuggest="Male"
          showRectangle
          showIconarrowDown
          showLabel
          showAutoSuggest
          formsdropdownPosition="absolute"
          formsdropdownWidth="234px"
          formsdropdownTop="356px"
          formsdropdownLeft="283px"
          iconarrowDownTop="calc(50% + 25px)"
        />
        <Formsdropdown
          label="Gender Identity"
          autoSuggest="Male"
          showRectangle
          showIconarrowDown
          showLabel
          showAutoSuggest
          formsdropdownPosition="absolute"
          formsdropdownWidth="234px"
          formsdropdownTop="446px"
          formsdropdownLeft="283px"
          iconarrowDownTop="calc(50% + 25px)"
        />
        <div className="group-child27" />
        <div className="contact2">
          <div className="expand-more-24px-parent1">
            <img
              className="expand-more-24px-icon3"
              alt=""
              src="/expand-more-24px.svg"
            />
            <div className="basic-details">Basic Details</div>
          </div>
        </div>
      </div>
      <Footer />
      <Header />
      <SocialHistoryContainer />
      <img
        className="perm-scan-wifi-24px-icon"
        alt=""
        src="/perm-scan-wifi-24px.svg"
      />
      <div className="mettlerhealth-create-patient-inner" />
      <div className="rectangle-parent5">
        <div className="group-child28" />
        <img className="group-child29" alt="" src="/vector-4966.svg" />
      </div>
      <FilteredFormContainer />
      <div className="rectangle-parent6">
        <div className="group-child30" />
        <div className="upload-profile-pic">Upload Profile Pic</div>
      </div>
      <FrameComponent
        group506="/group-5063.svg"
        reactIconsio5IoReceipt="/reacticonsio5ioreceipt.svg"
        chevronRight="/chevronright11.svg"
        reactIconsio5IoReceipt2="/reacticonsio5ioreceipt.svg"
        reactIconsriRiUserSetting="/reacticonsririusersettingsline1.svg"
        chevronRight1="/chevronright11.svg"
        reactIconsio5IoReceipt4="/reacticonsio5ioreceipt1.svg"
        reactIconsriRiBuilding2Li="/reacticonsriribuilding2line11.svg"
        chevronRight2="/chevronright21.svg"
        fileDocument="/filedocument3.svg"
        group826="/group-8261.svg"
        reactIconsriRiUser2Line="/reacticonsririuser2line11.svg"
        pocket="/pocket11.svg"
        reactIconsriRiBriefcaseLi="/reacticonsriribriefcaseline3.svg"
        newspaper="/newspaper1.svg"
        dockBottom="/dockbottom1.svg"
        companies="/companies.svg"
        reactIconsriRiBuildingLin="/reacticonsriribuildingline.svg"
        briefcase="/briefcase1.svg"
        fileDocument1="/filedocument4.svg"
        meetings="/meetings.svg"
        reactIconsriRiCalendar2Li="/reacticonsriricalendar2line6.svg"
        meetings1="/meetings1.svg"
        reactIconsriRiCalendar2Li2="/reacticonsriricalendar2line11.svg"
        database="/database1.svg"
        menu="/menu2.svg"
        group8506="/group-8506.svg"
        groupIcon={false}
        admin={false}
        dashboardIcon={false}
        invoiceIcon={false}
        reactIconsio5IoReceipt1={false}
        chevronRightIcon={false}
        invoiceIcon1={false}
        reactIconsio5IoReceipt3={false}
        chevronRightIcon1={false}
        invoiceIcon2={false}
        reactIconsio5IoReceipt5={false}
        chevronRightIcon2={false}
        groupIcon1={false}
        frameDiv={false}
        resourcesIcon={false}
        reactIconsriRiUser2Line1={false}
        frameDiv1={false}
        groupIcon2={false}
        reactIconsriRiBriefcaseLi1={false}
        frameDiv2={false}
        timesheetsIcon={false}
        reactIconsioIoMdTime={false}
        frameDiv3={false}
        companiesIcon={false}
        reactIconsriRiBuildingLin1={false}
        frameDiv4={false}
        frameDiv5={false}
        meetingsIcon={false}
        reactIconsriRiCalendar2Li1={false}
        frameDiv6={false}
        meetingsIcon1={false}
        reactIconsriRiCalendar2Li3={false}
        frameDiv7={false}
        menuIcon={false}
        frameDivPosition="absolute"
        frameDivTop="0px"
        frameDivLeft="0px"
        onAdminConfigurationClick={onAdminConfigurationClick}
        onPatientsClick={onPatientsClick}
        onStaffDetailsClick={onStaffDetailsClick}
        onOrgDetailsClick={onOrgDetailsClick}
        groupIcon3={false}
        showAdmin={false}
        dashboardIcon1={false}
        invoiceIcon3={false}
        reactIconsio5IoReceipt11={false}
        chevronRightIcon3={false}
        invoiceIcon11={false}
        reactIconsio5IoReceipt31={false}
        chevronRightIcon11={false}
        invoiceIcon21={false}
        reactIconsio5IoReceipt51={false}
        chevronRightIcon21={false}
        groupIcon11={false}
        frameDiv8={false}
        resourcesIcon1={false}
        reactIconsriRiUser2Line11={false}
        frameDiv11={false}
        groupIcon21={false}
        reactIconsriRiBriefcaseLi2={false}
        frameDiv21={false}
        timesheetsIcon1={false}
        reactIconsioIoMdTime1={false}
        frameDiv31={false}
        companiesIcon1={false}
        reactIconsriRiBuildingLin2={false}
        frameDiv41={false}
        frameDiv51={false}
        meetingsIcon2={false}
        reactIconsriRiCalendar2Li4={false}
        frameDiv61={false}
        meetingsIcon11={false}
        reactIconsriRiCalendar2Li5={false}
        showFrameDiv={false}
        menuIcon1={false}
      />
    </div>
  );
};

export default MettlerhealthCreatePatient;
