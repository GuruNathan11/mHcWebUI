
import {
    UPDATE_PTVISIT_COMPLETED,UPDATE_PTVISIT_FAILED,UPDATE_PTVISIT_STARTED,CREATE_PTVISIT_COMPLETED,CREATE_PTVISIT_STARTED,CREATE_PTVISIT_FAILED,
    GETALL_PTVISIT_COMPLETED,GETALL_PTVISIT_FAILED,GETALL_PTVISIT_STARTED,GETBYID_PTVISIT_COMPLETED,GETBYID_PTVISIT_STARTED,GETBYID_PTVISIT_FAILED,
    GETBYPID_PTVISIT_COMPLETED,GETBYPID_PTVISIT_FAILED,GETBYPID_PTVISIT_STARTED,DELETE_PTVISIT_STARTED,DELETE_PTVISIT_COMPLETED,DELETE_PTVISIT_FAILED

} from '../actions/PatientVisitAdminController';



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

export const updatePatientVisitData = (state = intialLoginData, action: any) => {
 
    switch (action.type) {
       
        case UPDATE_PTVISIT_STARTED:
           return {
                ...state,
                isLoading: true,    
                isFormSubmit:false,
                items:[],
                loginInput: action.input
                
            };

        case UPDATE_PTVISIT_COMPLETED:
              return {
                ...state,
                isLoading: false,
                isFormSubmit:true,
                status: action.status,
                items: action.payload
                };
            
        case UPDATE_PTVISIT_FAILED:
            return {
                ...state,
                isLoading: true,
            }; 
      
            default:
                return state;
        }
        
    };

  
                    export const CreatePatientVisitData = (state = intialLoginData, action: any) => {
                        
                        switch (action.type) {
                            
                            case CREATE_PTVISIT_STARTED:
                               return {
                                    ...state,
                                    isLoading: true,    
                                    isFormSubmit:true,
                                    items:[],
                                    loginInput: action.input
                                    
                                };
                    
                            case CREATE_PTVISIT_COMPLETED:
                            
                                  return {
                                    ...state,
                                    isLoading: false,
                                    isFormSubmit:true,
                                    status: action.status,
                                    items: action.payload
                                    };
                                
                            case CREATE_PTVISIT_FAILED:
                            
                                return {
                                    ...state,
                                    isLoading: true,
                                }; 
                          
                                default:
                                    return state;
                            }
                            
                        };
                        export const getallPatientVisitData = (state = intialLoginData, action: any) => {
 
                            switch (action.type) {
                               
                                case GETALL_PTVISIT_STARTED:
                                   return {
                                        ...state,
                                        isLoading: true,    
                                        isFormSubmit:true,
                                        items:[],
                                        loginInput: action.input
                                        
                                    };
                        
                                case GETALL_PTVISIT_COMPLETED:
                                      return {
                                        ...state,
                                        isLoading: false,
                                        isFormSubmit:true,
                                        status: action.status,
                                        items: action.payload
                                        };
                                    
                                case GETALL_PTVISIT_FAILED
                                :
                                    return {
                                        ...state,
                                        isLoading: true,
                                    }; 
                              
                                    default:
                                        return state;
                                }
                                
                            };
                            export const getbyidPatientVisitData = (state = intialLoginData, action: any) => {
 
                                switch (action.type) {
                                   
                                    case GETBYID_PTVISIT_STARTED:
                                       return {
                                            ...state,
                                            isLoading: true,    
                                            isFormSubmit:true,
                                            items:[],
                                            loginInput: action.input
                                            
                                        };
                            
                                    case GETBYID_PTVISIT_COMPLETED:
                                          return {
                                            ...state,
                                            isLoading: false,
                                            isFormSubmit:true,
                                            status: action.status,
                                            items: action.payload
                                            };
                                        
                                    case GETBYID_PTVISIT_FAILED
                                    :
                                        return {
                                            ...state,
                                            isLoading: true,
                                        }; 
                                  
                                        default:
                                            return state;
                                    }
                                    
                                };

                                export const getbyPidPatientVisitData = (state = intialLoginData, action: any) => {
 
                                    switch (action.type) {
                                       
                                        case GETBYPID_PTVISIT_STARTED:
                                           return {
                                                ...state,
                                                isLoading: true,    
                                                isFormSubmit:true,
                                                items:[],
                                                loginInput: action.input
                                                
                                            };
                                
                                        case GETBYPID_PTVISIT_COMPLETED:
                                              return {
                                                ...state,
                                                isLoading: false,
                                                isFormSubmit:true,
                                                status: action.status,
                                                items: action.payload
                                                };
                                            
                                        case GETBYPID_PTVISIT_FAILED
                                        :
                                            return {
                                                ...state,
                                                isLoading: true,
                                            }; 
                                      
                                            default:
                                                return state;
                                        }
                                        
                                    };

                                    export const deletePatientVisitData = (state = intialLoginData, action: any) => {
                        
                                        switch (action.type) {
                                            
                                            case DELETE_PTVISIT_STARTED:
                                               return {
                                                    ...state,
                                                    isLoading: true,    
                                                    isFormSubmit:true,
                                                    items:[],
                                                    loginInput: action.input
                                                    
                                                };
                                    
                                            case DELETE_PTVISIT_COMPLETED:
                                            
                                                  return {
                                                    ...state,
                                                    isLoading: false,
                                                    isFormSubmit:true,
                                                    status: action.status,
                                                    items: action.payload
                                                    };
                                                
                                            case DELETE_PTVISIT_FAILED:
                                            
                                                return {
                                                    ...state,
                                                    isLoading: true,
                                                }; 
                                          
                                                default:
                                                    return state;
                                            }
                                            
                                        };                                    