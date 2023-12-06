import moment from "moment";
import { HttpLogin } from "../Http";

export class CreateIndexFormAPI {
    public static createIndexForm(org: any) { 
        var url = "/api/indexForm/add"               
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
              alert(res.data.message.description);
              setTimeout(() => {  
                window.location.reload();               
              }, (1000)); 
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

  export class CreateIndexByFormIdAPI {
    public static createIndexByFormId(org: any,newOrg :any) { 
        var url = "/api/indexForm/contents/"+org;               
      var obj = JSON.stringify(newOrg);
     
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
              setTimeout(() => {  
                window.location.reload();               
              }, (1000));                                 
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

  export class CreateSubIndexFormIdAPI {
    public static createSubIndexFormId(org: any,newOrg :any,newOrg1 :any) { 
        var url = "/api/indexForm/subheadings/"+org+"/"+newOrg;              
      var obj = JSON.stringify(newOrg1);
     
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
              setTimeout(() => {  
                window.location.reload();               
              }, (1000));                                
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

  export class CreateContentIndexFormIdAPI {
    public static createContentIndexFormId(org: any,newOrg :any,newOrg1 :any,newOrg3 :any) { 
        var url = "/api/indexForm/index-contents/"+org+"/"+newOrg+"/"+newOrg1;              
      var obj = JSON.stringify(newOrg3);
     
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
              setTimeout(() => {  
                window.location.reload();               
              }, (1000));                                
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

  export class GetAllIndexFormAPI {
    public static getAllIndexForm(org: any) { 
        var url = "/api/indexForm/getAll"   
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

  export class GetByIdIndexFormAPI {
    public static getByIdIndexForm(org: any) { 
        var url = "/api/indexForm/getById/{id}"   
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


  export class DeleteIndexFormAPI {
    public static deleteIndexForm(org: any) { 
        var url = "/api/filledForm/delete/{Pid}/{form}"+org;               
      var obj = JSON.stringify(org);
     
        const resultMethod =   HttpLogin.axios().delete(url, {
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

  export class UpdateIndexFormAPI {
    public static updateIndexForm(org: any) { 
        var url = "/api/bed/deleteById/"+org;               
      var obj = JSON.stringify(org);
     
        const resultMethod =   HttpLogin.axios().put(url, {
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