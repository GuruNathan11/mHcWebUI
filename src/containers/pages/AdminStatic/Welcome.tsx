import React, { Dispatch, useState } from "react";
import { connect } from "react-redux";
import { Button } from "primereact/button";
import axios from 'axios';

interface IWorkflowactors {}
interface IWorkflowactors {
    workflowactorData: any;
    dispatch: Dispatch<any>;
}
const  Welcome: React.FC<IWorkflowactors> = ({
   
    
}) => {
   
    const saveButton = async ()=>{
        var postData ={
            assertion: 'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQsAAAABAAYABwAAAt_jLE3bSAgAAI5lKy1N20gCAFCBqxVkuyFOruQhj4A-bI4VAAEAAAAYAAEAAAAFAAAADQAkAAAANWU0NTU5MzMtOTNiNy00MTAxLWFjNWYtMWIxODZmZWQ5MDcyIgAkAAAANWU0NTU5MzMtOTNiNy00MTAxLWFjNWYtMWIxODZmZWQ5MDcyMAAAAt_jLE3bSBIAAQAAAAsAAABpbnRlcmFjdGl2ZTcAKjetHyHSd0qr8BdHJUtbfw.p6ryP31eN8zc-7JjyLN3Zd_Vkj2xNUbSAnK2AQKlA0VraCaXA62u20Zw5O9RxRWYOnF3fAHlD2Qe2suwOGpYftBph6ugy3LeEIHmp1c-ViHd5ZxkllnAMzoCbv7Ty23jDOY8AMhe72FErXfn9xyzN-_tHbe4pa57e-OgGvhRhdJOuB6FapQ1ojfP7WjgfmPlTLjT62u332wzxIUQxrGEXWO_FrU2g0x3q-1yM0Ydeo4GFp9fgvKxKY1vx0vg8l-WSyqedjKEFe-6fAtK_JaNvQ2NEi_v0U-zx9TDF785K5UFAPcjF68otpwZVgkpNbOiPJGV-dXcXRTP1cRhwamV6g',
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer'
          }
        try {
            const resultMethod= axios.post('https://account-d.docusign.com/oauth/token',JSON.stringify(postData),  {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded' ,
                    'Authorization':'Basic 0858f352-380d-44eb-8cff-a827df5d39ec'
                }
            })  
            .then((res)=>{
               
            })     
          } catch (error) {
          
          }
    }
    
  return (
    <div style={{display:'inline'}} className="p-grid">


<div className="p-col-12 p-md-12">
                <h2 className="dashboard-title"><b>Welcome</b></h2>
            </div>
            <div id="removePaddingTop" className="p-col-12">
            <div id="removePadding" className="p-col-12 p-md-12">
            <Button label="Save" style={{ width: "fit-content" }} icon="pi pi-save" onClick={saveButton} />
                                    </div>
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
export default connect(mapStateToProps)(Welcome)