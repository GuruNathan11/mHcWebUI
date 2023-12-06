import {
    SAVE_LOGIN_STARTED,
    SAVE_LOGIN_COMPLETED,
    SAVE_LOGIN_FAILED,
    CHECK_SECURITY_STARTED ,
    CHECK_SECURITY_COMPLETED,
    CHECK_SECURITY_FAILED,
    SAVE_FORGOTPASSWORD_STARTED,
    SAVE_FORGOTPASSWORD_COMPLETED,
    SAVE_FORGOTPASSWORD_FAILED,
    SAVE_RESETPASSWORD_STARTED,
    SAVE_RESETPASSWORD_COMPLETED,
    SAVE_RESETPASSWORD_FAILED,
    VERIFY_LOGIN_STARTED,
    VERIFY_LOGIN_COMPLETED, 
    VERIFY_LOGIN_FAILED,
    VERIFY_OTP_COMPLETED,
    VERIFY_OTP_STARTED,
    VERIFY_OTP_FAILED, SAVE_RESETSECRTKEY_STARTED,
    SAVE_RESETSECRTKEY_COMPLETED,
    SAVE_RESETSECRTKEY_FAILED,
    SAVE_RECREATEPASSWORD_STARTED,
    SAVE_RECREATEPASSWORD_COMPLETED,
    SAVE_RECREATEPASSWORD_FAILED
    
} from '../actions/Login';

const intialLoginData = {
    status: {
        statusCode: 300,
        statusDisplay: "",
        statusValue: true
    },
    items: [],
    loginInput: {       
        userId: "",
        password: "",
        username:"",
        jwtToken:"",
        secretKey:"",
        securityQuestion: "",
        email:"",
        otp:"",
        newPassword:"",  
        confirmNewPass: "",   
        answer: "",
        roleFkId:{roleId:0,roleName:"",description:"",status:0,createdAt:"",createdBy:"",updatedAt:"",updatedBy:""},
        status:0,
        createdAt:"",
        createdBy:"",
        updatedAt:"",
        updatedBy:""
    
    },
    isLoading: true,
    isFormSubmit: false,
    isLoggedIn: false,
    loggedStatus: false,
    error: ''
}



export const loginData = (state = intialLoginData, action: any) => {
 
    switch (action.type) {
       
        case SAVE_LOGIN_STARTED:
           return {
                ...state,
                isLoading: true,    
                isFormSubmit:true,
                items:[],
                loginInput: action.input
                
            };

        case SAVE_LOGIN_COMPLETED:
              return {
                ...state,
                isLoading: false,
                isFormSubmit:true,
                status: action.status,
                items: action.payload,
                loggedStatus: true
                };
            
        case SAVE_LOGIN_FAILED:
            return {
                ...state,
                isLoading: true,
                loggedStatus: false
            }; 
      
            default:
                return state;
        }
        
    };

    export const loginSecurityData = (state = intialLoginData, action: any) => {
    
        switch (action.type) {
            case CHECK_SECURITY_STARTED:
           return {
            ...state,
            isLoading: true,    
            isFormSubmit:true,
            items:[],
            loginInput: action.input
                
            };

        case CHECK_SECURITY_COMPLETED:
            return {
                ...state,
                isLoading: false,
                isFormSubmit:true,
                status: action.status,
                items: action.payload
                };
            
        case CHECK_SECURITY_FAILED:
            return {
                ...state,
                isLoading: true,
            };

        default:
            return state;
    }
};
    export const forgotpasswordData = (state = intialLoginData, action: any) => {
     
        switch (action.type) {
           
            case SAVE_FORGOTPASSWORD_STARTED:
               return {
                    ...state,
                    isLoading: true,    
                    items:[],
                    isFormSubmit:false,
                    userInput: action.input
                };
    
            case SAVE_FORGOTPASSWORD_COMPLETED:
          
                return {
                    ...state,
                    isLoading: false,
                    isFormSubmit:true,
                    status: action.status,
                    items: action.payload
                    };
                
            case SAVE_FORGOTPASSWORD_FAILED:
                return {
                    ...state,
                    isLoading: true,
                };
    
       
    
            default:
                return state;
        }
    };
    export const resetPasswordData = (state = intialLoginData, action: any) => {
        switch (action.type) {
           
            case SAVE_RESETPASSWORD_STARTED:
               return {
                ...state,
                isLoading: true,    
                isFormSubmit:true,
                items:[],
                loginInput: action.input
                    
                };
    
            case SAVE_RESETPASSWORD_COMPLETED:
                return {
                    ...state,
                    isLoading: false,
                    isFormSubmit:true,
                    status: action.status,
                    items: action.payload
                    };
                
            case SAVE_RESETPASSWORD_FAILED:
                return {
                    ...state,
                    isLoading: true,
                };
    
            default:
                return state;
        }
    };
    
    export const verifyLoginData = (state = intialLoginData, action: any) => {
        // console.log(action.type     );
        switch (action.type) {
           
            case VERIFY_LOGIN_STARTED:
               return {
                ...state,
                isLoading: true,    
                isFormSubmit:true,
                items:[],
                loginInput: action.input
                    
                };
    
            case VERIFY_LOGIN_COMPLETED:
               
                return {
                    ...state,
                    isLoading: false,
                    isFormSubmit:true,
                    status: action.status,
                    items: action.payload
                    };
                
            case VERIFY_LOGIN_FAILED:
                return {
                    ...state,
                    isLoading: true,
                };
    
            default:
                return state;
        }
    };
    export const verifyOTPData = (state = intialLoginData, action: any) => {
        switch (action.type) {
           
            case VERIFY_OTP_STARTED:
               return {
                ...state,
                isLoading: true,    
                isFormSubmit:true,
                items:[],
                loginInput: action.input
                    
                };
    
            case VERIFY_OTP_COMPLETED:
               
                return {
                    ...state,
                    isLoading: false,
                    isFormSubmit:true,
                    status: action.status,
                    items: action.payload
                    };
                
            case VERIFY_OTP_FAILED:
                return {
                    ...state,
                    isLoading: true,
                };
    
            default:
                return state;
        }
    };
    export const resetSecretkeyData = (state = intialLoginData, action: any) => {
        switch (action.type) {
           
            case SAVE_RESETSECRTKEY_STARTED:
               return {
                ...state,
                isLoading: true,    
                isFormSubmit:true,
                items:[],
                loginInput: action.input
                    
                };
    
            case SAVE_RESETSECRTKEY_COMPLETED:
               
                return {
                    ...state,
                    isLoading: false,
                    isFormSubmit:true,
                    status: action.status,
                    items: action.payload
                    };
                
            case SAVE_RESETSECRTKEY_FAILED:
                return {
                    ...state,
                    isLoading: true,
                };
    
            default:
                return state;
        }
    };

    export const reCreatePasswordData = (state = intialLoginData, action: any) => {
    
        switch (action.type) {

            case SAVE_RECREATEPASSWORD_STARTED:
                return {
                     ...state,
                     isLoading: true,    
                     isFormSubmit:true,
                     items:[],
                     loginInput: action.input
                     
                 };
     
             case SAVE_RECREATEPASSWORD_COMPLETED:
                   return {
                     ...state,
                     isLoading: false,
                     isFormSubmit:true,
                     status: action.status,
                     items: action.payload
                     };
                 
             case SAVE_RECREATEPASSWORD_FAILED:
                 return {
                     ...state,
                     isLoading: true,
                 }; 
           
                 default:
                     return state;
             }
          
};
   