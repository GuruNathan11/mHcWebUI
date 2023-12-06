import moment from "moment";
import { HttpLogin } from "../Http";

export class CreatePatientAllergyAPI {
    public static createPatientAllergy(org: any) { 
    var url = "/api/Allergy/register"                
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
                console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }
  
  }

  export class GetAllPatientAllergyAPI {
    public static getAllPatientAllergy(org: any) { 
        var url = "/api/Allergy/getAll"   
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
  
  export class GetAllergyByPatientAPI {
    public static getAllergyByPatientInput(org: any) { 
        var url = "/api/Allergy/getByPatientId/"+org;  
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


  export class GetAllergyByPatientInputAPI {
    public static getAllergyByPatientInputId(org: any) { 
      //  console.log(JSON.stringify(org));
        var url = "/api/Allergy/getByPatientIdAndId/"+org.input+"/"+org.inputParam;  
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

  export class UpdatePatientAllergyAPI {
    public static updatePatientAllergy(org: any) { 
        var url = "/api/Allergy/update/"+org.id   
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

  export class DeletePatientAllergyAPI {
    public static deletePatientAllergy(org: any) { 
        var url = "/api/Allergy/delete/"+org.id;         
     
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