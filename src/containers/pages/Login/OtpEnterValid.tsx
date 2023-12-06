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
import checkEmailImage from './../../../assets/images/mettler_images/checkOtpEmail.svg';
import sentEmailImage from './../../../assets/images/mettler_images/sentMailImage.svg';
import { Button } from "primereact/button";
import arrowRight from './../../../assets/images/mettler_images/arrow-right.svg';


interface IOtpEnterValid {}
interface IOtpEnterValid {
    StaticPage: any;
    match: any;
    encRyptscretkey: any;
    state: {
      nodes: [],
      checked: [],
      expanded: []
    }
}
const  OtpEnterValid: React.FC<IOtpEnterValid> = ({
    match,encRyptscretkey

    
}) => {
  const [displayemail, setdisplayemail] = useState("");
  const [encRyptmailId, setencRyptscretkey] = useState(encRyptscretkey);

  const [spinner, setSpinner] = useState(false); 
  const [hintData,setHintData] = useState(null);
  let [decryptMail,setDecryptMail] = useState(null);
  useEffect(() => { 
    setHintData(match.params.hint);
    // console.log(JSON.stringify(match.params.mail));
    // console.log(JSON.stringify(match.params.hint));
    
      encRyptscretkey = match.params.mail;
      setencRyptscretkey(encRyptscretkey);
      var CryptoJS = require("crypto-js");
      let decodesecretid = decodeURIComponent(encRyptscretkey);
      let decosesecrectkey = CryptoJS.AES.decrypt(decodesecretid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
    setDecryptMail(decosesecrectkey); 
    

  },[]);
  const otpKeyPassCodePage = (event:any)=>{
    var CryptoJS = require("crypto-js"); 
    var ForgetpasswordCryptoJS = CryptoJS.AES.encrypt("1" , 'secret key 123');
     var ForgetpasswordIdEnc = encodeURIComponent(ForgetpasswordCryptoJS.toString()); 
     window.location.href = "/MettlerPasscodePage/"+ForgetpasswordIdEnc+"/"+encRyptmailId;
  }

  const backToLogin = ()=>{
    window.location.href = "/Login";
  }
  
  return  (
    <div className="p-grid forgot-section" style={{background:'#fff'}}>      
    <div className="p-col-12 p-md-3"></div>
    <div className="p-col-12 p-md-6">
    {(hintData ==="otp"  && 
    <div className="forgotAlign">
    <img src={mettlerImage} style={{width:'247px',height:'28.779px',flexShrink:0,marginTop:'54px'}} alt="MettlerHealth.png"></img>  
    <img src={checkEmailImage} style={{width:'119.435px',height:'97.447px',flexShrink:0,marginTop:'111.22px'}} alt="MettlerHealth.png"></img>  
    <div className="forgotPasswordPageText">Check your email</div>
    <div className="additionalText">We sent OTP to {decryptMail} to reset password.</div>
    <div style={{marginTop:'35px'}} className="resetPasswordOutline">
   <Button style={{position:'absolute',fontFamily:'Poppins',fontWeight:'bold',fontSize:'16px',height:'48px',backgroundColor:'#1F489F',border:'0px',color:"#fff",width:'300px'}}  onClick={otpKeyPassCodePage} label="OTP"></Button>
  <a style={{display:'flex',flexDirection:'row',marginTop:"70px",cursor:'pointer'}} onClick={backToLogin}><img src={arrowRight} style={{width:'18px',height:'18px',flexShrink:0,marginTop:'4px'}}></img><span style={{fontFamily: 'Poppins'}} className="backToLogin">Back to Login</span></a>
   </div>
    </div>
    )}
      {(hintData ==="reset"  && 
    <div className="forgotAlign">
    <img src={mettlerImage} style={{width:'247px',height:'28.779px',flexShrink:0,marginTop:'54px'}} alt="MettlerHealth.png"></img>  
    <img src={sentEmailImage} style={{width:'119.435px',height:'97.447px',flexShrink:0,marginTop:'111.22px'}} alt="MettlerHealth.png"></img>  
    <div className="forgotPasswordPageText">Password Reset</div>
    <div className="additionalText">Your  password has been successfully reset. Click below to log in magically.</div>
    <div style={{marginTop:'35px'}} className="resetPasswordOutline">
   <Button style={{position:'absolute',fontFamily:'Poppins',fontWeight:'bold',fontSize:'16px',height:'48px',backgroundColor:'#1F489F',border:'0px',color:"#fff",width:'300px'}}  onClick={otpKeyPassCodePage} label="Login"></Button>  
   </div>
    </div>
      )}
        {(hintData ==="code"  && 
    <div className="forgotAlign">
    <img src={mettlerImage} style={{width:'247px',height:'28.779px',flexShrink:0,marginTop:'54px'}} alt="MettlerHealth.png"></img>  
    <img src={sentEmailImage} style={{width:'119.435px',height:'97.447px',flexShrink:0,marginTop:'111.22px'}} alt="MettlerHealth.png"></img>  
    <div className="forgotPasswordPageText">Passcode Sent</div>
    <div className="additionalText">Your  passcode has been sent to your registered email id</div>
    <div style={{marginTop:'35px'}} className="resetPasswordOutline">
   <Button style={{position:'absolute',fontFamily:'Poppins',fontWeight:'bold',fontSize:'16px',height:'48px',backgroundColor:'#1F489F',border:'0px',color:"#fff",width:'300px'}}  onClick={otpKeyPassCodePage} label="Login"></Button>  
   </div>
    </div>
      )}
    </div>
    <div className="p-col-12 p-md-3"></div>
      </div>
    );
        
    
};
const mapStateToProps = (state: any) => {
    const { deviceFormData,I907FormData } = state;
    return {
        deviceFormData,I907FormData
    };
};
export default connect(mapStateToProps)(OtpEnterValid)