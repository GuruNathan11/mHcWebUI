import {
UPDATE_LOCATION_Q15FORM_COMPLETED,UPDATE_LOCATION_Q15FORM_FAILED,UPDATE_LOCATION_Q15FORM_STARTED,UPDATE_ACTIVITY_Q15FORM_COMPLETED,UPDATE_ACTIVITY_Q15FORM_FAILED,UPDATE_ACTIVITY_Q15FORM_STARTED,
UPDATE_Q15FORM_COMPLETED,UPDATE_Q15FORM_FAILED,UPDATE_Q15FORM_STARTED,CREATE_ACTIVITY_Q15FORM_COMPLETED,CREATE_ACTIVITY_Q15FORM_FAILED,CREATE_ACTIVITY_Q15FORM_STARTED,
CREATE_LOCATION_Q15FORM_COMPLETED,CREATE_LOCATION_Q15FORM_FAILED,CREATE_LOCATION_Q15FORM_STARTED,CREATE_Q15FORM_COMPLETED,CREATE_Q15FORM_FAILED,CREATE_Q15FORM_STARTED,
GET_Q15FORM_COMPLETED,GET_Q15FORM_FAILED,GET_Q15FORM_STARTED

} from '../actions/Q15FormController';


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
    error: ''
}
export const updatelocationData = (state = intialLoginData, action: any) => {
 
    switch (action.type) {
       
        case UPDATE_LOCATION_Q15FORM_STARTED:
           return {
                ...state,
                isLoading: true,    
                isFormSubmit:true,
                items:[],
                loginInput: action.input
                
            };

        case UPDATE_LOCATION_Q15FORM_COMPLETED:
              return {
                ...state,
                isLoading: false,
                isFormSubmit:true,
                status: action.status,
                items: action.payload
                };
            
        case UPDATE_LOCATION_Q15FORM_FAILED:
            return {
                ...state,
                isLoading: true,
            }; 
      
            default:
                return state;
        }
        
    };
    export const updateactivityData = (state = intialLoginData, action: any) => {
 
        switch (action.type) {
           
            case UPDATE_ACTIVITY_Q15FORM_STARTED:
               return {
                    ...state,
                    isLoading: true,    
                    isFormSubmit:true,
                    items:[],
                    loginInput: action.input
                    
                };
    
            case UPDATE_ACTIVITY_Q15FORM_COMPLETED:
                  return {
                    ...state,
                    isLoading: false,
                    isFormSubmit:true,
                    status: action.status,
                    items: action.payload
                    };
                
            case UPDATE_ACTIVITY_Q15FORM_FAILED:
                return {
                    ...state,
                    isLoading: true,
                }; 
          
                default:
                    return state;
            }
            
        };
        export const updateQ15Data = (state = intialLoginData, action: any) => {
 
            switch (action.type) {
               
                case UPDATE_Q15FORM_STARTED:
                   return {
                        ...state,
                        isLoading: true,    
                        isFormSubmit:true,
                        items:[],
                        loginInput: action.input
                        
                    };
        
                case UPDATE_Q15FORM_COMPLETED:
                      return {
                        ...state,
                        isLoading: false,
                        isFormSubmit:true,
                        status: action.status,
                        items: action.payload
                        };
                    
                case UPDATE_Q15FORM_FAILED:
                    return {
                        ...state,
                        isLoading: true,
                    }; 
              
                    default:
                        return state;
                }
                
            };
            export const CreatelocationQ15Data = (state = intialLoginData, action: any) => {
 
                switch (action.type) {
                   
                    case CREATE_LOCATION_Q15FORM_STARTED:
                       return {
                            ...state,
                            isLoading: true,    
                            isFormSubmit:true,
                            items:[],
                            loginInput: action.input
                            
                        };
            
                    case CREATE_LOCATION_Q15FORM_COMPLETED:
                          return {
                            ...state,
                            isLoading: false,
                            isFormSubmit:true,
                            status: action.status,
                            items: action.payload
                            };
                        
                    case CREATE_LOCATION_Q15FORM_FAILED:
                        return {
                            ...state,
                            isLoading: true,
                        }; 
                  
                        default:
                            return state;
                    }
                    
                };
                export const createactivityQ15Data = (state = intialLoginData, action: any) => {
 
                    switch (action.type) {
                       
                        case CREATE_ACTIVITY_Q15FORM_STARTED:
                           return {
                                ...state,
                                isLoading: true,    
                                isFormSubmit:true,
                                items:[],
                                loginInput: action.input
                                
                            };
                
                        case CREATE_ACTIVITY_Q15FORM_COMPLETED:
                              return {
                                ...state,
                                isLoading: false,
                                isFormSubmit:true,
                                status: action.status,
                                items: action.payload
                                };
                            
                        case CREATE_ACTIVITY_Q15FORM_FAILED:
                            return {
                                ...state,
                                isLoading: true,
                            }; 
                      
                            default:
                                return state;
                        }
                        
                    };
                    export const createQ15Data = (state = intialLoginData, action: any) => {
 
                        switch (action.type) {
                           
                            case CREATE_Q15FORM_STARTED:
                               return {
                                    ...state,
                                    isLoading: true,    
                                    isFormSubmit:true,
                                    items:[],
                                    loginInput: action.input
                                    
                                };
                    
                            case CREATE_Q15FORM_COMPLETED:
                                  return {
                                    ...state,
                                    isLoading: false,
                                    isFormSubmit:true,
                                    status: action.status,
                                    items: action.payload
                                    };
                                
                            case CREATE_Q15FORM_FAILED:
                                return {
                                    ...state,
                                    isLoading: true,
                                }; 
                          
                                default:
                                    return state;
                            }
                            
                        };
                        export const getQ15Data = (state = intialLoginData, action: any) => {
 
                            switch (action.type) {
                               
                                case GET_Q15FORM_STARTED:
                                   return {
                                        ...state,
                                        isLoading: true,    
                                        isFormSubmit:true,
                                        items:[],
                                        loginInput: action.input
                                        
                                    };
                        
                                case GET_Q15FORM_COMPLETED:
                                      return {
                                        ...state,
                                        isLoading: false,
                                        isFormSubmit:true,
                                        status: action.status,
                                        items: action.payload
                                        };
                                    
                                case GET_Q15FORM_FAILED:
                                    return {
                                        ...state,
                                        isLoading: true,
                                    }; 
                              
                                    default:
                                        return state;
                                }
                                
                            };