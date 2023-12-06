import moment from "moment";
import { HttpLogin } from "../Http";

export class CreatePatientVitalsAPI {
    public static createPatientVitals(org: any) { 
      org.enteredDate = org.enteredDate !== null && org.enteredDate !== "" ? moment(org.enteredDate).format('YYYYMMDDHHmm'): null;
    var url = "/api/vital/register"                
      var obj = JSON.stringify(org);
    //  console.log(JSON.stringify(obj));
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

  export class GetAllPatientVitalsAPI {
    public static getAllPatientVitals(org: any) { 
        var url = "/api/vital/getAll"   
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
           //   console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }
  
  }
  
  export class GetVitalsByPatientAPI {
    public static getVitalsByPatientInput(org: any) { 
        var url = "/api/vitals/getByPatientId/"+org;   
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
              
            
           //   console.log("API Response in post " +JSON.stringify(res.data));
                 return res;   
            })
            .catch((e: any) => {
           //   console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }
  
  }

  export class GetVitalsByPatientInputAPI {
    public static getVitalsByPatientInputId(org: any) { 
    //  console.log(JSON.stringify(org));
        var url = "/api/vital/getByPatientIdAndId/"+org.input+"/"+org.inputParam;  
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
           //   console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }
  
  }

  export class UpdatePatientVitalsAPI {
    public static updatePatientVitals(org: any) { 
      org.enteredDate = org.enteredDate !== null && org.enteredDate !== "" && org.enteredDate !== "Invalid date" ? moment(org.enteredDate).format('YYYYMMDDHHmm'): null;
        var url = "/api/vital/update/"+org.id   
        var obj = JSON.stringify(org);
      //  console.log(JSON.stringify(obj));
        const resultMethod =   HttpLogin.axios().put(url,obj, {
              headers: { 
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*"
              }
            })
            .then(res => {       
              
            
              console.log("API Response in post " +JSON.stringify(res.data));
                 return res;   
            })
            .catch((e: any) => {
            //  console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }
  
  }

  export class DeletePatientVitalsAPI {
    public static deletePatientVitals(org: any) { 
        var url = "/api/vital/delete/"+org.id;         
     
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