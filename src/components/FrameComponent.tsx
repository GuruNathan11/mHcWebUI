import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "./FrameComponent.css";
import React from "react";

type FrameComponentType = {
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
  admin?: boolean;
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
  frameDiv7?: boolean;
  menuIcon?: boolean;
  groupIcon3?: boolean;
  showAdmin?: boolean;
  dashboardIcon1?: boolean;
  invoiceIcon3?: boolean;
  reactIconsio5IoReceipt11?: boolean;
  chevronRightIcon3?: boolean;
  invoiceIcon11?: boolean;
  reactIconsio5IoReceipt31?: boolean;
  chevronRightIcon11?: boolean;
  invoiceIcon21?: boolean;
  reactIconsio5IoReceipt51?: boolean;
  chevronRightIcon21?: boolean;
  groupIcon11?: boolean;
  frameDiv8?: boolean;
  resourcesIcon1?: boolean;
  reactIconsriRiUser2Line11?: boolean;
  frameDiv11?: boolean;
  groupIcon21?: boolean;
  reactIconsriRiBriefcaseLi2?: boolean;
  frameDiv21?: boolean;
  timesheetsIcon1?: boolean;
  reactIconsioIoMdTime1?: boolean;
  frameDiv31?: boolean;
  companiesIcon1?: boolean;
  reactIconsriRiBuildingLin2?: boolean;
  frameDiv41?: boolean;
  frameDiv51?: boolean;
  meetingsIcon2?: boolean;
  reactIconsriRiCalendar2Li4?: boolean;
  frameDiv61?: boolean;
  meetingsIcon11?: boolean;
  reactIconsriRiCalendar2Li5?: boolean;
  showFrameDiv?: boolean;
  menuIcon1?: boolean;

  /** Style props */
  frameDivPosition?: Property.Position;
  frameDivTop?: Property.Top;
  frameDivLeft?: Property.Left;

  /** Action props */
  onAdminConfigurationClick?: () => void;
  onPatientsClick?: () => void;
  onStaffDetailsClick?: () => void;
  onOrgDetailsClick?: () => void;
};

