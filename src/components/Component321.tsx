import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "./Component321.css";
import React from "react";

type Component321Type = {
  avatar?: string;
  notifications?: string;
  group506?: string;
  notifications1?: string;
  notificationImportant24px?: string;
  navigationHomeAvatarButto?: string;
  fileDocument?: string;
  patientManagement?: string;
  groupDiv?: boolean;
  notificationsIcon?: boolean;
  reactIconsioIoMdNotificat?: boolean;
  chevronLeftIcon?: boolean;

  /** Style props */
  component321Position?: Property.Position;
  component321Width?: Property.Width;
  component321Top?: Property.Top;
  component321Right?: Property.Right;
  component321Left?: Property.Left;
  groupDivHeight?: Property.Height;
  groupDivTop?: Property.Top;
  groupDivBottom?: Property.Bottom;
  mergeHorizontalIconHeight?: Property.Height;
  mergeHorizontalIconTop?: Property.Top;
  mergeHorizontalIconBottom?: Property.Bottom;
  groupDivHeight1?: Property.Height;
  groupDivTop1?: Property.Top;
  groupDivBottom1?: Property.Bottom;
  mailIconHeight?: Property.Height;
  mailIconTop?: Property.Top;
  mailIconBottom?: Property.Bottom;
  groupDivHeight2?: Property.Height;
  groupDivTop2?: Property.Top;
  groupDivBottom2?: Property.Bottom;
  cogIconHeight?: Property.Height;
  cogIconTop?: Property.Top;
  cogIconBottom?: Property.Bottom;
};

const Component321: FunctionComponent<Component321Type> = ({
  avatar,
  notifications,
  group506,
  notifications1,
  notificationImportant24px,
  navigationHomeAvatarButto,
  fileDocument,
  patientManagement,
  groupDiv,
  notificationsIcon,
  reactIconsioIoMdNotificat,
  chevronLeftIcon,
  component321Position,
  component321Width,
  component321Top,
  component321Right,
  component321Left,
  groupDivHeight,
  groupDivTop,
  groupDivBottom,
  mergeHorizontalIconHeight,
  mergeHorizontalIconTop,
  mergeHorizontalIconBottom,
  groupDivHeight1,
  groupDivTop1,
  groupDivBottom1,
  mailIconHeight,
  mailIconTop,
  mailIconBottom,
  groupDivHeight2,
  groupDivTop2,
  groupDivBottom2,
  cogIconHeight,
  cogIconTop,
  cogIconBottom,
}) => {
  const component321Style: CSS.Properties = useMemo(() => {
    return {
      position: component321Position,
      width: component321Width,
      top: component321Top,
      right: component321Right,
      left: component321Left,
    };
  }, [
    component321Position,
    component321Width,
    component321Top,
    component321Right,
    component321Left,
  ]);

  const groupDiv1Style: CSS.Properties = useMemo(() => {
    return {
      height: groupDivHeight,
      top: groupDivTop,
      bottom: groupDivBottom,
    };
  }, [groupDivHeight, groupDivTop, groupDivBottom]);

  const mergeHorizontalIconStyle: CSS.Properties = useMemo(() => {
    return {
      height: mergeHorizontalIconHeight,
      top: mergeHorizontalIconTop,
      bottom: mergeHorizontalIconBottom,
    };
  }, [
    mergeHorizontalIconHeight,
    mergeHorizontalIconTop,
    mergeHorizontalIconBottom,
  ]);

  const groupDiv2Style: CSS.Properties = useMemo(() => {
    return {
      height: groupDivHeight1,
      top: groupDivTop1,
      bottom: groupDivBottom1,
    };
  }, [groupDivHeight1, groupDivTop1, groupDivBottom1]);

  const mailIconStyle: CSS.Properties = useMemo(() => {
    return {
      height: mailIconHeight,
      top: mailIconTop,
      bottom: mailIconBottom,
    };
  }, [mailIconHeight, mailIconTop, mailIconBottom]);

  const groupDiv3Style: CSS.Properties = useMemo(() => {
    return {
      height: groupDivHeight2,
      top: groupDivTop2,
      bottom: groupDivBottom2,
    };
  }, [groupDivHeight2, groupDivTop2, groupDivBottom2]);

  const cogIconStyle: CSS.Properties = useMemo(() => {
    return {
      height: cogIconHeight,
      top: cogIconTop,
      bottom: cogIconBottom,
    };
  }, [cogIconHeight, cogIconTop, cogIconBottom]);

  return (
    <div className="component-321" style={component321Style}>
      <div className="component-321-child" />
      <img className="avatar-icon" alt="" src={avatar} />
      <div className="group-container" style={groupDiv1Style}>
        <div className="merge-horizontal-parent">
          <img
            className="merge-horizontal-icon"
            alt=""
            src="/mergehorizontal.svg"
            style={mergeHorizontalIconStyle}
          />
          <div className="notifications-parent" style={groupDiv2Style}>
            <img className="notifications-icon1" alt="" src={notifications} />
            <div className="rectangle-group">
              <div className="group-child7" />
              <div className="div4">2</div>
            </div>
          </div>
          <img
            className="mail-icon1"
            alt=""
            src="/mail.svg"
            style={mailIconStyle}
          />
          <div className="rectangle-container" style={groupDiv3Style}>
            <div className="group-child7" />
            <div className="div4">2</div>
          </div>
        </div>
        <img className="cog-icon" alt="" src="/cog.svg" style={cogIconStyle} />
      </div>
      <img className="component-321-item" alt="" src={group506} />
      {!groupDiv && (
        <div className="group-parent1">
          <div className="group-wrapper">
            <div className="merge-horizontal-parent">
              {!notificationsIcon && (
                <img
                  className="notifications-icon2"
                  alt=""
                  src={notifications1}
                />
              )}
              {!reactIconsioIoMdNotificat && (
                <img
                  className="react-iconsioiomdnotificatio"
                  alt=""
                  src="/reacticonsioiomdnotificationsoutline.svg"
                />
              )}
              <img
                className="notification-important-24px-icon"
                alt=""
                src={notificationImportant24px}
              />
              <div className="rectangle-parent1">
                <div className="group-child9" />
                <div className="div6">2</div>
              </div>
            </div>
          </div>
          <img className="cog-icon1" alt="" src="/cog1.svg" />
          <div className="navigation-home-avatar-but-parent">
            <img
              className="navigation-home-avatar-but"
              alt=""
              src={navigationHomeAvatarButto}
            />
            <img
              className="merge-horizontal-icon1"
              alt=""
              src="/mergehorizontal1.svg"
            />
          </div>
        </div>
      )}
      <div className="file-document-parent2">
        <img className="file-document-icon6" alt="" src={fileDocument} />
        {!chevronLeftIcon && (
          <img className="chevron-left-icon1" alt="" src="/chevronleft.svg" />
        )}
        <div className="patient-management1">{patientManagement}</div>
      </div>
    </div>
  );
};

export default Component321;
