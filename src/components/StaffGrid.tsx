import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "./StaffGrid.css";
import React from "react";
import rectangleImage from './../assets/images/mettler_images/rectangle-6604.svg';
import otionsImage from './../assets/images/mettler_images/otions.svg';
import rectangle6215Image from './../assets/images/mettler_images/rectangle-6215@2x.svg';
import checkboxblue from './../assets/images/mettler_images/checkboxblue.svg';

type StaffGridType = {
  checkBoxblueIcon?: boolean;
  showCheckBoxblueIcon?: boolean;

  /** Style props */
  staffGridPosition?: Property.Position;
  staffGridWidth?: Property.Width;
  staffGridTop?: Property.Top;
  staffGridRight?: Property.Right;
  staffGridLeft?: Property.Left;
};

const StaffGrid: FunctionComponent<StaffGridType> = ({
  checkBoxblueIcon,
  staffGridPosition,
  staffGridWidth,
  staffGridTop,
  staffGridRight,
  staffGridLeft,
  showCheckBoxblueIcon,
}) => {
  const staffGridStyle: CSS.Properties = useMemo(() => {
    return {
      position: staffGridPosition,
      width: staffGridWidth,
      top: staffGridTop,
      right: staffGridRight,
      left: staffGridLeft,
    };
  }, [
    staffGridPosition,
    staffGridWidth,
    staffGridTop,
    staffGridRight,
    staffGridLeft,
  ]);

  return (
    <div className="staff-grid21" style={staffGridStyle}>
      <img className="staff-grid-child16" alt="" src={rectangleImage} />
      <img className="otions-icon22" alt="" src={otionsImage} />
      <div className="id22">
        <div className="check-boxgary-container">
          <div className="check-boxgary24">
            <div className="check-box24">
              <div className="check-box24">
                <div className="group-child25" />
              </div>
            </div>
          </div>
          {checkBoxblueIcon && (
            <img
              className="check-boxblue-icon3"
              alt=""
              src={checkboxblue}
            />
          )}
        </div>
        <div className="mh480120">#MH4801</div>
      </div>
      <div className="date-of-birth22">May 14, 1987</div>
      <div className="ssn22">--</div>
      <div className="jobtitle22">--</div>
      <div className="department22">--</div>
      <div className="start-date22">May 1, 2021</div>
      <div className="name22">
        <img className="name-child18" alt="" src={rectangle6215Image} />
        <div className="mh480120">Koray Okumus</div>
      </div>
    </div>
  );
};

export default StaffGrid;
