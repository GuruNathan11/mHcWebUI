import {
    CREATE_PATIENT_LABORDER_STARTED,
    CREATE_PATIENT_LABORDER_COMPLETED,
    CREATE_PATIENT_LABORDER_FAILED,
    GETALL_PATIENT_LABORDER_STARTED,
    GETALL_PATIENT_LABORDER_COMPLETED,
    GETALL_PATIENT_LABORDER_FAILED,
    GETBYINPUT_PATIENT_LABORDER_STARTED,
    GETBYINPUT_PATIENT_LABORDER_COMPLETED,
    GETBYINPUT_PATIENT_LABORDER_FAILED,
    GET_PATIENTBYINPUTID_LABORDER_STARTED,
    GET_PATIENTBYINPUTID_LABORDER_COMPLETED,
    GET_PATIENTBYINPUTID_LABORDER_FAILED,
    UPDATE_PATIENT_LABORDER_STARTED,
    UPDATE_PATIENT_LABORDER_COMPLETED,
    UPDATE_PATIENT_LABORDER_FAILED,
    DELETE_PATIENT_LABORDER_STARTED,
    DELETE_PATIENT_LABORDER_COMPLETED,
    DELETE_PATIENT_LABORDER_FAILED
} from '../actions/PatientLabOrder';

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

export const createPatientLabOrderData = (state = intialLoginData, action: any) => {
 
    switch (action.type) {
       
        case CREATE_PATIENT_LABORDER_STARTED:
           return {
                ...state,
                isLoading: true,    
                isFormSubmit:true,
                items:[],
                loginInput: action.input
                
            };

        case CREATE_PATIENT_LABORDER_COMPLETED:
              return {
                ...state,
                isLoading: false,
                isFormSubmit:true,
                status: action.status,
                items: action.payload
                };
            
        case CREATE_PATIENT_LABORDER_FAILED:
            return {
                ...state,
                isLoading: true,
            }; 
      
            default:
                return state;
        }
        
    };

    export const getAllPatientLabOrderData = (state = intialLoginData, action: any) => {
 
        switch (action.type) {
           
            case GETALL_PATIENT_LABORDER_STARTED:
               return {
                    ...state,
                    isLoading: true,    
                    isFormSubmit:true,
                    items:[],
                    loginInput: action.input
                    
                };
    
            case GETALL_PATIENT_LABORDER_COMPLETED:
                  return {
                    ...state,
                    isLoading: false,
                    isFormSubmit:true,
                    status: action.status,
                    items: action.payload
                    };
                
            case GETALL_PATIENT_LABORDER_FAILED:
                return {
                    ...state,
                    isLoading: true,
                }; 
          
                default:
                    return state;
            }
            
        };
     
            export const getLabOrderByPatientInputData = (state = intialLoginData, action: any) => {
 
            switch (action.type) {
               
                case GETBYINPUT_PATIENT_LABORDER_STARTED:
                   return {
                        ...state,
                        isLoading: true,    
                        isFormSubmit:true,
                        items:[],
                        loginInput: action.input
                        
                    };
        
                case GETBYINPUT_PATIENT_LABORDER_COMPLETED:
                      return {
                        ...state,
                        isLoading: false,
                        isFormSubmit:true,
                        status: action.status,
                        items: action.payload
                        };
                    
                case GETBYINPUT_PATIENT_LABORDER_FAILED:
                    return {
                        ...state,
                        isLoading: true,
                    }; 
              
                    default:
                        return state;
                }
                
            };

                export const updatePatientLabOrderData = (state = intialLoginData, action: any) => {
 
                    switch (action.type) {
                       
                        case UPDATE_PATIENT_LABORDER_STARTED:
                           return {
                                ...state,
                                isLoading: true,    
                                isFormSubmit:true,
                                items:[],
                                loginInput: action.input
                                
                            };
                
                        case UPDATE_PATIENT_LABORDER_COMPLETED:
                              return {
                                ...state,
                                isLoading: false,
                                isFormSubmit:true,
                                status: action.status,
                                items: action.payload
                                };
                            
                        case UPDATE_PATIENT_LABORDER_FAILED:
                            return {
                                ...state,
                                isLoading: true,
                            }; 
                      
                            default:
                                return state;
                        }
                        
                    };

                    export const deletePatientLabOrderData = (state = intialLoginData, action: any) => {
 
                        switch (action.type) {
                           
                            case DELETE_PATIENT_LABORDER_STARTED:
                               return {
                                    ...state,
                                    isLoading: true,    
                                    isFormSubmit:true,
                                    items:[],
                                    loginInput: action.input
                                    
                                };
                    
                            case DELETE_PATIENT_LABORDER_COMPLETED:
                                  return {
                                    ...state,
                                    isLoading: false,
                                    isFormSubmit:true,
                                    status: action.status,
                                    items: action.payload
                                    };
                                
                            case DELETE_PATIENT_LABORDER_FAILED:
                                return {
                                    ...state,
                                    isLoading: true,
                                }; 
                          
                                default:
                                    return state;
                            }
                            
                        };                    

                        export const getLabOrderByPatientInputIdData = (state = intialLoginData, action: any) => {
                            switch (action.type) {
                            case GET_PATIENTBYINPUTID_LABORDER_STARTED:  
                            return {
                                ...state,
                                    isLoading: true,    
                                    isFormSubmit:true,
                                    items:[],
                                    loginInput: action.input
                            };
                          case GET_PATIENTBYINPUTID_LABORDER_COMPLETED:
                            return {
                                ...state,
                                isLoading: false,
                                isFormSubmit:true,
                                status: action.status,
                                items: action.payload
                            };
                          case GET_PATIENTBYINPUTID_LABORDER_FAILED:
                            return {
                                ...state,
                                isLoading: true,
                            };
                            default:
                              return state;
                          }
                          }                        