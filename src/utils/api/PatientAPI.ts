import moment from "moment";
import { HttpLogin } from "../Http";

export class CreatePatientAPI {
    public static createPatient(org: any) { 
        var url = "api/patient/register"               
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

  export class GetAllPatientAPI {
    public static getAllPatient(org: any) { 
        var url = "api/patient/get_all"   
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
  
  export class GetByIdPatientAPI {
    public static getByIdPatient(org: any) { 
        var url = "api/patient/getPatient/"+org.id;   
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

  export class GetByPatientAPI {
    public static getPatientByInput(org: any) {
      var url = null;
      if(org.ssn!=null){
        url = "api/patient/getPatient/ssn/"+org.ssn;  
      }else if(org.givenName!=null){
        url = "api/patient/getPatient/givenName/"+org.givenName;  
      }else if((org.givenName && org.familyName)!=null){
        url = "api/patient/getPatient/givenName/"+org.givenName+"/familyName/"+org.familyName;
      }else if((org.givenName && org.familyName && org.birthDate)!=null){
        url = "api/patient/getPatient/givenName/"+org.givenName+"/familyName/"+org.familyName+"/birthDate/"+org.birthDate;
      }else if(org.familyName!=null){
        url = "api/patient/getPatient/familyName/"+org.familyName;  
      }else if(org.birthDate!=null){
        url = "api/patient/getPatient/dob/"+org.birthDate;   
      }
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

  export class DischargePatientByIdAPI {
    public static dischargePatientById(org: any) { 
        var url = "api/patient/discharge/"+org.id;   
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

  export class UpdatePatientAPI {
    public static updatePatient(org: any) { 
        var url = "api/patient/update/"+org.id   
        var obj = JSON.stringify(org);
        console.log("Input = " +JSON.stringify(obj));
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

  export class DeletePatientAPI {
    public static deletePatient(org: any) { 
        var url = "api/patient/delete/"+org          
     
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