import React, { Dispatch, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import 'list-to-tree';
import 'array-to-tree';
import 'react-dropdown-tree-select/dist/styles.css'
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { connect, } from "react-redux";
import passcodeImage1 from "./../../../assets/images/mettler_images/passcodeImage.png"
import passcodeImage2 from "./../../../assets/images/mettler_images/passcodeImage2.png"
import { Button } from "primereact/button";
import * as Constants from "./../Constants/ConstantValues";
import { loginSecurity, verifyOtp } from "../../../store/actions/Login";
import inputSecurityLoginData from '../../../assets/data/SecurityLoginData.json';
import optData from '../../../assets/data/optData.json';
import { strictEqual } from "assert";
import { stringify } from "querystring";
interface ISecretKey { }
interface ISecretKey {
  props: RouteComponentProps;
  dispatch: Dispatch<any>;
  match: any;
  loginSecurityData: any;
  verifyOTPData: any;
  decryptscretkey: any;
  state: {
    nodes: [],
    checked: [],
    expanded: []
  }
}
const SecretKey: React.FC<ISecretKey> = ({
  match, dispatch, loginSecurityData, verifyOTPData, decryptscretkey


}) => {
  let [enteredPassword, setEnteredPassword] = useState("");
  const [decryptscretkeyId, setdecryptscretkey] = useState(decryptscretkey);
  let [encryptMail, setEncryptMail] = useState(null);
  const [passcodeImage, setPassCodeImage] = useState(null);
  let [decryptMail, setDecryptMail] = useState(null);
  useEffect(() => {
    setPassCodeImage(match.params.id);
    encryptMail = match.params.mail;
    setEncryptMail(match.params.mail);
    if (match.params.mail) {
      var CryptoJS = require("crypto-js");
      let decodesecretmail = decodeURIComponent(encryptMail);
      let decosesecrectkey = CryptoJS.AES.decrypt(decodesecretmail.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
      setDecryptMail(decosesecrectkey);


    }

    // console.log(JSON.stringify(match.params.mail));
    //  console.log(JSON.stringify(JSON.parse(window.localStorage.getItem("LOGINDATA"))));
    if (match.params.id) {
      decryptscretkey = match.params.id;
      setdecryptscretkey(decryptscretkey);
      var CryptoJS = require("crypto-js");
      let decodesecretid = decodeURIComponent(decryptscretkey);
      let decosesecrectkeyid = CryptoJS.AES.decrypt(decodesecretid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
      setPassCodeImage(decosesecrectkeyid);

    }
  }, []);
  // const inputData = {
  //   pinNumber: []
  // }
  const [inputFormdata, setInputFormdata] = useState({
    pinNumber: ['', '', '', '', '', ''],
  });

  // let [inputFormdata, setInputFormdata] = useState(inputData);
  const [isPageLoaded, setPageLoaded] = useState(false);

  if (!isPageLoaded && !loginSecurityData.isLoading) {
    if (loginSecurityData.items !== null && loginSecurityData.items !== "") {
      //  console.log(JSON.stringify(loginSecurityData));

      if (loginSecurityData.items.message.code !== undefined && loginSecurityData.items.message.code === "MHC - 0200") {

        var loginData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
        if (loginData.items.data.userType[0] === "Staff") {
          window.location.href = "/MettlerPatientLoginDashboard";
        } else if (loginData.items.data.userType[0] == "Patient") {
          var CryptoJS = require("crypto-js");
          var encryptPatientId = CryptoJS.AES.encrypt(loginData.items.data.userDetail.id, 'secret key 123');
          var setEncryptPatientId = encodeURIComponent(encryptPatientId.toString());
          window.location.href = "/MettlerPatientInfo/" + setEncryptPatientId;
        } else {
          window.location.href = "/MettlerAdminDashboard";
        }
      } else {
        //console.log(JSON.stringify(loginData.items.data));
        alert(loginSecurityData.items.message.description);
        // window.location.reload();
      }
      setPageLoaded(true);


    }
  }
  if (!loginSecurityData && loginSecurityData.isFormSubmit) {

    setTimeout(() => {
      setPageLoaded(false);

    }, (1000));
  }
  var CryptoJS = require("crypto-js");
  var passmailIdCryptoJS = CryptoJS.AES.encrypt(decryptMail, 'secret key 123');
  var setpasscryptMail = encodeURIComponent(passmailIdCryptoJS.toString());
  const [isPageVerifyOTPLoaded, setPageVerifyOTPLoaded] = useState(false);

  if (!isPageVerifyOTPLoaded && !verifyOTPData.isLoading) {
    if (verifyOTPData.items !== null && verifyOTPData.items !== "") {
      if (verifyOTPData.items.message.code !== undefined && verifyOTPData.items.message.code === "MHC - 0200") {

          window.location.href = '/MettlerSetPassword/' + setpasscryptMail;
      } else {
        alert(JSON.stringify(verifyOTPData.items.message.description));
      }
      setPageVerifyOTPLoaded(true);
      //   

    }
  }


  let maskPasswordTimeout;
  const passwordMaskDelay = 400;
  const maskPassword = () => {
    inputFormdata.pinNumber = inputFormdata.pinNumber.map(() => '•');
    setInputFormdata({ ...inputFormdata });
  };

  const handleInputChange = (event: any) => {
    if (event.target.id === "pinNumber1") {
      enteredPassword = enteredPassword + event.target.value;
      inputFormdata.pinNumber[0] = Constants.numbersOnlyFormat(event.target.value);
      if (inputFormdata.pinNumber[0] !== null && inputFormdata.pinNumber[0] !== "") {
        document.getElementById("pinNumber2").focus();
      }
    } else if (event.target.id === "pinNumber2") {
      enteredPassword = enteredPassword + event.target.value;
      inputFormdata.pinNumber[1] = Constants.numbersOnlyFormat(event.target.value);
      if (inputFormdata.pinNumber[1] !== null && inputFormdata.pinNumber[1] !== "") {
        document.getElementById("pinNumber3").focus();
      }
    } else if (event.target.id === "pinNumber3") {
      enteredPassword = enteredPassword + event.target.value;
      inputFormdata.pinNumber[2] = Constants.numbersOnlyFormat(event.target.value);
      if (inputFormdata.pinNumber[2] !== null && inputFormdata.pinNumber[2] !== "") {
        document.getElementById("pinNumber4").focus();
      }
    } else if (event.target.id === "pinNumber4") {
      enteredPassword = enteredPassword + event.target.value;
      inputFormdata.pinNumber[3] = Constants.numbersOnlyFormat(event.target.value);
      if (inputFormdata.pinNumber[3] !== null && inputFormdata.pinNumber[3] !== "") {
        document.getElementById("pinNumber5").focus();
      }
    } else if (event.target.id === "pinNumber5") {
      enteredPassword = enteredPassword + event.target.value;
      inputFormdata.pinNumber[4] = Constants.numbersOnlyFormat(event.target.value);
      if (inputFormdata.pinNumber[4] !== null && inputFormdata.pinNumber[4] !== "") {
        document.getElementById("pinNumber6").focus();
      }
    } else if (event.target.id === "pinNumber6") {
      enteredPassword = enteredPassword + event.target.value;
      inputFormdata.pinNumber[5] = Constants.numbersOnlyFormat(event.target.value);
    }
    setEnteredPassword(enteredPassword);
    setInputFormdata({ ...inputFormdata });
    clearTimeout(maskPasswordTimeout);
    maskPasswordTimeout = setTimeout(() => {
      maskPassword();
    }, passwordMaskDelay);
  };

  const handlePageChange = (event: any) => {
    
    if (passcodeImage === "1") {
      optData.email = decryptMail;
      if (inputFormdata.pinNumber.length === 6) {
        optData.otp = enteredPassword[0] + enteredPassword[1] + enteredPassword[2] + enteredPassword[3] + enteredPassword[4] + enteredPassword[5];
      }
      dispatch(verifyOtp(optData));
     

    } else if (passcodeImage === "2") {
      if (inputFormdata.pinNumber.length === 6) {
        inputSecurityLoginData.secretKey = enteredPassword[0] + enteredPassword[1] + enteredPassword[2] + enteredPassword[3] + enteredPassword[4] + enteredPassword[5];
      }
      var intialLoginData = JSON.parse(window.localStorage.getItem("LOGINDATA"));

      //  console.log(JSON.stringify(intialLoginData));

      if (intialLoginData !== null) {
        inputSecurityLoginData.jwt = intialLoginData.items.data.jwt.jwtToken;
        //   console.log(JSON.stringify(inputSecurityLoginData));

        dispatch(loginSecurity(inputSecurityLoginData));
      } else {
        alert("Already Sign in Other Device");
        window.location.reload();
      }

    }

    console.log(JSON.stringify(inputFormdata));
  }
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      handlePageChange(event);
    }
  }
  const forgotPasscode = (event: any) => {
    var CryptoJS = require("crypto-js");
    var loginUserIdCryptoJS = CryptoJS.AES.encrypt("passcode", 'secret key 123');
    var loginUserIdEnc = encodeURIComponent(loginUserIdCryptoJS.toString());
    window.location.href = "/MettlerForgotPassword/" + loginUserIdEnc;
  }

  return (
    <div className="p-grid passcode-section" style={{ background: '#fff' }}>
      <div id="newRemovePadding" className="p-col-12 p-md-7" style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', marginLeft: '-6px', height: '101%' }}>
        {(
          passcodeImage === "1" &&
          <img src={passcodeImage2} style={{ height: '-webkit-fill-available', marginRight: '-7px' }} alt="Passcode Image"></img>
        )}
        {(passcodeImage === "2" &&
          <img src={passcodeImage1} style={{ height: '-webkit-fill-available', marginRight: '-7px' }} alt="Passcode Image"></img>
        )}
      </div>
      <div className="p-col-12 p-md-1" id="removePadding"></div>
      <div className="p-col-12 p-md-3 passcode-secondPage" id="removePadding">
        <div>{passcodeImage === "2" ? <span style={{ display: 'block' }} className="passCodeText">Enter you Passcode</span> : <span className="passCodeText1">Please enter your OTP to Reset Password</span>}</div>
        <div className="passwordText">
        <input
          id="pinNumber1"
          className="passwordText1"
          name="pinNumber"
          autoFocus
          value={inputFormdata.pinNumber[0]}
          required
          onChange={handleInputChange}
          maxLength={1}
        />
        <input
          id="pinNumber2"
          className="passwordText2"
          name="pinNumber"
          value={inputFormdata.pinNumber[1]}
          required
          onChange={handleInputChange}
          maxLength={1}
        />
        <input
          id="pinNumber3"
          className="passwordText3"
          name="pinNumber"
          value={inputFormdata.pinNumber[2]}
          required
          onChange={handleInputChange}
          maxLength={1}
        />
        <input
          id="pinNumber4"
          className="passwordText4"
          name="pinNumber"
          value={inputFormdata.pinNumber[3]}
          required
          onChange={handleInputChange}
          maxLength={1}
        />
        <input
          id="pinNumber5"
          className="passwordText5"
          name="pinNumber"
          value={inputFormdata.pinNumber[4]}
          required
          onChange={handleInputChange}
          maxLength={1}
        />
        <input
          id="pinNumber6"
          className="passwordText6"
          name="pinNumber"
          value={inputFormdata.pinNumber[5]}
          required
          onChange={handleInputChange}
          onKeyDown={handleInputChange}
          maxLength={1}
        />
      </div>

        {/* <button style={{position:"relative",top:"50px"}} onClick={toggleMasking}>Toggle Masking</button> */}
        <div className="buttonPasscode">
          <Button style={{ width: '321px', position: 'relative', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '16px', height: '48px', backgroundColor: '#1F489F' }} onClick={handlePageChange} label="Submit"></Button>
        </div>
        {(
          passcodeImage === "1" && <></>)}
        {(
          passcodeImage === "2" &&
          <a onClick={forgotPasscode} style={{ cursor: 'pointer' }}><div className="forgotPassCode">Forgot Passcode?</div></a>
        )}
      </div>
      <div id="newRemovePadding" className="p-col-12 p-md-1"></div>
    </div>
  );


};
const mapStateToProps = (state: any) => {
  const { loginSecurityData, verifyOTPData } = state;
  return {
    loginSecurityData, verifyOTPData
  };
};
export default connect(mapStateToProps)(SecretKey);