import moment from "moment";
import { HttpLogin } from "../Http";

export class CreateOrderProcedureProblemAPI {
    public static createOrderProcedureProblem(org: any) { 
    var url = "/api/labpro/register"  

      var obj = JSON.stringify(org);
      console.log(JSON.stringify(url))
     
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

  export class GetAllOrderProcedureProblemsAPI {
    public static getAllOrderProcedureProblems(org: any) { 
        var url = "/api/labpro/getAll"   
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
  
  export class GetOrderProcedureByControlAPI {
    public static getOrderProcedureByControlInput(org: any) { 
        var url = "/api/labpro/ById/"+org;   
        var obj = JSON.stringify(org);
        console.log("/api/labpro/ById/"+org);
        const resultMethod =   HttpLogin.axios().get(url, {
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


  export class UpdateOrderProcedureProblemsAPI {
    public static updateOrderProcedureProblems(org: any) { 
        var url = "/api/labpro/update/"+org.id   
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

  export class DeleteOrderProcedureProblemsAPI {
    public static deleteOrderProcedureProblems(org: any) { 
        var url = "/api/labpro/delete/"+org.id;         
     
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