const FrameComponent: FunctionComponent<FrameComponentType> = ({
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
  admin,
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
  frameDiv7,
  menuIcon,
  frameDivPosition,
  frameDivTop,
  frameDivLeft,
  onAdminConfigurationClick,
  onPatientsClick,
  onStaffDetailsClick,
  onOrgDetailsClick,
  groupIcon3,
  showAdmin,
  dashboardIcon1,
  invoiceIcon3,
  reactIconsio5IoReceipt11,
  chevronRightIcon3,
  invoiceIcon11,
  reactIconsio5IoReceipt31,
  chevronRightIcon11,
  invoiceIcon21,
  reactIconsio5IoReceipt51,
  chevronRightIcon21,
  groupIcon11,
  frameDiv8,
  resourcesIcon1,
  reactIconsriRiUser2Line11,
  frameDiv11,
  groupIcon21,
  reactIconsriRiBriefcaseLi2,
  frameDiv21,
  timesheetsIcon1,
  reactIconsioIoMdTime1,
  frameDiv31,
  companiesIcon1,
  reactIconsriRiBuildingLin2,
  frameDiv41,
  frameDiv51,
  meetingsIcon2,
  reactIconsriRiCalendar2Li4,
  frameDiv61,
  meetingsIcon11,
  reactIconsriRiCalendar2Li5,
  showFrameDiv,
  menuIcon1,
}) => {
  const frameDivStyle: CSS.Properties = useMemo(() => {
    return {
      position: frameDivPosition,
      top: frameDivTop,
      left: frameDivLeft,
    };
  }, [frameDivPosition, frameDivTop, frameDivLeft]);

  return (
    <div className="side-nav-parent" style={frameDivStyle}>
      <div className="side-nav2">
        {!groupIcon && (
          <img className="side-nav-child1" alt="" src={group506} />
        )}
        <div className="group-div">
          <div className="create-group">
            <img className="create-icon1" alt="" src="/create1.svg" />
            {!admin && <div className="admin14">Create New</div>}
          </div>
        </div>
        <div className="frame-parent3">
          <div className="dashboardicon-group">
            {!dashboardIcon && (
              <img
                className="dashboardicon1"
                alt=""
                src="/dashboardicon1.svg"
              />
            )}
            <img
              className="react-iconsriridashboardline3"
              alt=""
              src="/reacticonsriridashboardline1.svg"
            />
            <div className="admin15">Dashboard</div>
          </div>
          <div className="frame-parent4">
            <div className="invoice-parent1">
              {!invoiceIcon && (
                <img className="invoice-icon3" alt="" src="/invoice.svg" />
              )}
              {!reactIconsio5IoReceipt1 && (
                <img
                  className="react-iconsio5ioreceipt3"
                  alt=""
                  src={reactIconsio5IoReceipt}
                />
              )}
              <img className="users-icon2" alt="" src="/users1.svg" />
              <div className="admin16">Patients</div>
            </div>
            {!chevronRightIcon && (
              <img className="chevron-right-icon3" alt="" src={chevronRight} />
            )}
          </div>
          <div className="frame-parent4">
            <div className="invoice-parent1">
              {!invoiceIcon1 && (
                <img className="invoice-icon3" alt="" src="/invoice.svg" />
              )}
              {!reactIconsio5IoReceipt3 && (
                <img
                  className="react-iconsio5ioreceipt3"
                  alt=""
                  src={reactIconsio5IoReceipt2}
                />
              )}
              <img
                className="react-iconsriridashboardline3"
                alt=""
                src={reactIconsriRiUserSetting}
              />
              <div className="admin16">Staff Details</div>
            </div>
            {!chevronRightIcon1 && (
              <img className="chevron-right-icon3" alt="" src={chevronRight1} />
            )}
          </div>
          <div className="frame-parent4">
            <div className="invoice-parent1">
              {!invoiceIcon2 && (
                <img className="invoice-icon3" alt="" src="/invoice1.svg" />
              )}
              {!reactIconsio5IoReceipt5 && (
                <img
                  className="react-iconsio5ioreceipt3"
                  alt=""
                  src={reactIconsio5IoReceipt4}
                />
              )}
              <img
                className="react-iconsriridashboardline3"
                alt=""
                src={reactIconsriRiBuilding2Li}
              />
              <div className="admin16">Organization Details</div>
            </div>
            {!chevronRightIcon2 && (
              <img className="chevron-right-icon3" alt="" src={chevronRight2} />
            )}
          </div>
          <div className="file-document-container">
            <img className="users-icon2" alt="" src={fileDocument} />
            {!groupIcon1 && (
              <img className="frame-child1" alt="" src={group826} />
            )}
            <div className="admin19">Patient Management</div>
          </div>
          {!frameDiv && (
            <div className="resources-group">
              {!resourcesIcon && (
                <img className="invoice-icon3" alt="" src="/resources1.svg" />
              )}
              {!reactIconsriRiUser2Line1 && (
                <img
                  className="react-iconsio5ioreceipt3"
                  alt=""
                  src={reactIconsriRiUser2Line}
                />
              )}
              <img className="users-icon2" alt="" src={pocket} />
              <div className="admin20">Staff Details</div>
            </div>
          )}
          {!frameDiv1 && (
            <div className="frame-parent7">
              <div className="group-group">
                {!groupIcon2 && (
                  <img className="group-icon2" alt="" src="/group1.svg" />
                )}
                {!reactIconsriRiBriefcaseLi1 && (
                  <img
                    className="react-iconsio5ioreceipt3"
                    alt=""
                    src={reactIconsriRiBriefcaseLi}
                  />
                )}
                <img className="users-icon2" alt="" src={newspaper} />
                <div className="admin21">Q-15 Minutes Safety</div>
              </div>
              <div className="count1">
                <div className="count-item" />
                <div className="div3">12</div>
              </div>
            </div>
          )}
          {!frameDiv2 && (
            <div className="resources-group">
              {!timesheetsIcon && (
                <img className="dashboardicon1" alt="" src="/timesheets.svg" />
              )}
              {!reactIconsioIoMdTime && (
                <img
                  className="react-iconsioiomdtime1"
                  alt=""
                  src="/reacticonsioiomdtime11.svg"
                />
              )}
              <img className="users-icon2" alt="" src={dockBottom} />
              <div className="admin16">Content Management</div>
            </div>
          )}
          {!frameDiv3 && (
            <div className="resources-group">
              {!companiesIcon && (
                <img className="companies-icon1" alt="" src={companies} />
              )}
              {!reactIconsriRiBuildingLin1 && (
                <img
                  className="react-iconsio5ioreceipt3"
                  alt=""
                  src={reactIconsriRiBuildingLin}
                />
              )}
              <img className="users-icon2" alt="" src={briefcase} />
              <div className="admin23">Assignments</div>
            </div>
          )}
          {!frameDiv4 && (
            <div className="arrow-drop-down-24px-group">
              <img
                className="arrow-drop-down-24px-icon1"
                alt=""
                src="/arrow-drop-down-24px1.svg"
              />
              <div className="admin24">Settings</div>
            </div>
          )}
          <div className="dashboardicon-group">
            <img className="users-icon2" alt="" src={fileDocument1} />
            <div className="admin16">Admin Configuration</div>
          </div>
          {!frameDiv5 && (
            <div className="meetings-container">
              {!meetingsIcon && (
                <img className="dashboardicon1" alt="" src={meetings} />
              )}
              {!reactIconsriRiCalendar2Li1 && (
                <img
                  className="react-iconsio5ioreceipt3"
                  alt=""
                  src={reactIconsriRiCalendar2Li}
                />
              )}
              <img className="users-icon2" alt="" src="/chartbar1.svg" />
              <div className="admin16">Report/Dashboard</div>
            </div>
          )}
          {!frameDiv6 && (
            <div className="meetings-container">
              {!meetingsIcon1 && (
                <img className="dashboardicon1" alt="" src={meetings1} />
              )}
              {!reactIconsriRiCalendar2Li3 && (
                <img
                  className="react-iconsio5ioreceipt3"
                  alt=""
                  src={reactIconsriRiCalendar2Li2}
                />
              )}
              <img className="users-icon2" alt="" src={database} />
              <div className="admin16">Master Data Config</div>
            </div>
          )}
        </div>
        <img className="menu-icon3" alt="" src={menu} />
        {!frameDiv7 && (
          <div className="menu-group">
            {!menuIcon && (
              <img className="menu-icon4" alt="" src="/menu3.svg" />
            )}
            <img className="frame-child2" alt="" src={group8506} />
          </div>
        )}
        <div
          className="admin-configuration1"
          onClick={onAdminConfigurationClick}
        />
        <div className="patients2" onClick={onPatientsClick} />
        <div className="staff-details3" onClick={onStaffDetailsClick} />
        <div className="org-details1" onClick={onOrgDetailsClick} />
        <div className="side-nav-child2" />
      </div>
      <img className="menu-icon5" alt="" src="/menu3.svg" />
    </div>
  );
};

export default FrameComponent;
