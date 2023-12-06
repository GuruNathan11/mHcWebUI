import { HttpLogin } from "../Http";
export class OrganizationAPI {
    public static getAllOrganization(org: any) { 
        var url = "api/org/getAll";   
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

export class UpdateOrganizationAPI {
  public static updateOrganization(org: any) { 
      var url = "api/org/update/"+org.id;   
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

export class CreateOrganizationAPI {
  public static createOrganization(org: any) { 
      var url = "api/org/register"   
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

export class GetByIdOrganizationAPI {
  public static getByIdOrganization(org: any) { 
    //  console.log(JSON.stringify(org));
      var url = "api/org/getById/"+org;
      var obj = JSON.stringify(org);
   
      const resultMethod =   HttpLogin.axios().post(url, {
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