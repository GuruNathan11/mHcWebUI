import { HttpLogin } from "../Http";
export class UpdatelocationAPI {
    public static Updatelocation(org: any) { 
        var url = "api/location/update/"+org.id;  
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
              
            
           //   console.log("API Response in post " +JSON.stringify(res.data));
                 return res;   
            })
            .catch((e: any) => {
          //    console.log("Error in post " +JSON.stringify(e));
              return e;               
            });
            return resultMethod;
      }
  
  }
  export class UpdateactivityAPI {
    public static Updateactivity(org: any) { 
        var url = "api/activity/update/"+org.id;  
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
  export class Updateq15API {
    public static Updateq15(org: any) { 
        var url = "api/Q15/update/"+org.id;  
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
  export class CreateLocationAPI {
    public static createloaction(org: any) { 
        var url = "api/location/register"   
        var obj = JSON.stringify(org);
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
  export class CreateactivityAPI {
    public static createactivity(org: any) { 
        var url = "api/activity/register"   
        var obj = JSON.stringify(org);
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
  export class Createq15API {
    public static createq15(org: any) { 
        var url = "api/Q15/register"   
        var obj = JSON.stringify(org);
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
  export class Getidq15formAPI {
    public static getid(org: any) { 
        var url = "api/get/"  +org.id; 
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