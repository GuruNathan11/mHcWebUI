import {
    CREATE_PATIENT_VITALS_STARTED,
    CREATE_PATIENT_VITALS_COMPLETED,
    CREATE_PATIENT_VITALS_FAILED,
    GETALL_PATIENT_VITALS_STARTED,
    GETALL_PATIENT_VITALS_COMPLETED,
    GETALL_PATIENT_VITALS_FAILED,
    GETBYINPUT_PATIENT_VITALS_STARTED,
    GETBYINPUT_PATIENT_VITALS_COMPLETED,
    GETBYINPUT_PATIENT_VITALS_FAILED,
    GET_PATIENTBYINPUTID_VITALS_STARTED,
    GET_PATIENTBYINPUTID_VITALS_COMPLETED,
    GET_PATIENTBYINPUTID_VITALS_FAILED,
    UPDATE_PATIENT_VITALS_STARTED,
    UPDATE_PATIENT_VITALS_COMPLETED,
    UPDATE_PATIENT_VITALS_FAILED,
    DELETE_PATIENT_VITALS_STARTED,
    DELETE_PATIENT_VITALS_COMPLETED,
    DELETE_PATIENT_VITALS_FAILED
} from '../actions/PatientVitals';

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

export const createPatientVitalsData = (state = intialLoginData, action: any) => {
 
    switch (action.type) {
       
        case CREATE_PATIENT_VITALS_STARTED:
           return {
                ...state,
                isLoading: true,    
                isFormSubmit:true,
                items:[],
                loginInput: action.input
                
            };

        case CREATE_PATIENT_VITALS_COMPLETED:
              return {
                ...state,
                isLoading: false,
                isFormSubmit:true,
                status: action.status,
                items: action.payload
                };
            
        case CREATE_PATIENT_VITALS_FAILED:
            return {
                ...state,
                isLoading: true,
            }; 
      
            default:
                return state;
        }
        
    };

    export const getAllPatientVitalsData = (state = intialLoginData, action: any) => {
 
        switch (action.type) {
           
            case GETALL_PATIENT_VITALS_STARTED:
               return {
                    ...state,
                    isLoading: true,    
                    isFormSubmit:true,
                    items:[],
                    loginInput: action.input
                    
                };
    
            case GETALL_PATIENT_VITALS_COMPLETED:
                  return {
                    ...state,
                    isLoading: false,
                    isFormSubmit:true,
                    status: action.status,
                    items: action.payload
                    };
                
            case GETALL_PATIENT_VITALS_FAILED:
                return {
                    ...state,
                    isLoading: true,
                }; 
          
                default:
                    return state;
            }
            
        };
     
            export const getVitalsByPatientInputData = (state = intialLoginData, action: any) => {
 
            switch (action.type) {
               
                case GETBYINPUT_PATIENT_VITALS_STARTED:
                   return {
                        ...state,
                        isLoading: true,    
                        isFormSubmit:true,
                        items:[],
                        loginInput: action.input
                        
                    };
        
                case GETBYINPUT_PATIENT_VITALS_COMPLETED:
                      return {
                        ...state,
                        isLoading: false,
                        isFormSubmit:true,
                        status: action.status,
                        items: action.payload
                        };
                    
                case GETBYINPUT_PATIENT_VITALS_FAILED:
                    return {
                        ...state,
                        isLoading: true,
                    }; 
              
                    default:
                        return state;
                }
                
            };

            export const getVitalsByPatientInputIdData = (state = intialLoginData, action: any) => {
                switch (action.type) {
                case GET_PATIENTBYINPUTID_VITALS_STARTED:  
                return {
                  ...state,
                  items:[],
                  isLoading: true,
                };
              case GET_PATIENTBYINPUTID_VITALS_COMPLETED:
                return {
                  ...state,
                  isLoading: false,
                  status: action.status,
                  items: action.payload
                };
              case GET_PATIENTBYINPUTID_VITALS_FAILED:
                return {
                  ...state,
                  isLoading: true,
                  status:"Fail"
                };
                default:
                  return state;
              }
              }     

                export const updatePatientVitalsData = (state = intialLoginData, action: any) => {
 
                    switch (action.type) {
                       
                        case UPDATE_PATIENT_VITALS_STARTED:
                           return {
                                ...state,
                                isLoading: true,    
                                isFormSubmit:true,
                                items:[],
                                loginInput: action.input
                                
                            };
                
                        case UPDATE_PATIENT_VITALS_COMPLETED:
                              return {
                                ...state,
                                isLoading: false,
                                isFormSubmit:true,
                                status: action.status,
                                items: action.payload
                                };
                            
                        case UPDATE_PATIENT_VITALS_FAILED:
                            return {
                                ...state,
                                isLoading: true,
                            }; 
                      
                            default:
                                return state;
                        }
                        
                    };

                    export const deletePatientVitalsData = (state = intialLoginData, action: any) => {
 
                        switch (action.type) {
                           
                            case DELETE_PATIENT_VITALS_STARTED:
                               return {
                                    ...state,
                                    isLoading: true,    
                                    isFormSubmit:true,
                                    items:[],
                                    loginInput: action.input
                                    
                                };
                    
                            case DELETE_PATIENT_VITALS_COMPLETED:
                                  return {
                                    ...state,
                                    isLoading: false,
                                    isFormSubmit:true,
                                    status: action.status,
                                    items: action.payload
                                    };
                                
                            case DELETE_PATIENT_VITALS_FAILED:
                                return {
                                    ...state,
                                    isLoading: true,
                                }; 
                          
                                default:
                                    return state;
                            }
                            
                        };                    