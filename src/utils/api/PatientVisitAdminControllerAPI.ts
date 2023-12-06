import moment from "moment";
import { HttpLogin } from "../Http";
export class UpdatePatientVisitAPI {
    public static updatePatientVisit(org: any) { 
        var url = "/api/visit/update/"+org.id;     
        org.visitStartDate = (org.visitStartDate !== null && org.visitStartDate !== "") ? moment(org.visitStartDate).format('YYYYMMDDHHmm') : "";
        org.visitEndDate = (org.visitEndDate !== null && org.visitEndDate !== "") ? moment(org.visitEndDate).format('YYYYMMDDHHmm') : "";
        org.admitDate = (org.admitDate !== null && org.admitDate !== "") ? moment(org.admitDate).format('YYYYMMDDHHmm') : "";
        org.dischargeDate = (org.dischargeDate !== null && org.dischargeDate !== "") ? moment(org.dischargeDate).format('YYYYMMDDHHmm') : "";           
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

  export class CreatePatientVisitAPI {
    public static createPatientVisit(org: any) { 
        var url = "/api/visit/register" ;    
        org.visitStartDate = (org.visitStartDate !== null && org.visitStartDate !== "") ? moment(org.visitStartDate).format('YYYYMMDDHHmm') : "";
        org.visitEndDate = (org.visitEndDate !== null && org.visitEndDate !== "") ? moment(org.visitEndDate).format('YYYYMMDDHHmm') : "";
        org.admitDate = (org.admitDate !== null && org.admitDate !== "") ? moment(org.admitDate).format('YYYYMMDDHHmm') : "";
        org.dischargeDate = (org.dischargeDate !== null && org.dischargeDate !== "") ? moment(org.dischargeDate).format('YYYYMMDDHHmm') : "";               
        var obj = JSON.stringify(org);
          console.log(obj);
     
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
  export class GetallPatientVisitAPI {
    public static getAllPatientVisit(org: any) { 
        var url = "/api/visit/getAll";   
        var obj = JSON.stringify(org);
     
        const resultMethod =   HttpLogin.axios().get(url,   {
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
export class GetPatientVisitByPidAPI {
    public static getidPatientVisitByPid(org: any) { 
        var url = "/api/visit/ByPid/"  +org ;
        var obj = JSON.stringify(org);
     
        const resultMethod =   HttpLogin.axios().get(url,   {
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

export class GetPatientVisitByIdAPI {
  public static getPatientVisitById(org: any) { 
      var url = "/api/visit/ById/"  +org ;
      var obj = JSON.stringify(org);
   
      const resultMethod =   HttpLogin.axios().get(url,   {
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

export class DeletePatientVisitAPI {
  public static deletePatientVisit(org: any) { 
      var url = "/api/visit/delete/"+org;         
   
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