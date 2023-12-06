import { Checkbox } from "primereact/checkbox";
import React, { Dispatch, useState, useEffect } from "react";
import 'list-to-tree';
import 'array-to-tree';
import 'react-dropdown-tree-select/dist/styles.css'
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { connect } from "react-redux";
import mettlerImage from './../../../assets/images/mettler_images/mettlerImage.svg';
import isolationMode from './../../../assets/images/mettler_images/Isolation_Mode.svg';
import arrowRight from './../../../assets/images/mettler_images/arrow-right.svg';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
 import inputforgetpasswordData from './../../../assets/data/ForgetPasswordData.json';
import inputResetsecretkeyData from './../../../assets/data/Resetsecretkey.json';
import { forgetPassword,resetsecretkey } from "../../../store/actions/Login";

interface IForgotpassword {}
interface IForgotpassword {
  dispatch: Dispatch<any>;

    StaticPage: any;
    match: any;
    forgotpasswordData:any;
    resetSecretkeyData:any;
    encRyptPassword: any;
    encryptmail:any;
    passwordId:any;
    errorMessage: String;

    state: {
      nodes: [],
      checked: [],
      expanded: []
    }
}
const  Forgotpassword: React.FC<IForgotpassword> = ({
  dispatch,
  match,forgotpasswordData,resetSecretkeyData,encRyptPassword,encryptmail,errorMessage

    
}) => {

  

  const [encRyptAttorneyId, setencRyptPassword] = useState(encRyptPassword);
  const [decryptpasscodeId, setencryptmail] = useState(encryptmail);

  const [spinner, setSpinner] = useState(false); 


  const [hintData,setHintData] = useState(null);
  useEffect(() => { 
    // console.log( match.params.hint);
  
    if(match.params.hint){
      encRyptPassword = match.params.hint;
      setencRyptPassword(encRyptPassword);
      var CryptoJS = require("crypto-js");
    let decodepasswordId = decodeURIComponent(encRyptPassword);
    let decosepassword = CryptoJS.AES.decrypt(decodepasswordId.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
      setHintData(decosepassword); 
    }
    if(match.params.mail){
      encryptmail = match.params.hint;
      setencryptmail(encryptmail);
      var CryptoJS = require("crypto-js");
    let decodepasswordId = decodeURIComponent(encRyptPassword);
    let decosepassword = CryptoJS.AES.decrypt(decodepasswordId.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
      setHintData(decosepassword); 
    }
   
  },[]);

 
  const handleForgetPassword = (event:any)=>{
    


  }
  
 const OtpEnterPage = (event:any)=>{   
  checkValidation();
  if(isValid && errorMessage==""){   
    if( hintData === "password"){
      setInputFormdata({...inputFormdata}); 
      
      dispatch(forgetPassword(inputFormdata));
       //  window.location.href = "/MettlerOtpEnter/otp/";
     }  else if (hintData === "passcode"){
      var intialLoginData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
   
     // console.log(JSON.stringify(intialLoginData));
      inputResetsecretkeyData.email=inputFormdata.email;
      
      inputResetsecretkeyData.jwt=intialLoginData.items.data.jwt.jwtToken;
    //  console.log(JSON.stringify(inputResetsecretkeyData));
        dispatch(resetsecretkey(inputResetsecretkeyData));
   
   
   
     }
  } 
    else {
      alert(errorMessage);
    
  };


  

 }
 
 
  const [buttonDisplay,setButtonDisplay] = useState(false);
  let [inputFormdata,setInputFormdata] = useState(inputforgetpasswordData);

  const handleInputChange = (event:any)=>{
    if(event.target.id === "email"){
      inputFormdata.email = event.target.value;    
      setButtonDisplay(true);   
      if(event.target.value === "") {
        setButtonDisplay(false);   
      }  
    }
    setInputFormdata({...inputFormdata});
  }
  const [isValid, setValid] = useState(true);
  let [isEmailValid, setEmailValid] = useState(true);

  const checkValidation=()=>{
    errorMessage="";
 
 setValid(true);
 
    if (!inputFormdata.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i)) {
      setEmailValid(false); 
      errorMessage="Email Id Not a Valid Format ";
     
    }
    if((inputFormdata.email!==null && inputFormdata.email!=="" && isEmailValid) && (errorMessage=="")
    )
    {
      setValid(true);
    }
    else
    {
     
      setValid(false); 
    } 
  }
  const backToLogin = ()=>{
    window.location.href = "/Login";
  }
  var CryptoJS = require("crypto-js"); 
  var secretkeyCryptoJS = CryptoJS.AES.encrypt(inputFormdata.email, 'secret key 123');
   var mailid = encodeURIComponent(secretkeyCryptoJS.toString()); 

  const [isPageLoaded, setPageLoaded] = useState(false);

  if (!isPageLoaded && !forgotpasswordData.isLoading  ){
    if(forgotpasswordData.items!==null && forgotpasswordData.items!==""){
      if(forgotpasswordData.items.message.code!==undefined && forgotpasswordData.items.message.code==="MHC - 0200"){
       
       window.location.href = "/MettlerOtpEnter/otp/"+mailid;
     
   } else {
    alert(forgotpasswordData.items.message);
 
   }
   setPageLoaded(true);
  }} 
  if (!forgotpasswordData && forgotpasswordData.isFormSubmit) {
  
    setTimeout(() => {
      setPageLoaded(false);

    }, (1000));
  }
  var CryptoJS = require("crypto-js"); 
  var secretkeyCryptoJS = CryptoJS.AES.encrypt("2" , 'secret key 123');
   var secretkeyIdEnc = encodeURIComponent(secretkeyCryptoJS.toString()); 
 

  const [isPageResetSecertLoaded, setPageResetSecertLoaded] = useState(false);

     if (!isPageResetSecertLoaded && !resetSecretkeyData.isLoading  ){
    if(resetSecretkeyData.items!==null && resetSecretkeyData.items!==""){
      if(resetSecretkeyData.items.message.code!==undefined && resetSecretkeyData.items.message.code==="MHC - 0200"){
      
     // if (resetSecretkeyData.items.message === "Secret key reset successfully. New secret key sent to your email.") {
        window.location.href = "/MettlerPasscodePage/"+secretkeyIdEnc;
    } else {
     alert(resetSecretkeyData.items.message);
  
     
    }
    setPageResetSecertLoaded(true);
  }}
  if (!resetSecretkeyData && resetSecretkeyData.isFormSubmit) {
  
    setTimeout(() => {
      setPageResetSecertLoaded(false);

    }, (1000));
  }
  const  handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      OtpEnterPage(event);

    }
  }
  return  (
    <div className="p-grid forgot-section" style={{background:'#fff'}}>  
        <div className="p-col-12 p-md-3"></div>
        <div className="p-col-12 p-md-6">
          <div className="forgotAlign">
    <img src={mettlerImage} style={{width:'247px',height:'28.779px',flexShrink:0,marginTop:'54px'}} alt="MettlerHealth.png"></img>  
 
    <img src={isolationMode} style={{width:'120px',height:'130.909px',flexShrink:0,marginTop:'111.22px'}} alt="MettlerHealth.png"></img>  
    <div className="forgotPasswordPageText">Forgot your {(hintData === "password") ? "password": "passcode"}</div>
    <div className="additionalText">We’ll help you reset it and get back on track.</div>
    <div className="forgotTextInput">
    <input type="text" id="email" className="forgotInput" style={{paddingLeft:'17px',fontFamily: 'system-ui',opacity: 0.4000000059604645,color:'#123A94',border: '2px solid #DCDDE5'}} onKeyDown={handleKeyDown} value={inputFormdata.email} placeholder="Enter your mail"  autoFocus onChange={handleInputChange}/>
    </div>
    {((buttonDisplay || hintData === "passcode")&&
   <div className="resetPasswordOutline">
   <Button style={{position:'absolute',fontFamily:'Poppins',fontWeight:'bold',fontSize:'16px',height:'48px',backgroundColor:'#1F489F',border:'0px',color:"#fff",width:'300px'}}  onClick={OtpEnterPage} label={hintData === "password"?"Send OTP to Mail":"Reset Passcode"}></Button>
   <a style={{display:'flex',flexDirection:'row',marginTop:"70px",cursor:'pointer'}} onClick={backToLogin}><img src={arrowRight} style={{width:'18px',height:'18px',flexShrink:0,marginTop:'4px'}}></img><span style={{fontFamily: 'Poppins',whiteSpace:"nowrap"}} className="backToLogin">Back to Login</span></a>
   </div>
   )}
   {(!buttonDisplay && hintData === "password" &&
   <div className="resetPasswordOutline">
   <Button style={{position:'absolute',fontFamily:'Poppins',fontWeight:'bold',fontSize:'16px',height:'48px',backgroundColor:'#E0E7F4',border:'0px',color:"#1F489F",opacity: '0.699999988079071'}}  onClick={handleForgetPassword} label="Send OTP to Mail"></Button>
   <a style={{display:'flex',flexDirection:'row',marginTop:"70px",cursor:'pointer'}} onClick={backToLogin}><img src={arrowRight} style={{width:'18px',height:'18px',flexShrink:0,marginTop:'4px'}}></img><span style={{fontFamily: 'Poppins',whiteSpace:"nowrap"}} className="backToLogin">Back to Login</span></a>
   </div>
   )}
   </div>
   </div>
   <div className="p-col-12 p-md-3"></div>
    </div>
    );
        
    
};
const mapStateToProps = (state: any) => {
    const { forgotpasswordData,resetSecretkeyData } = state;
    return {
      forgotpasswordData,resetSecretkeyData
    };
};
export default connect(mapStateToProps)(Forgotpassword)