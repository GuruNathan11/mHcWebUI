import {
    CREATE_PATIENT_STARTED,
    CREATE_PATIENT_COMPLETED,
    CREATE_PATIENT_FAILED,
    GETALL_PATIENT_STARTED,
    GETALL_PATIENT_COMPLETED,
    GETALL_PATIENT_FAILED,
    GETBYID_PATIENT_STARTED,
    GETBYID_PATIENT_COMPLETED,
    GETBYID_PATIENT_FAILED,
    GETBYINPUT_PATIENT_STARTED,
    GETBYINPUT_PATIENT_COMPLETED,
    GETBYINPUT_PATIENT_FAILED,
    DISCHARGEBYID_PATIENT_STARTED,
    DISCHARGEBYID_PATIENT_COMPLETED,
    DISCHARGEBYID_PATIENT_FAILED,
    UPDATE_PATIENT_STARTED,
    UPDATE_PATIENT_COMPLETED,
    UPDATE_PATIENT_FAILED,
    DELETE_PATIENT_STARTED,
    DELETE_PATIENT_COMPLETED,
    DELETE_PATIENT_FAILED
} from '../actions/Patient';

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

export const createPatientData = (state = intialLoginData, action: any) => {
 
    switch (action.type) {
       
        case CREATE_PATIENT_STARTED:
           return {
                ...state,
                isLoading: true,    
                isFormSubmit:true,
                items:[],
                loginInput: action.input
                
            };

        case CREATE_PATIENT_COMPLETED:
              return {
                ...state,
                isLoading: false,
                isFormSubmit:true,
                status: action.status,
                items: action.payload
                };
            
        case CREATE_PATIENT_FAILED:
            return {
                ...state,
                isLoading: true,
            }; 
      
            default:
                return state;
        }
        
    };

    export const getAllPatientData = (state = intialLoginData, action: any) => {
 
        switch (action.type) {
           
            case GETALL_PATIENT_STARTED:
               return {
                    ...state,
                    isLoading: true,    
                    isFormSubmit:true,
                    items:[],
                    loginInput: action.input
                    
                };
    
            case GETALL_PATIENT_COMPLETED:
                  return {
                    ...state,
                    isLoading: false,
                    isFormSubmit:true,
                    status: action.status,
                    items: action.payload
                    };
                
            case GETALL_PATIENT_FAILED:
                return {
                    ...state,
                    isLoading: true,
                }; 
          
                default:
                    return state;
            }
            
        };

        export const getByIdPatientData = (state = intialLoginData, action: any) => {
 
            switch (action.type) {
               
                case GETBYID_PATIENT_STARTED:
                   return {
                        ...state,
                        isLoading: true,    
                        isFormSubmit:true,
                        items:[],
                        loginInput: action.input
                        
                    };
        
                case GETBYID_PATIENT_COMPLETED:
                      return {
                        ...state,
                        isLoading: false,
                        isFormSubmit:true,
                        status: action.status,
                        items: action.payload
                        };
                    
                case GETBYID_PATIENT_FAILED:
                    return {
                        ...state,
                        isLoading: true,
                    }; 
              
                    default:
                        return state;
                }
                
            };
            
            export const getPatientByInputData = (state = intialLoginData, action: any) => {
 
            switch (action.type) {
               
                case GETBYINPUT_PATIENT_STARTED:
                   return {
                        ...state,
                        isLoading: true,    
                        isFormSubmit:true,
                        items:[],
                        loginInput: action.input
                        
                    };
        
                case GETBYINPUT_PATIENT_COMPLETED:
                      return {
                        ...state,
                        isLoading: false,
                        isFormSubmit:true,
                        status: action.status,
                        items: action.payload
                        };
                    
                case GETBYINPUT_PATIENT_FAILED:
                    return {
                        ...state,
                        isLoading: true,
                    }; 
              
                    default:
                        return state;
                }
                
            };

            export const dischargePatientById = (state = intialLoginData, action: any) => {
 
                switch (action.type) {
                   
                    case DISCHARGEBYID_PATIENT_STARTED:
                       return {
                            ...state,
                            isLoading: true,    
                            isFormSubmit:true,
                            items:[],
                            loginInput: action.input
                            
                        };
            
                    case DISCHARGEBYID_PATIENT_COMPLETED:
                          return {
                            ...state,
                            isLoading: false,
                            isFormSubmit:true,
                            status: action.status,
                            items: action.payload
                            };
                        
                    case DISCHARGEBYID_PATIENT_FAILED:
                        return {
                            ...state,
                            isLoading: true,
                        }; 
                  
                        default:
                            return state;
                    }
                    
                };

                export const updatePatientData = (state = intialLoginData, action: any) => {
 
                    switch (action.type) {
                       
                        case UPDATE_PATIENT_STARTED:
                           return {
                                ...state,
                                isLoading: true,    
                                isFormSubmit:true,
                                items:[],
                                loginInput: action.input
                                
                            };
                
                        case UPDATE_PATIENT_COMPLETED:
                              return {
                                ...state,
                                isLoading: false,
                                isFormSubmit:true,
                                status: action.status,
                                items: action.payload
                                };
                            
                        case UPDATE_PATIENT_FAILED:
                            return {
                                ...state,
                                isLoading: true,
                            }; 
                      
                            default:
                                return state;
                        }
                        
                    };

                    export const deletePatientData = (state = intialLoginData, action: any) => {
 
                        switch (action.type) {
                           
                            case DELETE_PATIENT_STARTED:
                               return {
                                    ...state,
                                    isLoading: true,    
                                    isFormSubmit:true,
                                    items:[],
                                    loginInput: action.input
                                    
                                };
                    
                            case DELETE_PATIENT_COMPLETED:
                                  return {
                                    ...state,
                                    isLoading: false,
                                    isFormSubmit:true,
                                    status: action.status,
                                    items: action.payload
                                    };
                                
                            case DELETE_PATIENT_FAILED:
                                return {
                                    ...state,
                                    isLoading: true,
                                }; 
                          
                                default:
                                    return state;
                            }
                            
                        };                    