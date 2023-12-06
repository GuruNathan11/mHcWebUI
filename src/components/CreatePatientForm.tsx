import { FunctionComponent } from "react";
import ArrowCircleLeft1 from "./ArrowCircleLeft1";
import ArrowCircleLeft from "./ArrowCircleLeft";
import "./CreatePatientForm.css";
import React from "react";
const CreatePatientForm: FunctionComponent = () => {
  return (
    <div className="frame-parent41">
      <div className="arrow-circle-left-parent25">
        <img
          className="arrow-circle-left-icon15"
          alt=""
          src="/arrowcircleleft.svg"
        />
        <div className="basic-details6">Basic Details</div>
      </div>
      <div className="arrow-circle-left-parent26">
        <div className="arrow-circle-left26">
          <img className="vector-icon29" alt="" src="/vector11.svg" />
          <div className="div42">1</div>
        </div>
        <img
          className="arrow-circle-left-icon15"
          alt=""
          src="/arrowcircleleft.svg"
        />
        <div className="contact7">Contact</div>
      </div>
      <div className="arrow-circle-left-parent26">
        <div className="arrow-circle-left26">
          <img className="vector-icon29" alt="" src="/vector11.svg" />
          <div className="div42">1</div>
        </div>
        <img
          className="arrow-circle-left-icon15"
          alt=""
          src="/arrowcircleleft.svg"
        />
        <div className="contact7">Employer</div>
      </div>
      <div className="arrow-circle-left-parent26">
        <div className="arrow-circle-left26">
          <img className="vector-icon29" alt="" src="/vector11.svg" />
          <div className="div42">1</div>
        </div>
        <img
          className="arrow-circle-left-icon15"
          alt=""
          src="/arrowcircleleft.svg"
        />
        <div className="contact7">Guardian</div>
      </div>
      <div className="arrow-circle-left-parent26">
        <div className="arrow-circle-left26">
          <img className="vector-icon29" alt="" src="/vector11.svg" />
          <div className="div42">1</div>
        </div>
        <img
          className="arrow-circle-left-icon15"
          alt=""
          src="/arrowcircleleft.svg"
        />
        <div className="contact7">Misc</div>
      </div>
      <div className="arrow-circle-left-parent26">
        <div className="arrow-circle-left26">
          <img className="vector-icon29" alt="" src="/vector11.svg" />
          <div className="div42">1</div>
        </div>
        <img
          className="arrow-circle-left-icon15"
          alt=""
          src="/arrowcircleleft.svg"
        />
        <div className="contact7">Stats</div>
      </div>
      <div className="arrow-circle-left-parent26">
        <div className="arrow-circle-left26">
          <img className="vector-icon29" alt="" src="/vector11.svg" />
          <div className="div42">1</div>
        </div>
        <ArrowCircleLeft1
          vector="/vector2.svg"
          prop="7"
          arrowCircleLeftFlexShrink="0"
        />
        <div className="insurance3">Insurance</div>
      </div>
      <div className="arrow-circle-left-parent26">
        <div className="arrow-circle-left26">
          <img className="vector-icon29" alt="" src="/vector11.svg" />
          <div className="div42">1</div>
        </div>
        <ArrowCircleLeft
          vector="/vector21.svg"
          prop="8"
          arrowCircleLeftFlexShrink="0"
          divColor="#3f3f46"
        />
        <div className="family-health-history4">Family Health History</div>
      </div>
      <div className="arrow-circle-left-parent26">
        <div className="arrow-circle-left26">
          <img className="vector-icon29" alt="" src="/vector11.svg" />
          <div className="div42">1</div>
        </div>
        <ArrowCircleLeft
          vector="/vector21.svg"
          prop="9"
          arrowCircleLeftFlexShrink="0"
          divColor="#3f3f46"
        />
        <div className="family-health-history4">Social History</div>
      </div>
    </div>
  );
};

export default CreatePatientForm;
