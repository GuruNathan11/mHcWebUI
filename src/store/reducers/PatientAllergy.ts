import {
    CREATE_PATIENT_ALLERGY_STARTED,
    CREATE_PATIENT_ALLERGY_COMPLETED,
    CREATE_PATIENT_ALLERGY_FAILED,
    GETALL_PATIENT_ALLERGY_STARTED,
    GETALL_PATIENT_ALLERGY_COMPLETED,
    GETALL_PATIENT_ALLERGY_FAILED,
    GETBYINPUT_PATIENT_ALLERGY_STARTED,
    GETBYINPUT_PATIENT_ALLERGY_COMPLETED,
    GETBYINPUT_PATIENT_ALLERGY_FAILED,
    GET_PATIENTBYINPUTID_ALLERGY_STARTED,
    GET_PATIENTBYINPUTID_ALLERGY_COMPLETED,
    GET_PATIENTBYINPUTID_ALLERGY_FAILED,
    UPDATE_PATIENT_ALLERGY_STARTED,
    UPDATE_PATIENT_ALLERGY_COMPLETED,
    UPDATE_PATIENT_ALLERGY_FAILED,
    DELETE_PATIENT_ALLERGY_STARTED,
    DELETE_PATIENT_ALLERGY_COMPLETED,
    DELETE_PATIENT_ALLERGY_FAILED
} from '../actions/PatientAllergy';

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

export const createPatientAllergyData = (state = intialLoginData, action: any) => {
 
    switch (action.type) {
       
        case CREATE_PATIENT_ALLERGY_STARTED:
           return {
                ...state,
                isLoading: true,    
                isFormSubmit:true,
                items:[],
                loginInput: action.input
                
            };

        case CREATE_PATIENT_ALLERGY_COMPLETED:
              return {
                ...state,
                isLoading: false,
                isFormSubmit:true,
                status: action.status,
                items: action.payload
                };
            
        case CREATE_PATIENT_ALLERGY_FAILED:
            return {
                ...state,
                isLoading: true,
            }; 
      
            default:
                return state;
        }
        
    };

    export const getAllPatientAllergyData = (state = intialLoginData, action: any) => {
 
        switch (action.type) {
           
            case GETALL_PATIENT_ALLERGY_STARTED:
               return {
                    ...state,
                    isLoading: true,    
                    isFormSubmit:true,
                    items:[],
                    loginInput: action.input
                    
                };
    
            case GETALL_PATIENT_ALLERGY_COMPLETED:
                  return {
                    ...state,
                    isLoading: false,
                    isFormSubmit:true,
                    status: action.status,
                    items: action.payload
                    };
                
            case GETALL_PATIENT_ALLERGY_FAILED:
                return {
                    ...state,
                    isLoading: true,
                }; 
          
                default:
                    return state;
            }
            
        };
     
            export const getAllergyByPatientInputData = (state = intialLoginData, action: any) => {
 
            switch (action.type) {
               
                case GETBYINPUT_PATIENT_ALLERGY_STARTED:
                   return {
                        ...state,
                        isLoading: true,    
                        isFormSubmit:true,
                        items:[],
                        loginInput: action.input
                        
                    };
        
                case GETBYINPUT_PATIENT_ALLERGY_COMPLETED:
                      return {
                        ...state,
                        isLoading: false,
                        isFormSubmit:true,
                        status: action.status,
                        items: action.payload
                        };
                    
                case GETBYINPUT_PATIENT_ALLERGY_FAILED:
                    return {
                        ...state,
                        isLoading: true,
                    }; 
              
                    default:
                        return state;
                }
                
            };

                export const updatePatientAllergyData = (state = intialLoginData, action: any) => {
 
                    switch (action.type) {
                       
                        case UPDATE_PATIENT_ALLERGY_STARTED:
                           return {
                                ...state,
                                isLoading: true,    
                                isFormSubmit:true,
                                items:[],
                                loginInput: action.input
                                
                            };
                
                        case UPDATE_PATIENT_ALLERGY_COMPLETED:
                              return {
                                ...state,
                                isLoading: false,
                                isFormSubmit:true,
                                status: action.status,
                                items: action.payload
                                };
                            
                        case UPDATE_PATIENT_ALLERGY_FAILED:
                            return {
                                ...state,
                                isLoading: true,
                            }; 
                      
                            default:
                                return state;
                        }
                        
                    };

                    export const deletePatientAllergyData = (state = intialLoginData, action: any) => {
 
                        switch (action.type) {
                           
                            case DELETE_PATIENT_ALLERGY_STARTED:
                               return {
                                    ...state,
                                    isLoading: true,    
                                    isFormSubmit:true,
                                    items:[],
                                    loginInput: action.input
                                    
                                };
                    
                            case DELETE_PATIENT_ALLERGY_COMPLETED:
                                  return {
                                    ...state,
                                    isLoading: false,
                                    isFormSubmit:true,
                                    status: action.status,
                                    items: action.payload
                                    };
                                
                            case DELETE_PATIENT_ALLERGY_FAILED:
                                return {
                                    ...state,
                                    isLoading: true,
                                }; 
                          
                                default:
                                    return state;
                            }
                            
                        };                    

                        export const getAllergyByPatientInputIdData = (state = intialLoginData, action: any) => {
                            switch (action.type) {
                            case GET_PATIENTBYINPUTID_ALLERGY_STARTED:  
                            return {
                              ...state,
                              items:[],
                              isLoading: true,
                            };
                          case GET_PATIENTBYINPUTID_ALLERGY_COMPLETED:
                            return {
                              ...state,
                              isLoading: false,
                              status: action.status,
                              items: action.payload
                            };
                          case GET_PATIENTBYINPUTID_ALLERGY_FAILED:
                            return {
                              ...state,
                              isLoading: true,
                              status:"Fail"
                            };
                            default:
                              return state;
                          }
                          }                        