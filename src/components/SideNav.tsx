import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "./SideNav.css";
import React from "react";
import create1Image from './../assets/images/mettler_images/create1.svg';
import dashboardicon1Image from './../assets/images/mettler_images/dashboardicon1.svg';
import reacticonsriridashboardline1 from './../assets/images/mettler_images/reacticonsriridashboardline1.svg';
import invoice from './../assets/images/mettler_images/invoice.svg';

type SideNavType = {
  onClose?: () => void;
  group506?: string;
  reactIconsio5IoReceipt?: string;
  chevronRight?: string;
  reactIconsio5IoReceipt2?: string;
  reactIconsriRiUserSetting?: string;
  chevronRight1?: string;
  reactIconsio5IoReceipt4?: string;
  reactIconsriRiBuilding2Li?: string;
  chevronRight2?: string;
  fileDocument?: string;
  group826?: string;
  reactIconsriRiUser2Line?: string;
  pocket?: string;
  reactIconsriRiBriefcaseLi?: string;
  newspaper?: string;
  dockBottom?: string;
  companies?: string;
  reactIconsriRiBuildingLin?: string;
  briefcase?: string;
  fileDocument1?: string;
  meetings?: string;
  reactIconsriRiCalendar2Li?: string;
  meetings1?: string;
  reactIconsriRiCalendar2Li2?: string;
  database?: string;
  menu?: string;
  group8506?: string;
  groupIcon?: boolean;
  showAdmin?: boolean;
  dashboardIcon?: boolean;
  invoiceIcon?: boolean;
  reactIconsio5IoReceipt1?: boolean;
  chevronRightIcon?: boolean;
  invoiceIcon1?: boolean;
  reactIconsio5IoReceipt3?: boolean;
  chevronRightIcon1?: boolean;
  invoiceIcon2?: boolean;
  reactIconsio5IoReceipt5?: boolean;
  chevronRightIcon2?: boolean;
  groupIcon1?: boolean;
  frameDiv?: boolean;
  resourcesIcon?: boolean;
  reactIconsriRiUser2Line1?: boolean;
  frameDiv1?: boolean;
  groupIcon2?: boolean;
  reactIconsriRiBriefcaseLi1?: boolean;
  frameDiv2?: boolean;
  timesheetsIcon?: boolean;
  reactIconsioIoMdTime?: boolean;
  frameDiv3?: boolean;
  companiesIcon?: boolean;
  reactIconsriRiBuildingLin1?: boolean;
  frameDiv4?: boolean;
  frameDiv5?: boolean;
  meetingsIcon?: boolean;
  reactIconsriRiCalendar2Li1?: boolean;
  frameDiv6?: boolean;
  meetingsIcon1?: boolean;
  reactIconsriRiCalendar2Li3?: boolean;
  showFrameDiv?: boolean;
  menuIcon?: boolean;

  /** Style props */
  sideNavPosition?: Property.Position;
  sideNavMaxWidth?: Property.MaxWidth;
  sideNavMaxHeight?: Property.MaxHeight;
  sideNavTop?: Property.Top;
  sideNavLeft?: Property.Left;
  groupDivWidth?: Property.Width;

  /** Action props */
  onAdminConfigurationClick?: () => void;
  onPatientsClick?: () => void;
  onStaffDetailsClick?: () => void;
  onOrgDetailsClick?: () => void;
};

