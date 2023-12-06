import { FunctionComponent } from "react";
import ArrowCircleLeft1 from "./ArrowCircleLeft1";
import ArrowCircleLeft from "./ArrowCircleLeft";
import "./CreatePatientForm1.css";
import React from "react";
const CreatePatientForm1: FunctionComponent = () => {
  return (
    <div className="frame-parent43">
      <div className="arrow-circle-left-parent43">
        <img
          className="arrow-circle-left-icon26"
          alt=""
          src="/arrowcircleleft.svg"
        />
        <div className="basic-details8">Basic Details</div>
      </div>
      <div className="arrow-circle-left-parent44">
        <div className="arrow-circle-left42">
          <img className="vector-icon45" alt="" src="/vector11.svg" />
          <div className="div58">1</div>
        </div>
        <img
          className="arrow-circle-left-icon26"
          alt=""
          src="/arrowcircleleft.svg"
        />
        <div className="contact9">Contact</div>
      </div>
      <div className="arrow-circle-left-parent44">
        <div className="arrow-circle-left42">
          <img className="vector-icon45" alt="" src="/vector11.svg" />
          <div className="div58">1</div>
        </div>
        <img
          className="arrow-circle-left-icon26"
          alt=""
          src="/arrowcircleleft.svg"
        />
        <div className="contact9">Employer</div>
      </div>
      <div className="arrow-circle-left-parent44">
        <div className="arrow-circle-left42">
          <img className="vector-icon45" alt="" src="/vector11.svg" />
          <div className="div58">1</div>
        </div>
        <img
          className="arrow-circle-left-icon26"
          alt=""
          src="/arrowcircleleft.svg"
        />
        <div className="contact9">Guardian</div>
      </div>
      <div className="arrow-circle-left-parent44">
        <div className="arrow-circle-left42">
          <img className="vector-icon45" alt="" src="/vector11.svg" />
          <div className="div58">1</div>
        </div>
        <ArrowCircleLeft1
          vector="/vector2.svg"
          prop="5"
          arrowCircleLeftFlexShrink="0"
        />
        <div className="misc6">Misc</div>
      </div>
      <div className="arrow-circle-left-parent44">
        <div className="arrow-circle-left42">
          <img className="vector-icon45" alt="" src="/vector11.svg" />
          <div className="div58">1</div>
        </div>
        <ArrowCircleLeft
          vector="/vector21.svg"
          prop="6"
          arrowCircleLeftFlexShrink="0"
          divColor="#3f3f46"
        />
        <div className="stats6">Stats</div>
      </div>
      <div className="arrow-circle-left-parent44">
        <div className="arrow-circle-left42">
          <img className="vector-icon45" alt="" src="/vector11.svg" />
          <div className="div58">1</div>
        </div>
        <ArrowCircleLeft
          vector="/vector21.svg"
          prop="7"
          arrowCircleLeftFlexShrink="0"
          divColor="#3f3f46"
        />
        <div className="stats6">Insurance</div>
      </div>
      <div className="arrow-circle-left-parent44">
        <div className="arrow-circle-left42">
          <img className="vector-icon45" alt="" src="/vector11.svg" />
          <div className="div58">1</div>
        </div>
        <ArrowCircleLeft
          vector="/vector21.svg"
          prop="8"
          arrowCircleLeftFlexShrink="0"
          divColor="#3f3f46"
        />
        <div className="stats6">Family Health History</div>
      </div>
      <div className="arrow-circle-left-parent44">
        <div className="arrow-circle-left42">
          <img className="vector-icon45" alt="" src="/vector11.svg" />
          <div className="div58">1</div>
        </div>
        <ArrowCircleLeft
          vector="/vector21.svg"
          prop="9"
          arrowCircleLeftFlexShrink="0"
          divColor="#3f3f46"
        />
        <div className="stats6">Social History</div>
      </div>
    </div>
  );
};

export default CreatePatientForm1;
