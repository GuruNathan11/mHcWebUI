import { HttpLogin } from "../Http";
export class getAllBedAssignmentAPI {
    public static getAllBedAssignment
    (org: any) { 
        var url = "api/bedConfig/getAll"   
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

  export class createBedAssignmentAPI {
  public static createBedAssignment(input: any) {
    var obj=JSON.stringify(input);
    var url="api/bedConfig/add";
    //  console.log("started");
    const resultMethod = HttpLogin.axios().post(url, obj,
      {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*"
        }
      })
      .then(res => {
        return res;
      }).catch((e: any) => {
    
              return e.message; 
      });
    return resultMethod;
    }
}

export class getBedAssignmentByOrgIdAPI {
  public static getBedAssignmentByOrgId
  (org: any) { 
      var url = "/api/getBedMasterConfig/"+org;   
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