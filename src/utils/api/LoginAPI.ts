import moment from "moment";
import { HttpLogin } from "../Http";
export class LoginAPI {
 
  public static saveLogin(user: any) { 
    var url = "/api/user/signin";   
    var obj = JSON.stringify(user);
 
    const resultMethod =   HttpLogin.axios().post(url, obj, {
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
          }
        })
        .then(res => {       
        
        
          window.localStorage.setItem("RedirctURLName", "/MettlerPasscodePage/2");
          return res;   
        })
        .catch((e: any) => {
          return e;               
        });
        return resultMethod;
  }
  public static loginSecurity(input: any) {
    var obj=JSON.stringify(input);
    var url="api/user/verify";
    const resultMethod = HttpLogin.axios().post(url,  obj,
      {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*"
        }
      })
      .then(res => {
        
     //   window.localStorage.setItem("LOGINDATA", JSON.stringify(res.data));
        window.localStorage.setItem("loginSessionData", "/MettlerPatientInfo"); 
        return res;   
      }).catch((e: any) => {
        return e.response;
      });
    return resultMethod;
}
public static forgetPassword(input: any) {

   var obj=JSON.stringify(input);
   var url="api/user/forgot-password";
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
       return e.response;
     });
   return resultMethod;
}
public static ResetPassword(input: any) {
  var obj=JSON.stringify(input);
  var url="api/user/reset-password";
 
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


  public static verifyLogin(input: any) {
     
    var url = "api/user/verify";
    var source = {
      secretKey:input.secretKey,
      jwtToken: input.jwtToken
    };
    var obj = JSON.stringify(source);
    
    var obJSon = JSON.parse(obj);
  
    
  
   
      const resultMethod = HttpLogin.axios()
        .post(url, obJSon, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(res => {
           return res;
        })
        .catch((e: any) => {
          var response={
            "message": "Login successful!"
           }
              return response; 
        });
      return resultMethod;
    }

  
public static verifyotp (input: any) {
 
  var obj=JSON.stringify(input);
  var url="api/user/verify-otp";
 
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
      return e.response;
    });
  return resultMethod;
} 

public static resetSecretKey (input: any) {
 
  var url="api/user/resetSecretKey";
  var source = {
    email:input.email,
    jwt: input.jwt
  };
  var obj = JSON.stringify(source);
    
  var obJSon = JSON.parse(obj);
//  console.log("obj="+obj);
 
  const resultMethod = HttpLogin.axios().post(url, obJSon,
    {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*"
      }
    })
    .then(res => {
      // console.log("Response in post" + res);

      return res;
    }).catch((e: any) => {
      // console.log("Error in post" + e);
      return e.response;
    });
  return resultMethod;
} 

public static reCreatePassword (input: any) {
 
  var url="/api/user/recreatePassword";
    
  var obj = JSON.stringify(input);
 console.log("obj="+obj);
 
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
       console.log("Response in post" + JSON.stringify(res));

      return res;
    }).catch((e: any) => {
       console.log("Error in post" + e);
      return e.response;
    });
  return resultMethod;
} 

}

