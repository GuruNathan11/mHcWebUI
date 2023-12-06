import moment from "moment";
import { HttpLogin } from "../Http";

export class CreatePatientImmunizationAPI {
    public static createPatientImmunization(org: any) { 
    var url = "/api/Immunization/register"                
      var obj = JSON.stringify(org);
     
        const resultMethod =   HttpLogin.axios().post(url,obj, {
              headers: { 
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*"
              }
            })
            .then(res => {       
              
            
              //  console.log("API Response in post " +JSON.stringify(res.data));
                 return res;   
            })
            .catch((e: any) => {
              //  console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }
  
  }

  export class GetAllPatientImmunizationAPI {
    public static getAllPatientImmunization(org: any) { 
        var url = "/api/Immunization/getAll"   
        var obj = JSON.stringify(org);
     
        const resultMethod =   HttpLogin.axios().get(url, {
              headers: { 
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*"
              }
            })
            .then(res => {       
              
            
              //  console.log("API Response in post " +JSON.stringify(res.data));
                 return res;   
            })
            .catch((e: any) => {
              //  console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }
  
  }
  
  export class GetImmunizationByPatientAPI {
    public static getImmunizationByPatientInput(org: any) { 
        var url = "/api/Immunization/getByPatientId/"+org;  
        var obj = JSON.stringify(org);
        //  console.log(JSON.stringify(org));
        const resultMethod =   HttpLogin.axios().get(url, {
              headers: { 
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*"
              }
            })
            .then(res => {       
                                      
                 return res;   
            })
            .catch((e: any) => {
              //  console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }
  
  }


  export class GetImmunizationByPatientInputAPI {
    public static getImmunizationByPatientInputId(org: any) { 
      //  console.log(JSON.stringify(org));
        var url = "/api/Immunization/getByPatientIdAndId/"+org.input+"/"+org.inputParam;  
       // var obj = JSON.stringify(org);
        //  console.log(JSON.stringify(org));
        const resultMethod =   HttpLogin.axios().get(url, {
              headers: { 
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*"
              }
            })
            .then(res => {       
                                      
                 return res;   
            })
            .catch((e: any) => {
              //  console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }
  
  }

  export class UpdatePatientImmunizationAPI {
    public static updatePatientImmunization(org: any) { 
        var url = "/api/Immunization/update/"+org.id   
        var obj = JSON.stringify(org);
     
        const resultMethod =   HttpLogin.axios().put(url,obj, {
              headers: { 
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*"
              }
            })
            .then(res => {       
              
            
              //  console.log("API Response in post " +JSON.stringify(res.data));
                 return res;   
            })
            .catch((e: any) => {
              //  console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }
  
  }

  export class DeletePatientImmunizationAPI {
    public static deletePatientImmunization(org: any) { 
        var url = "/api/Immunization/delete/"+org.id;         
     
        const resultMethod =   HttpLogin.axios().delete(url, {
              headers: { 
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*"
              }
            })
            .then(res => {       
              
            
              //  console.log("API Response in post " +JSON.stringify(res.data));
                 return res;   
            })
            .catch((e: any) => {
              //  console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }
  
  }