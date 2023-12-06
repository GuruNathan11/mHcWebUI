import { FunctionComponent } from "react";
import ArrowCircleLeft1 from "./ArrowCircleLeft1";
import ArrowCircleLeft from "./ArrowCircleLeft";
import "./CreatePatientForm4.css";
import React from "react";

type CreatePatientForm4Type = {
  arrowCircleLeft?: boolean;
  arrowCircleLeft1?: boolean;
  arrowCircleLeft2?: boolean;
  arrowCircleLeft3?: boolean;
  arrowCircleLeft4?: boolean;
  arrowCircleLeft5?: boolean;
  arrowCircleLeft6?: boolean;
  arrowCircleLeft7?: boolean;

  /** Action props */
  onFrameContainer26Click?: () => void;
};

const CreatePatientForm4: FunctionComponent<CreatePatientForm4Type> = ({
  arrowCircleLeft,
  arrowCircleLeft1,
  arrowCircleLeft2,
  arrowCircleLeft3,
  arrowCircleLeft4,
  arrowCircleLeft5,
  arrowCircleLeft6,
  arrowCircleLeft7,
  onFrameContainer26Click,
}) => {
  return (
    <div className="frame-parent38">
      <div className="arrow-circle-left-parent">
        <ArrowCircleLeft1
          vector="/vector2.svg"
          prop="1"
          arrowCircleLeftFlexShrink="0"
        />
        <div className="basic-details3">Basic Details</div>
      </div>
      <div
        className="arrow-circle-left-group"
        onClick={onFrameContainer26Click}
      >
        {!arrowCircleLeft && (
          <div className="arrow-circle-left2">
            <img className="vector-icon5" alt="" src="/vector11.svg" />
            <div className="div13">1</div>
          </div>
        )}
        <ArrowCircleLeft
          vector="/vector21.svg"
          prop="2"
          arrowCircleLeftFlexShrink="0"
          divColor="#3f3f46"
        />
        <div className="insurance">Contact</div>
      </div>
      <div className="arrow-circle-left-container">
        {!arrowCircleLeft1 && (
          <div className="arrow-circle-left2">
            <img className="vector-icon5" alt="" src="/vector11.svg" />
            <div className="div13">1</div>
          </div>
        )}
        <ArrowCircleLeft
          vector="/vector21.svg"
          prop="3"
          arrowCircleLeftFlexShrink="0"
          divColor="#3f3f46"
        />
        <div className="insurance">Employer</div>
      </div>
      <div className="arrow-circle-left-container">
        {!arrowCircleLeft2 && (
          <div className="arrow-circle-left2">
            <img className="vector-icon5" alt="" src="/vector11.svg" />
            <div className="div13">1</div>
          </div>
        )}
        <ArrowCircleLeft
          vector="/vector21.svg"
          prop="4"
          arrowCircleLeftFlexShrink="0"
          divColor="#3f3f46"
        />
        <div className="insurance">Guardian</div>
      </div>
      <div className="arrow-circle-left-container">
        {!arrowCircleLeft3 && (
          <div className="arrow-circle-left2">
            <img className="vector-icon5" alt="" src="/vector11.svg" />
            <div className="div13">1</div>
          </div>
        )}
        <ArrowCircleLeft
          vector="/vector21.svg"
          prop="5"
          arrowCircleLeftFlexShrink="0"
          divColor="#3f3f46"
        />
        <div className="insurance">Misc</div>
      </div>
      <div className="arrow-circle-left-container">
        {!arrowCircleLeft4 && (
          <div className="arrow-circle-left2">
            <img className="vector-icon5" alt="" src="/vector11.svg" />
            <div className="div13">1</div>
          </div>
        )}
        <ArrowCircleLeft
          vector="/vector21.svg"
          prop="6"
          arrowCircleLeftFlexShrink="0"
          divColor="#3f3f46"
        />
        <div className="insurance">Stats</div>
      </div>
      <div className="arrow-circle-left-container">
        {!arrowCircleLeft5 && (
          <div className="arrow-circle-left2">
            <img className="vector-icon5" alt="" src="/vector11.svg" />
            <div className="div13">1</div>
          </div>
        )}
        <ArrowCircleLeft
          vector="/vector21.svg"
          prop="7"
          arrowCircleLeftFlexShrink="0"
          divColor="#3f3f46"
        />
        <div className="insurance">Insurance</div>
      </div>
      <div className="arrow-circle-left-container">
        {!arrowCircleLeft6 && (
          <div className="arrow-circle-left2">
            <img className="vector-icon5" alt="" src="/vector11.svg" />
            <div className="div13">1</div>
          </div>
        )}
        <ArrowCircleLeft
          vector="/vector21.svg"
          prop="8"
          arrowCircleLeftFlexShrink="0"
          divColor="#3f3f46"
        />
        <div className="insurance">Family Health History</div>
      </div>
      <div className="arrow-circle-left-container">
        {!arrowCircleLeft7 && (
          <div className="arrow-circle-left2">
            <img className="vector-icon5" alt="" src="/vector11.svg" />
            <div className="div13">1</div>
          </div>
        )}
        <ArrowCircleLeft
          vector="/vector21.svg"
          prop="9"
          arrowCircleLeftFlexShrink="0"
          divColor="#3f3f46"
        />
        <div className="insurance">Social History</div>
      </div>
    </div>
  );
};

export default CreatePatientForm4;
