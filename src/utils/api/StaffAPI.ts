import moment from "moment";
import { HttpLogin } from "../Http";
import * as Constants from "./../../containers/pages/Constants/ConstantValues";

export class StaffAPI {
    public static getAllStaff(org: any) { 
        var url = "api/staff/get_all";   
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
              
            
        //      console.log("API Response in post " +JSON.stringify(res.data));
                 return res;   
            })
            .catch((e: any) => {
        //      console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }

}

export class GetByIdStaffAPI {
    public static getByIdStaff(org: any) { 
        var url = "api/staff/get/"+org.id;   
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
              
            
        //      console.log("API Response in post " +JSON.stringify(res.data));
                 return res;   
            })
            .catch((e: any) => {
        //      console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }

}

export class CreateStaffAPI {
    public static createStaff(org: any) { 
        var url = "api/staff/register"
        org.ssn = org.ssn !== ""? org.ssn.replace(/[^\w\s]/gi, ''):"";
        org.dateofBirth = org.dateofBirth !== null && org.dateofBirth !== "" ? moment(org.dateofBirth).format('YYYYMMDD'): null;
        org.terminationDate = org.terminationDate !== null && org.terminationDate !== "" ? moment(org.terminationDate).format('YYYYMMDD'):null;
        org.employeeDetails[0].startDate = org.employeeDetails[0].startDate !== null && org.employeeDetails[0].startDate !== "" ? moment(org.employeeDetails[0].startDate).format('YYYYMMDD'): null;
        org.employeeDetails[0].endDate = org.employeeDetails[0].endDate !== null && org.employeeDetails[0].endDate !== "" ? moment(org.employeeDetails[0].endDate).format('YYYYMMDD'): null;   
        var obj = JSON.stringify(org);
    //    console.log("OBJ " +JSON.stringify(obj));
    //    console.log("URL " +JSON.stringify(url));
    //    console.log("Input " +JSON.stringify(org));
  
        const resultMethod =   HttpLogin.axios().post(url,obj, {
              headers: { 
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*"
              }
            })
            .then(res => {       
              
            
      //        console.log("API Response in post " +JSON.stringify(res.data));
                 return res;   
            })
            .catch((e: any) => {
      //        console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
   
      }
  
  }

  export class InUpdateStaffAPI {
    public static inUpdateStaff(org: any) { 
        var url = "api/staff/in/"+org.id   
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
              
            
    //          console.log("API Response in post " +JSON.stringify(res.data));
                 return res;   
            })
            .catch((e: any) => {
    //          console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }
  
  }

  export class OutUpdateStaffAPI {
    public static outUpdateStaff(org: any) { 
        var url = "api/staff/out/"+org.id   
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
              
            
      //        console.log("API Response in post " +JSON.stringify(res.data));
                 return res;   
            })
            .catch((e: any) => {
       //       console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }
  
  }

  export class UpdateStaffAPI {
    public static UpdateStaff(org: any) { 
      org.ssn = org.ssn !== ""? org.ssn.replace(/[^\w\s]/gi, ''):"";
      org.dateofBirth = org.dateofBirth !== null && org.dateofBirth !== "" ? moment(org.dateofBirth).format('YYYYMMDD'): null;
      org.terminationDate = org.terminationDate !== null && org.terminationDate !== "" ? moment(org.terminationDate).format('YYYYMMDD'):null;
      org.employeeDetails[0].startDate = org.employeeDetails[0].startDate !== null && org.employeeDetails[0].startDate !== "" ? moment(org.employeeDetails[0].startDate).format('YYYYMMDD'): null;
      org.employeeDetails[0].endDate = org.employeeDetails[0].endDate !== null && org.employeeDetails[0].endDate !== "" ? moment(org.employeeDetails[0].endDate).format('YYYYMMDD'): null; 
        var url = "api/staff/update/"+org.id   
        var obj = JSON.stringify(org);
      
     console.log(obj);
        const resultMethod =   HttpLogin.axios().put(url,obj, {
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
              console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }
  
  }

  export class DeleteStaffAPI {
    public static deleteStaff(org: any) { 
        var url = "api/staff/delete/"+org          
     
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