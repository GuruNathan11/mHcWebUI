import { HttpLogin } from "../Http";
export class AssignptstaffAPI {
    public static Assignptstaff(org: any) { 
        var url = "api/patient_staff/assign"   
        var obj = JSON.stringify(org);
        //  console.log("URL " +JSON.stringify(url));
        //  console.log("Input " +JSON.stringify(org));
        const resultMethod =   HttpLogin.axios().post(url,obj, {
              headers: { 
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*"
              }
            })
            .then(res => {       
              
              alert(res.data.message.description);
                //console.log("API Response in post " +JSON.stringify(res.data));
                 return res;   
            })
            .catch((e: any) => {
              alert(e.data.message.description);
              //  console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }
  
  }
  export class GetptstaffAPI {
    public static getptstaff(org: any) { 
        var url = "api/patient_staff/get_all"   
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
  export class GetidptstaffAPI {
    public static getidptstaff(org: any) { 
        var url = "api/patient_staff/get/" +org.id;    
        var obj = JSON.stringify(org);
        //  console.log("URL " +JSON.stringify(url));
        //  console.log("Input " +JSON.stringify(org));
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
  
  export class AssignstaffPatientAPI {
    public static AssignstaffPatient(org: any) { 
        var url = "/api/staff_patient/assign"   
        var obj = JSON.stringify(org);
        //  console.log("URL " +JSON.stringify(url));
        //  console.log("Input " +JSON.stringify(org));
        const resultMethod =   HttpLogin.axios().post(url,obj, {
              headers: { 
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*"
              }
            })
            .then(res => {       
              
            alert(res.data.message.description);
                console.log("API Response in post " +JSON.stringify(res.data));
                 return res;   
            })
            .catch((e: any) => {
              alert(e.data);
                console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }
  
  }