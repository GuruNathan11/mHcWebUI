import {
    CREATE_INDEX_FORM_STARTED,
    CREATE_INDEX_FORM_COMPLETED,
    CREATE_INDEX_FORM_FAILED,
    CREATE_BYFORMID_INDEX_FORM_STARTED,
    CREATE_BYFORMID_INDEX_FORM_COMPLETED,
    CREATE_BYFORMID_INDEX_FORM_FAILED,
    CREATE_BYSUBID_FORM_STARTED,
    CREATE_BYSUBID_FORM_COMPLETED,
    CREATE_BYSUBID_FORM_FAILED,
    CREATE_BYCONTENTID_INDEX_FORM_STARTED,
    CREATE_BYCONTENTID_INDEX_FORM_COMPLETED,
    CREATE_BYCONTENTID_INDEX_FORM_FAILED,
    GETALL_INDEX_FORM_STARTED,
    GETALL_INDEX_FORM_COMPLETED,
    GETALL_INDEX_FORM_FAILED,
    GET_BYID_INDEX_FORM_STARTED,
    GET_BYID_INDEX_FORM_COMPLETED,
    GET_BYID_INDEX_FORM_FAILED,
    DELETE_INDEX_FORM_STARTED,
    DELETE_INDEX_FORM_COMPLETED,
    DELETE_INDEX_FORM_FAILED,
    UPDATE_INDEX_FORM_STARTED,
    UPDATE_INDEX_FORM_COMPLETED,
    UPDATE_INDEX_FORM_FAILED
} from '../actions/IndexFormController';

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

export const createIndexFormData = (state = intialLoginData, action: any) => {
 
    switch (action.type) {
       
        case CREATE_INDEX_FORM_STARTED:
           return {
                ...state,
                isLoading: true,    
                isFormSubmit:true,
                items:[],
                loginInput: action.input
                
            };

        case CREATE_INDEX_FORM_COMPLETED:
              return {
                ...state,
                isLoading: false,
                isFormSubmit:true,
                status: action.status,
                items: action.payload
                };
            
        case CREATE_INDEX_FORM_FAILED:
            return {
                ...state,
                isLoading: true,
            }; 
      
            default:
                return state;
        }
        
    };

    export const createIndexByFormIdData = (state = intialLoginData, action: any) => {
 
        switch (action.type) {
           
            case CREATE_BYFORMID_INDEX_FORM_STARTED:
               return {
                    ...state,
                    isLoading: true,    
                    isFormSubmit:true,
                    items:[],
                    loginInput: action.input
                    
                };
    
            case CREATE_BYFORMID_INDEX_FORM_COMPLETED:
                  return {
                    ...state,
                    isLoading: false,
                    isFormSubmit:true,
                    status: action.status,
                    items: action.payload
                    };
                
            case CREATE_BYFORMID_INDEX_FORM_FAILED:
                return {
                    ...state,
                    isLoading: true,
                }; 
          
                default:
                    return state;
            }
            
        };

        export const createSubIndexFormIdData = (state = intialLoginData, action: any) => {
 
            switch (action.type) {
               
                case CREATE_BYSUBID_FORM_STARTED:
                   return {
                        ...state,
                        isLoading: true,    
                        isFormSubmit:true,
                        items:[],
                        loginInput: action.input
                        
                    };
        
                case CREATE_BYSUBID_FORM_COMPLETED:
                      return {
                        ...state,
                        isLoading: false,
                        isFormSubmit:true,
                        status: action.status,
                        items: action.payload
                        };
                    
                case CREATE_BYSUBID_FORM_FAILED:
                    return {
                        ...state,
                        isLoading: true,
                    }; 
              
                    default:
                        return state;
                }
                
            };

            export const createContentIndexFormIdData = (state = intialLoginData, action: any) => {
 
                switch (action.type) {
                   
                    case CREATE_BYCONTENTID_INDEX_FORM_STARTED:
                       return {
                            ...state,
                            isLoading: true,    
                            isFormSubmit:true,
                            items:[],
                            loginInput: action.input
                            
                        };
            
                    case CREATE_BYCONTENTID_INDEX_FORM_COMPLETED:
                          return {
                            ...state,
                            isLoading: false,
                            isFormSubmit:true,
                            status: action.status,
                            items: action.payload
                            };
                        
                    case CREATE_BYCONTENTID_INDEX_FORM_FAILED:
                        return {
                            ...state,
                            isLoading: true,
                        }; 
                  
                        default:
                            return state;
                    }
                    
                };

    export const getAllIndexFormData = (state = intialLoginData, action: any) => {
 
        switch (action.type) {
           
            case GETALL_INDEX_FORM_STARTED:
               return {
                    ...state,
                    isLoading: true,    
                    isFormSubmit:true,
                    items:[],
                    loginInput: action.input
                    
                };
    
            case GETALL_INDEX_FORM_COMPLETED:
                  return {
                    ...state,
                    isLoading: false,
                    isFormSubmit:true,
                    status: action.status,
                    items: action.payload
                    };
                
            case GETALL_INDEX_FORM_FAILED:
                return {
                    ...state,
                    isLoading: true,
                }; 
          
                default:
                    return state;
            }
            
        };


        export const deleteIndexFormData = (state = intialLoginData, action: any) => {
 
            switch (action.type) {
               
                case DELETE_INDEX_FORM_STARTED:
                   return {
                        ...state,
                        isLoading: true,    
                        isFormSubmit:true,
                        items:[],
                        loginInput: action.input
                        
                    };
        
                case DELETE_INDEX_FORM_COMPLETED:
                      return {
                        ...state,
                        isLoading: false,
                        isFormSubmit:true,
                        status: action.status,
                        items: action.payload
                        };
                    
                case DELETE_INDEX_FORM_FAILED:
                    return {
                        ...state,
                        isLoading: true,
                    }; 
              
                    default:
                        return state;
                }
                
            };

            export const getIndexFormByIdData = (state = intialLoginData, action: any) => {
 
                switch (action.type) {
                   
                    case GET_BYID_INDEX_FORM_STARTED:
                       return {
                            ...state,
                            isLoading: true,    
                            isFormSubmit:true,
                            items:[],
                            loginInput: action.input
                            
                        };
            
                    case GET_BYID_INDEX_FORM_COMPLETED:
                          return {
                            ...state,
                            isLoading: false,
                            isFormSubmit:true,
                            status: action.status,
                            items: action.payload
                            };
                        
                    case GET_BYID_INDEX_FORM_FAILED:
                        return {
                            ...state,
                            isLoading: true,
                        }; 
                  
                        default:
                            return state;
                    }
                    
                };

                export const updateIndexFormData = (state = intialLoginData, action: any) => {
 
                    switch (action.type) {
                       
                        case UPDATE_INDEX_FORM_STARTED:
                           return {
                                ...state,
                                isLoading: true,    
                                isFormSubmit:true,
                                items:[],
                                loginInput: action.input
                                
                            };
                
                        case UPDATE_INDEX_FORM_COMPLETED:
                              return {
                                ...state,
                                isLoading: false,
                                isFormSubmit:true,
                                status: action.status,
                                items: action.payload
                                };
                            
                        case UPDATE_INDEX_FORM_FAILED:
                            return {
                                ...state,
                                isLoading: true,
                            }; 
                      
                            default:
                                return state;
                        }
                        
                    };