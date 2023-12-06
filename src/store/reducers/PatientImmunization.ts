import {
    CREATE_PATIENT_IMMUNIZATION_STARTED,
    CREATE_PATIENT_IMMUNIZATION_COMPLETED,
    CREATE_PATIENT_IMMUNIZATION_FAILED,
    GETALL_PATIENT_IMMUNIZATION_STARTED,
    GETALL_PATIENT_IMMUNIZATION_COMPLETED,
    GETALL_PATIENT_IMMUNIZATION_FAILED,
    GETBYINPUT_PATIENT_IMMUNIZATION_STARTED,
    GETBYINPUT_PATIENT_IMMUNIZATION_COMPLETED,
    GETBYINPUT_PATIENT_IMMUNIZATION_FAILED,
    GET_PATIENTBYINPUTID_IMMUNIZATION_STARTED,
    GET_PATIENTBYINPUTID_IMMUNIZATION_COMPLETED,
    GET_PATIENTBYINPUTID_IMMUNIZATION_FAILED,
    UPDATE_PATIENT_IMMUNIZATION_STARTED,
    UPDATE_PATIENT_IMMUNIZATION_COMPLETED,
    UPDATE_PATIENT_IMMUNIZATION_FAILED,
    DELETE_PATIENT_IMMUNIZATION_STARTED,
    DELETE_PATIENT_IMMUNIZATION_COMPLETED,
    DELETE_PATIENT_IMMUNIZATION_FAILED
} from '../actions/PatientImmunization';

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

export const createPatientImmunizationData = (state = intialLoginData, action: any) => {
 
    switch (action.type) {
       
        case CREATE_PATIENT_IMMUNIZATION_STARTED:
           return {
                ...state,
                isLoading: true,    
                isFormSubmit:true,
                items:[],
                loginInput: action.input
                
            };

        case CREATE_PATIENT_IMMUNIZATION_COMPLETED:
              return {
                ...state,
                isLoading: false,
                isFormSubmit:true,
                status: action.status,
                items: action.payload
                };
            
        case CREATE_PATIENT_IMMUNIZATION_FAILED:
            return {
                ...state,
                isLoading: true,
            }; 
      
            default:
                return state;
        }
        
    };

    export const getAllPatientImmunizationData = (state = intialLoginData, action: any) => {
 
        switch (action.type) {
           
            case GETALL_PATIENT_IMMUNIZATION_STARTED:
               return {
                    ...state,
                    isLoading: true,    
                    isFormSubmit:true,
                    items:[],
                    loginInput: action.input
                    
                };
    
            case GETALL_PATIENT_IMMUNIZATION_COMPLETED:
                  return {
                    ...state,
                    isLoading: false,
                    isFormSubmit:true,
                    status: action.status,
                    items: action.payload
                    };
                
            case GETALL_PATIENT_IMMUNIZATION_FAILED:
                return {
                    ...state,
                    isLoading: true,
                }; 
          
                default:
                    return state;
            }
            
        };
     
            export const getImmunizationByPatientInputData = (state = intialLoginData, action: any) => {
 
            switch (action.type) {
               
                case GETBYINPUT_PATIENT_IMMUNIZATION_STARTED:
                   return {
                        ...state,
                        isLoading: true,    
                        isFormSubmit:true,
                        items:[],
                        loginInput: action.input
                        
                    };
        
                case GETBYINPUT_PATIENT_IMMUNIZATION_COMPLETED:
                      return {
                        ...state,
                        isLoading: false,
                        isFormSubmit:true,
                        status: action.status,
                        items: action.payload
                        };
                    
                case GETBYINPUT_PATIENT_IMMUNIZATION_FAILED:
                    return {
                        ...state,
                        isLoading: true,
                    }; 
              
                    default:
                        return state;
                }
                
            };

                export const updatePatientImmunizationData = (state = intialLoginData, action: any) => {
 
                    switch (action.type) {
                       
                        case UPDATE_PATIENT_IMMUNIZATION_STARTED:
                           return {
                                ...state,
                                isLoading: true,    
                                isFormSubmit:true,
                                items:[],
                                loginInput: action.input
                                
                            };
                
                        case UPDATE_PATIENT_IMMUNIZATION_COMPLETED:
                              return {
                                ...state,
                                isLoading: false,
                                isFormSubmit:true,
                                status: action.status,
                                items: action.payload
                                };
                            
                        case UPDATE_PATIENT_IMMUNIZATION_FAILED:
                            return {
                                ...state,
                                isLoading: true,
                            }; 
                      
                            default:
                                return state;
                        }
                        
                    };

                    export const deletePatientImmunizationData = (state = intialLoginData, action: any) => {
 
                        switch (action.type) {
                           
                            case DELETE_PATIENT_IMMUNIZATION_STARTED:
                               return {
                                    ...state,
                                    isLoading: true,    
                                    isFormSubmit:true,
                                    items:[],
                                    loginInput: action.input
                                    
                                };
                    
                            case DELETE_PATIENT_IMMUNIZATION_COMPLETED:
                                  return {
                                    ...state,
                                    isLoading: false,
                                    isFormSubmit:true,
                                    status: action.status,
                                    items: action.payload
                                    };
                                
                            case DELETE_PATIENT_IMMUNIZATION_FAILED:
                                return {
                                    ...state,
                                    isLoading: true,
                                }; 
                          
                                default:
                                    return state;
                            }
                            
                        };                    

                        export const getImmunizationByPatientInputIdData = (state = intialLoginData, action: any) => {
                            switch (action.type) {
                            case GET_PATIENTBYINPUTID_IMMUNIZATION_STARTED:  
                            return {
                              ...state,
                              items:[],
                              isLoading: true,
                            };
                          case GET_PATIENTBYINPUTID_IMMUNIZATION_COMPLETED:
                            return {
                              ...state,
                              isLoading: false,
                              status: action.status,
                              items: action.payload
                            };
                          case GET_PATIENTBYINPUTID_IMMUNIZATION_FAILED:
                            return {
                              ...state,
                              isLoading: true,
                              status:"Fail"
                            };
                            default:
                              return state;
                          }
                          }                        