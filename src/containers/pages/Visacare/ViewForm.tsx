import React, { Dispatch, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button } from "primereact/button";

interface IViewForm {
    match:any;
    dispatch: Dispatch<any>;   
  }
  const  ViewForm: React.FC<IViewForm> = ({
    dispatch,match
  }) => {

    let [encryptPatientid, setEncryptPatientid] = useState(null);
    let [decryptPatientid, setDecryptPatientid] = useState(null);
    
    useEffect(() => {
    var encryptInitial = match.params.patientid;
    setEncryptPatientid(encryptInitial);
    var CryptoJS = require("crypto-js");
    let decodePatientid = decodeURIComponent(encryptInitial);
    let decodeFinalPatientid = CryptoJS.AES.decrypt(decodePatientid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
    setDecryptPatientid(decodeFinalPatientid);

  }, [])

    const handleeditForm = (event: any) => { 
      window.location.href = "/mettlerViewFields/"+encryptPatientid;
    }

    const handleUpdateForm = (event: any) => { 
      window.location.href = "/MettlerAIMS/"+encryptPatientid;
    }
    return  (
        <div className="p-grid p-fluid " style={{marginRight:"33.5rem",position:"relative",left:"460px",top:"40px"}}>
         
         <div className="p-col-12 p-md-12">
      
         <div className="p-col-12 p-md-12" style={{position:"relative",left:"178px",width:"400px"}}>

           <h3 style={{fontFamily:"poppins"}}> Add/edit Form</h3>
           </div>
         </div>
         <div className="p-col-12 p-md-4">
         <Button style={{backgroundColor:"#1F489F",borderColor:"#1F489F"}} type="button"  label="Create New Form" onClick={handleeditForm}></Button>
         </div>
     
         <div className="p-col-12 p-md-4">
         <Button style={{backgroundColor:"#1F489F",borderColor:"#1F489F"}} type="button"  label="View/Update Form" onClick={handleUpdateForm}></Button>
         </div>
         <div className="p-col-12 p-md-4">
         </div>
          </div>        
                            
      );
    };    
      
  const mapStateToProps = (state: any) => {
      const { deviceFormData } = state;
      return {
          deviceFormData
      };
  };
  export default connect(mapStateToProps)(ViewForm)
  