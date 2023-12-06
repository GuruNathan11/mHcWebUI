import{
    GETALL_STAFF_STARTED,
    GETALL_STAFF_COMPLETED,
    GETALL_STAFF_FAILED,
    GETBYID_STAFF_STARTED,
    GETBYID_STAFF_COMPLETED,
    GETBYID_STAFF_FAILED,
    CREATE_STAFF_STARTED,
    CREATE_STAFF_COMPLETED,
    CREATE_STAFF_FAILED,
    INUPDATE_STAFF_STARTED,
    INUPDATE_STAFF_COMPLETED,
    INUPDATE_STAFF_FAILED,
    OUTUPDATE_STAFF_STARTED,
    OUTUPDATE_STAFF_COMPLETED,
    OUTUPDATE_STAFF_FAILED,
    UPDATE_STAFF_STARTED,
    UPDATE_STAFF_COMPLETED,
    UPDATE_STAFF_FAILED,
    DELETE_STAFF_STARTED,
    DELETE_STAFF_COMPLETED,
    DELETE_STAFF_FAILED
} from '../actions/Staff';

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

export const getAllStaffData = (state = intialLoginData, action: any) => {
 
    switch (action.type) {
       
        case GETALL_STAFF_STARTED:
           return {
                ...state,
                isLoading: true,    
                isFormSubmit:false,
                items:[],
                loginInput: action.input
                
            };

        case GETALL_STAFF_COMPLETED:
              return {
                ...state,
                isLoading: false,
                isFormSubmit:true,
                status: action.status,
                items: action.payload
                };
            
        case GETALL_STAFF_FAILED:
            return {
                ...state,
                isLoading: true,
            }; 
      
            default:
                return state;
        }
        
    };

    export const getByIdStaffData = (state = intialLoginData, action: any) => {
 
        switch (action.type) {
           
            case GETBYID_STAFF_STARTED:
               return {
                    ...state,
                    isLoading: true,    
                    isFormSubmit:false,
                    items:[],
                    loginInput: action.input
                    
                };
    
            case GETBYID_STAFF_COMPLETED:
                  return {
                    ...state,
                    isLoading: false,
                    isFormSubmit:true,
                    status: action.status,
                    items: action.payload
                    };
                
            case GETBYID_STAFF_FAILED:
                return {
                    ...state,
                    isLoading: true,
                }; 
          
                default:
                    return state;
            }
            
        };

        export const createStaffData = (state = intialLoginData, action: any) => {
 
            switch (action.type) {
               
                case CREATE_STAFF_STARTED:
                   return {
                        ...state,
                        isLoading: true,    
                        isFormSubmit:false,
                        items:[],
                        loginInput: action.input
                        
                    };
        
                case CREATE_STAFF_COMPLETED:
                      return {
                        ...state,
                        isLoading: false,
                        isFormSubmit:true,
                        status: action.status,
                        items: action.payload
                        };
                    
                case CREATE_STAFF_FAILED:
                    return {
                        ...state,
                        isLoading: true,
                    }; 
              
                    default:
                        return state;
                }
                
            };

            export const inUpdateStaffData = (state = intialLoginData, action: any) => {
 
                switch (action.type) {
                   
                    case INUPDATE_STAFF_STARTED:
                       return {
                            ...state,
                            isLoading: true,    
                            isFormSubmit:true,
                            items:[],
                            loginInput: action.input
                            
                        };
            
                    case INUPDATE_STAFF_COMPLETED:
                          return {
                            ...state,
                            isLoading: false,
                            isFormSubmit:true,
                            status: action.status,
                            items: action.payload
                            };
                        
                    case INUPDATE_STAFF_FAILED:
                        return {
                            ...state,
                            isLoading: true,
                        }; 
                  
                        default:
                            return state;
                    }
                    
                };

                export const outUpdateStaffData = (state = intialLoginData, action: any) => {
 
                    switch (action.type) {
                       
                        case OUTUPDATE_STAFF_STARTED:
                           return {
                                ...state,
                                isLoading: true,    
                                isFormSubmit:true,
                                items:[],
                                loginInput: action.input
                                
                            };
                
                        case OUTUPDATE_STAFF_COMPLETED:
                              return {
                                ...state,
                                isLoading: false,
                                isFormSubmit:true,
                                status: action.status,
                                items: action.payload
                                };
                            
                        case OUTUPDATE_STAFF_FAILED:
                            return {
                                ...state,
                                isLoading: true,
                            }; 
                      
                            default:
                                return state;
                        }
                        
                    };

                    export const UpdateStaffData = (state = intialLoginData, action: any) => {                       
                        switch (action.type) {
                           
                            case UPDATE_STAFF_STARTED:
                               return {
                                    ...state,
                                    isLoading: true,    
                                    isFormSubmit:false,                                 
                                    loginInput: action.input                                    
                                };
                    
                            case UPDATE_STAFF_COMPLETED:
                                  return {
                                    ...state,
                                    isLoading: false,
                                    isFormSubmit:true,
                                    status: action.payload,
                                    items: action.payload
                                    };
                                
                            case UPDATE_STAFF_FAILED:
                                return {
                                    ...state,
                                    isLoading: true,
                                }; 
                          
                                default:
                                    return state;
                            }
                            
                        };

                        export const deleteStaffData = (state = intialLoginData, action: any) => {
 
                            switch (action.type) {
                               
                                case DELETE_STAFF_STARTED:
                                   return {
                                        ...state,
                                        isLoading: true,    
                                        isFormSubmit:true,
                                        items:[],
                                        loginInput: action.input
                                        
                                    };
                        
                                case DELETE_STAFF_COMPLETED:
                                      return {
                                        ...state,
                                        isLoading: false,
                                        isFormSubmit:true,
                                        status: action.status,
                                        items: action.payload
                                        };
                                    
                                case DELETE_STAFF_FAILED:
                                    return {
                                        ...state,
                                        isLoading: true,
                                    }; 
                              
                                    default:
                                        return state;
                                }
                                
                            };   
    

    