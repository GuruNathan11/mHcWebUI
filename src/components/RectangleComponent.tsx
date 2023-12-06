import { FunctionComponent, useState, useMemo, useCallback } from "react";
import SideNav from "./SideNav";
import PortalPopup from "./PortalPopup";
import CSS, { Property } from "csstype";
import "./RectangleComponent.css";
import React from "react";

type RectangleComponentType = {
  showRectangleDiv?: boolean;

  /** Style props */
  rectangleDivPosition?: Property.Position;
  rectangleDivTop?: Property.Top;
  rectangleDivLeft?: Property.Left;
};

const RectangleComponent: FunctionComponent<RectangleComponentType> = ({
  showRectangleDiv,
  rectangleDivPosition,
  rectangleDivTop,
  rectangleDivLeft,
}) => {
  const [isSideNavOpen, setSideNavOpen] = useState(false);
  const rectangleDivStyle: CSS.Properties = useMemo(() => {
    return {
      position: rectangleDivPosition,
      top: rectangleDivTop,
      left: rectangleDivLeft,
    };
  }, [rectangleDivPosition, rectangleDivTop, rectangleDivLeft]);

  const openSideNav = useCallback(() => {
    setSideNavOpen(true);
  }, []);

  const closeSideNav = useCallback(() => {
    setSideNavOpen(false);
  }, []);

  return (
    <>
      <div
        className="rectangle-root"
        onClick={openSideNav}
        style={rectangleDivStyle}
      >
        {showRectangleDiv && <div className="component-child" />}
      </div>
      {isSideNavOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeSideNav}
        >
          <SideNav onClose={closeSideNav} />
        </PortalPopup>
      )}
    </>
  );
};

export default RectangleComponent;
