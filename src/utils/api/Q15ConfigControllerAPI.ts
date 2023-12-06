import moment from "moment";
import { HttpLogin } from "../Http";
export class CreateQ15CONFIGAPI {
    public static createq15config(org: any) { 
        var url = "api/config/register";
        org.q15Date = (org.q15Date!==null && org.q15Date!=="") ?moment(org.q15Date).format('YYYYMMDD'):"";   
        var obj = JSON.stringify(org);
    //    console.log("URL " +JSON.stringify(url));
        console.log("Input " +JSON.stringify(obj));
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
  export class Getq15configAPI {
    public static getq15config
    (org: any) { 
        var url = "api/config/get_all"   
        var obj = JSON.stringify(org);
    //    console.log("URL " +JSON.stringify(url));
    //    console.log("Input " +JSON.stringify(org));
        const resultMethod =   HttpLogin.axios().get(url, {
            headers: { 
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*",
              "Access-Control-Allow-Headers": "*"
            }
          })
            .then(res => {       
              
            
          //    console.log("API Response in post " +JSON.stringify(res.data));
                 return res;   
            })
            .catch((e: any) => {
          //    console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }
  
  }
  export class Getidq15configAPI {
    public static getidQ15confin(org: any) { 
        var url = "api/config/getByID/"+org;    
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
              
            
          //    console.log("API Response in post " +JSON.stringify(res.data));
                 return res;   
            })
            .catch((e: any) => {
          //    console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }
  
  }
  export class GetSLOTq15configAPI {
    public static getslotQ15confin(org: any) { 
        var url = "api/config/getBySlot/" +org.id;    
        var obj = JSON.stringify(org);
    //    console.log("URL " +JSON.stringify(url));
    //    console.log("Input " +JSON.stringify(org));
        const resultMethod =   HttpLogin.axios().get(url, {
            headers: { 
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*",
              "Access-Control-Allow-Headers": "*"
            }
          })
            .then(res => {       
              
            
          //    console.log("API Response in post " +JSON.stringify(res.data));
                 return res;   
            })
            .catch((e: any) => {
          //    console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }
  
  }
