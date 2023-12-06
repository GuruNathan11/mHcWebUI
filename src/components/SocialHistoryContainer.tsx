import { FunctionComponent, useCallback } from "react";
import "./SocialHistoryContainer.css";
import React from "react";
import vectorImage from './../assets/images/mettler_images/vector.svg';
import vector1Image from './../assets/images/mettler_images/vector1.svg';
import vector2Image from './../assets/images/mettler_images/vector2.svg';

const SocialHistoryContainer: FunctionComponent = () => {
  const onFrameContainer1Click = useCallback(() => {
    // Please sync "mettlerhealth Login" to the project
  }, []);

  return (
    <div className="frame-parent15">
      <div className="arrow-circle-left-parent">
        <div className="arrow-circle-left">
          <img className="vector-icon3" alt="" src={vectorImage} />
          <div className="div14">1</div>
        </div>
        <div className="basic-details2">Basic Details</div>
      </div>
      <div className="arrow-circle-left-group" onClick={onFrameContainer1Click}>
        <div className="arrow-circle-left1">
          <img className="vector-icon4" alt="" src={vector1Image} />
          <div className="div15">1</div>
        </div>
        <div className="arrow-circle-left2">
          <img className="vector-icon5" alt="" src={vector2Image} />
          <div className="div16">2</div>
        </div>
        <div className="employer">Contact</div>
      </div>
      <div className="arrow-circle-left-container">
        <div className="arrow-circle-left1">
          <img className="vector-icon4" alt="" src={vector1Image} />
          <div className="div15">1</div>
        </div>
        <div className="arrow-circle-left2">
          <img className="vector-icon5" alt="" src={vector2Image} />
          <div className="div16">3</div>
        </div>
        <div className="employer">Employer</div>
      </div>
      <div className="arrow-circle-left-container">
        <div className="arrow-circle-left1">
          <img className="vector-icon4" alt="" src={vector1Image} />
          <div className="div15">1</div>
        </div>
        <div className="arrow-circle-left2">
          <img className="vector-icon5" alt="" src={vector2Image} />
          <div className="div16">4</div>
        </div>
        <div className="employer">Guardian</div>
      </div>
      <div className="arrow-circle-left-container">
        <div className="arrow-circle-left1">
          <img className="vector-icon4" alt="" src={vector1Image} />
          <div className="div15">1</div>
        </div>
        <div className="arrow-circle-left2">
          <img className="vector-icon5" alt="" src={vector2Image} />
          <div className="div16">5</div>
        </div>
        <div className="employer">Misc</div>
      </div>
      <div className="arrow-circle-left-container">
        <div className="arrow-circle-left1">
          <img className="vector-icon4" alt="" src={vector1Image} />
          <div className="div15">1</div>
        </div>
        <div className="arrow-circle-left2">
          <img className="vector-icon5" alt="" src={vector2Image} />
          <div className="div16">6</div>
        </div>
        <div className="employer">Stats</div>
      </div>
      <div className="arrow-circle-left-container">
        <div className="arrow-circle-left1">
          <img className="vector-icon4" alt="" src={vector1Image} />
          <div className="div15">1</div>
        </div>
        <div className="arrow-circle-left2">
          <img className="vector-icon5" alt="" src={vector2Image} />
          <div className="div16">7</div>
        </div>
        <div className="employer">Insurance</div>
      </div>
      <div className="arrow-circle-left-container">
        <div className="arrow-circle-left1">
          <img className="vector-icon4" alt="" src={vector1Image} />
          <div className="div15">1</div>
        </div>
        <div className="arrow-circle-left2">
          <img className="vector-icon5" alt="" src={vector2Image} />
          <div className="div16">8</div>
        </div>
        <div className="employer">Family Health History</div>
      </div>
      <div className="arrow-circle-left-container">
        <div className="arrow-circle-left1">
          <img className="vector-icon4" alt="" src={vector1Image} />
          <div className="div15">1</div>
        </div>
        <div className="arrow-circle-left2">
          <img className="vector-icon5" alt="" src={vector2Image} />
          <div className="div16">9</div>
        </div>
        <div className="employer">Social History</div>
      </div>
    </div>
  );
};

export default SocialHistoryContainer;
