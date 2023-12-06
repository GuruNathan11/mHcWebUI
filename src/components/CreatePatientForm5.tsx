import { FunctionComponent } from "react";
import ArrowCircleLeft1 from "./ArrowCircleLeft1";
import ArrowCircleLeft from "./ArrowCircleLeft";
import "./CreatePatientForm5.css";
import React from "react";
const CreatePatientForm5: FunctionComponent = () => {
  return (
    <div className="frame-parent42">
      <div className="arrow-circle-left-parent34">
        <img
          className="arrow-circle-left-icon21"
          alt=""
          src="/arrowcircleleft.svg"
        />
        <div className="basic-details7">Basic Details</div>
      </div>
      <div className="arrow-circle-left-parent35">
        <div className="arrow-circle-left34">
          <img className="vector-icon37" alt="" src="/vector11.svg" />
          <div className="div50">1</div>
        </div>
        <img
          className="arrow-circle-left-icon21"
          alt=""
          src="/arrowcircleleft.svg"
        />
        <div className="contact8">Contact</div>
      </div>
      <div className="arrow-circle-left-parent35">
        <div className="arrow-circle-left34">
          <img className="vector-icon37" alt="" src="/vector11.svg" />
          <div className="div50">1</div>
        </div>
        <img
          className="arrow-circle-left-icon21"
          alt=""
          src="/arrowcircleleft.svg"
        />
        <div className="contact8">Employer</div>
      </div>
      <div className="arrow-circle-left-parent35">
        <div className="arrow-circle-left34">
          <img className="vector-icon37" alt="" src="/vector11.svg" />
          <div className="div50">1</div>
        </div>
        <img
          className="arrow-circle-left-icon21"
          alt=""
          src="/arrowcircleleft.svg"
        />
        <div className="contact8">Guardian</div>
      </div>
      <div className="arrow-circle-left-parent35">
        <div className="arrow-circle-left34">
          <img className="vector-icon37" alt="" src="/vector11.svg" />
          <div className="div50">1</div>
        </div>
        <img
          className="arrow-circle-left-icon21"
          alt=""
          src="/arrowcircleleft.svg"
        />
        <div className="contact8">Misc</div>
      </div>
      <div className="arrow-circle-left-parent35">
        <div className="arrow-circle-left34">
          <img className="vector-icon37" alt="" src="/vector11.svg" />
          <div className="div50">1</div>
        </div>
        <ArrowCircleLeft1
          vector="/vector2.svg"
          prop="6"
          arrowCircleLeftFlexShrink="0"
        />
        <div className="stats5">Stats</div>
      </div>
      <div className="arrow-circle-left-parent35">
        <div className="arrow-circle-left34">
          <img className="vector-icon37" alt="" src="/vector11.svg" />
          <div className="div50">1</div>
        </div>
        <ArrowCircleLeft
          vector="/vector21.svg"
          prop="7"
          arrowCircleLeftFlexShrink="0"
          divColor="#3f3f46"
        />
        <div className="insurance4">Insurance</div>
      </div>
      <div className="arrow-circle-left-parent35">
        <div className="arrow-circle-left34">
          <img className="vector-icon37" alt="" src="/vector11.svg" />
          <div className="div50">1</div>
        </div>
        <ArrowCircleLeft
          vector="/vector21.svg"
          prop="8"
          arrowCircleLeftFlexShrink="0"
          divColor="#3f3f46"
        />
        <div className="insurance4">Family Health History</div>
      </div>
      <div className="arrow-circle-left-parent35">
        <div className="arrow-circle-left34">
          <img className="vector-icon37" alt="" src="/vector11.svg" />
          <div className="div50">1</div>
        </div>
        <ArrowCircleLeft
          vector="/vector21.svg"
          prop="9"
          arrowCircleLeftFlexShrink="0"
          divColor="#3f3f46"
        />
        <div className="insurance4">Social History</div>
      </div>
    </div>
  );
};

export default CreatePatientForm5;