const SideNav: FunctionComponent<SideNavType> = ({
  onClose,
  group506,
  reactIconsio5IoReceipt,
  chevronRight,
  reactIconsio5IoReceipt2,
  reactIconsriRiUserSetting,
  chevronRight1,
  reactIconsio5IoReceipt4,
  reactIconsriRiBuilding2Li,
  chevronRight2,
  fileDocument,
  group826,
  reactIconsriRiUser2Line,
  pocket,
  reactIconsriRiBriefcaseLi,
  newspaper,
  dockBottom,
  companies,
  reactIconsriRiBuildingLin,
  briefcase,
  fileDocument1,
  meetings,
  reactIconsriRiCalendar2Li,
  meetings1,
  reactIconsriRiCalendar2Li2,
  database,
  menu,
  group8506,
  groupIcon,
  showAdmin,
  dashboardIcon,
  invoiceIcon,
  reactIconsio5IoReceipt1,
  chevronRightIcon,
  invoiceIcon1,
  reactIconsio5IoReceipt3,
  chevronRightIcon1,
  invoiceIcon2,
  reactIconsio5IoReceipt5,
  chevronRightIcon2,
  groupIcon1,
  frameDiv,
  resourcesIcon,
  reactIconsriRiUser2Line1,
  frameDiv1,
  groupIcon2,
  reactIconsriRiBriefcaseLi1,
  frameDiv2,
  timesheetsIcon,
  reactIconsioIoMdTime,
  frameDiv3,
  companiesIcon,
  reactIconsriRiBuildingLin1,
  frameDiv4,
  frameDiv5,
  meetingsIcon,
  reactIconsriRiCalendar2Li1,
  frameDiv6,
  meetingsIcon1,
  reactIconsriRiCalendar2Li3,
  showFrameDiv,
  menuIcon,
  sideNavPosition,
  sideNavMaxWidth,
  sideNavMaxHeight,
  sideNavTop,
  sideNavLeft,
  groupDivWidth,
  onAdminConfigurationClick,
  onPatientsClick,
  onStaffDetailsClick,
  onOrgDetailsClick,
}) => {
  const sideNavStyle: CSS.Properties = useMemo(() => {
    return {
      position: sideNavPosition,
      maxWidth: sideNavMaxWidth,
      maxHeight: sideNavMaxHeight,
      top: sideNavTop,
      left: sideNavLeft,
    };
  }, [
    sideNavPosition,
    sideNavMaxWidth,
    sideNavMaxHeight,
    sideNavTop,
    sideNavLeft,
  ]);

  const groupDivStyle: CSS.Properties = useMemo(() => {
    return {
      width: groupDivWidth,
    };
  }, [groupDivWidth]);

  return (
    <div className="side-nav1" style={sideNavStyle}>
      {!groupIcon && <img className="side-nav-child" alt="" src={group506} />}
      <div className="side-nav-inner" style={groupDivStyle}>
        <div className="create-parent">
          <img className="create-icon" alt="" src={create1Image} />
          {showAdmin && <div className="admin">Create New</div>}
        </div>
      </div>
      <div className="frame-group">
        <div className="dashboardicon-parent">
          {!dashboardIcon && (
            <img className="dashboardicon" alt="" src={dashboardicon1Image} />
          )}
          <img
            className="react-iconsriridashboardline2"
            alt=""
            src={reacticonsriridashboardline1}
          />
          <div className="admin1">Dashboard</div>
        </div>
        <div className="frame-container">
          <div className="invoice-parent">
            {!invoiceIcon && (
              <img className="invoice-icon" alt="" src={invoice} />
            )}
            {!reactIconsio5IoReceipt1 && (
              <img
                className="react-iconsio5ioreceipt"
                alt=""
                src={reactIconsio5IoReceipt}
              />
            )}
            <img className="pocket-icon" alt="" src="/users1.svg" />
            <div className="admin2">Patients</div>
          </div>
          {!chevronRightIcon && (
            <img className="chevron-right-icon" alt="" src={chevronRight} />
          )}
        </div>
        <div className="frame-container">
          <div className="invoice-parent">
            {!invoiceIcon1 && (
              <img className="invoice-icon" alt="" src="/invoice.svg" />
            )}
            {!reactIconsio5IoReceipt3 && (
              <img
                className="react-iconsio5ioreceipt"
                alt=""
                src={reactIconsio5IoReceipt2}
              />
            )}
            <img
              className="react-iconsriridashboardline2"
              alt=""
              src={reactIconsriRiUserSetting}
            />
            <div className="admin2">Staff Details</div>
          </div>
          {!chevronRightIcon1 && (
            <img className="chevron-right-icon" alt="" src={chevronRight1} />
          )}
        </div>
        <div className="frame-container">
          <div className="invoice-parent">
            {!invoiceIcon2 && (
              <img className="invoice-icon" alt="" src="/invoice1.svg" />
            )}
            {!reactIconsio5IoReceipt5 && (
              <img
                className="react-iconsio5ioreceipt"
                alt=""
                src={reactIconsio5IoReceipt4}
              />
            )}
            <img
              className="react-iconsriridashboardline2"
              alt=""
              src={reactIconsriRiBuilding2Li}
            />
            <div className="admin2">Organization Details</div>
          </div>
          {!chevronRightIcon2 && (
            <img className="chevron-right-icon" alt="" src={chevronRight2} />
          )}
        </div>
        <div className="file-document-parent">
          <img className="pocket-icon" alt="" src={fileDocument} />
          {!groupIcon1 && <img className="frame-item" alt="" src={group826} />}
          <div className="admin5">Patient Management</div>
        </div>
        {!frameDiv && (
          <div className="resources-parent">
            {!resourcesIcon && (
              <img className="invoice-icon" alt="" src="/resources1.svg" />
            )}
            {!reactIconsriRiUser2Line1 && (
              <img
                className="react-iconsio5ioreceipt"
                alt=""
                src={reactIconsriRiUser2Line}
              />
            )}
            <img className="pocket-icon" alt="" src={pocket} />
            <div className="admin6">Staff Details</div>
          </div>
        )}
        {!frameDiv1 && (
          <div className="frame-parent2">
            <div className="group-parent">
              {!groupIcon2 && (
                <img className="group-icon1" alt="" src="/group1.svg" />
              )}
              {!reactIconsriRiBriefcaseLi1 && (
                <img
                  className="react-iconsio5ioreceipt"
                  alt=""
                  src={reactIconsriRiBriefcaseLi}
                />
              )}
              <img className="pocket-icon" alt="" src={newspaper} />
              <div className="admin7">Q-15 Minutes Safety</div>
            </div>
            <div className="count">
              <div className="count-child" />
              <div className="div2">12</div>
            </div>
          </div>
        )}
        {!frameDiv2 && (
          <div className="resources-parent">
            {!timesheetsIcon && (
              <img className="dashboardicon" alt="" src="/timesheets.svg" />
            )}
            {!reactIconsioIoMdTime && (
              <img
                className="react-iconsioiomdtime"
                alt=""
                src="/reacticonsioiomdtime11.svg"
              />
            )}
            <img className="pocket-icon" alt="" src={dockBottom} />
            <div className="admin2">Content Management</div>
          </div>
        )}
        {!frameDiv3 && (
          <div className="resources-parent">
            {!companiesIcon && (
              <img className="companies-icon" alt="" src={companies} />
            )}
            {!reactIconsriRiBuildingLin1 && (
              <img
                className="react-iconsio5ioreceipt"
                alt=""
                src={reactIconsriRiBuildingLin}
              />
            )}
            <img className="pocket-icon" alt="" src={briefcase} />
            <div className="admin9">Assignments</div>
          </div>
        )}
        {!frameDiv4 && (
          <div className="arrow-drop-down-24px-parent">
            <img
              className="arrow-drop-down-24px-icon"
              alt=""
              src="/arrow-drop-down-24px1.svg"
            />
            <div className="admin10">Settings</div>
          </div>
        )}
        <div className="dashboardicon-parent">
          <img className="pocket-icon" alt="" src={fileDocument1} />
          <div className="admin2">Admin Configuration</div>
        </div>
        {!frameDiv5 && (
          <div className="meetings-parent">
            {!meetingsIcon && (
              <img className="dashboardicon" alt="" src={meetings} />
            )}
            {!reactIconsriRiCalendar2Li1 && (
              <img
                className="react-iconsio5ioreceipt"
                alt=""
                src={reactIconsriRiCalendar2Li}
              />
            )}
            <img className="pocket-icon" alt="" src="/chartbar1.svg" />
            <div className="admin2">Report/Dashboard</div>
          </div>
        )}
        {!frameDiv6 && (
          <div className="meetings-parent">
            {!meetingsIcon1 && (
              <img className="dashboardicon" alt="" src={meetings1} />
            )}
            {!reactIconsriRiCalendar2Li3 && (
              <img
                className="react-iconsio5ioreceipt"
                alt=""
                src={reactIconsriRiCalendar2Li2}
              />
            )}
            <img className="pocket-icon" alt="" src={database} />
            <div className="admin2">Master Data Config</div>
          </div>
        )}
      </div>
      <img className="menu-icon1" alt="" src={menu} />
      {showFrameDiv && (
        <div className="menu-parent">
          {!menuIcon && <img className="menu-icon2" alt="" src="/menu3.svg" />}
          <img className="frame-inner" alt="" src={group8506} />
        </div>
      )}
      <div
        className="admin-configuration"
        onClick={onAdminConfigurationClick}
      />
      <div className="patients1" onClick={onPatientsClick} />
      <div className="staff-details2" onClick={onStaffDetailsClick} />
      <div className="org-details" onClick={onOrgDetailsClick} />
      <div className="side-nav-item" />
    </div>
  );
};

export default SideNav;
