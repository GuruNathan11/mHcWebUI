import {
 CREATE_PATIENTSTAFF_COMPLETED,CREATE_PATIENTSTAFF_FAILED,CREATE_PATIENTSTAFF_STARTED,GETID_PATIENTSTAFF_COMPLETED,GETID_PATIENTSTAFF_FAILED,GETID_PATIENTSTAFF_STARTED,GET_PATIENTSTAFF_COMPLETED,
 GET_PATIENTSTAFF_FAILED,GET_PATIENTSTAFF_STARTED} from '../actions/PatientStaffAssignController';
 import {CREATE_STAFFPATIENT_STARTED, CREATE_STAFFPATIENT_COMPLETED, CREATE_STAFFPATIENT_FAILED} from "./../actions/PatientStaffAssignController"    
    
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
    export const assignpatientstaffData = (state = intialLoginData, action: any) => {
     
        switch (action.type) {
           
            case CREATE_PATIENTSTAFF_STARTED:
               return {
                    ...state,
                    isLoading: true,    
                    isFormSubmit:false,
                    items:[],
                    loginInput: action.input
                    
                };
    
            case CREATE_PATIENTSTAFF_COMPLETED:
                  return {
                    ...state,
                    isLoading: false,
                    isFormSubmit:true,
                    status: action.status,
                    items: action.payload
                    };
                
            case CREATE_PATIENTSTAFF_FAILED:
                return {
                    ...state,
                    isLoading: true,
                }; 
          
                default:
                    return state;
            }
            
        };
        export const getIDpatientstaffData = (state = intialLoginData, action: any) => {
     
            switch (action.type) {
               
                case GETID_PATIENTSTAFF_STARTED:
                   return {
                        ...state,
                        isLoading: true,    
                        isFormSubmit:false,
                        items:[],
                        loginInput: action.input
                        
                    };
        
                case GETID_PATIENTSTAFF_COMPLETED
                :
                      return {
                        ...state,
                        isLoading: false,
                        isFormSubmit:true,
                        status: action.status,
                        items: action.payload
                        };
                    
                case GETID_PATIENTSTAFF_FAILED:
                    return {
                        ...state,
                        isLoading: true,
                    }; 
              
                    default:
                        return state;
                }
                
            };
            export const getallpatientstaffData = (state = intialLoginData, action: any) => {               
                switch (action.type) { 
                    case GET_PATIENTSTAFF_STARTED:  
                  return {
                    ...state,
                    isLoading: true,    
                    isFormSubmit:true,
                    items:[],
                    loginInput: action.input
                  };
                case GET_PATIENTSTAFF_COMPLETED:
                  return {
                    ...state,
                    isLoading: false,
                    isFormSubmit:true,
                    status: action.status,
                    items: action.payload
                  };
                case GET_PATIENTSTAFF_FAILED:
                  return {
                    ...state,
                    isLoading: true,                  
                  }; 
                  
                        default:
                            return state;
                    }
                    
                };
                export const assignstaffpatientData = (state = intialLoginData, action: any) => {
     
                    switch (action.type) {
                       
                        case CREATE_STAFFPATIENT_STARTED:
                           return {
                                ...state,
                                isLoading: true,    
                                isFormSubmit:false,
                                items:[],
                                loginInput: action.input
                                
                            };
                
                        case CREATE_STAFFPATIENT_COMPLETED:
                              return {
                                ...state,
                                isLoading: false,
                                isFormSubmit:true,
                                status: action.status,
                                items: action.payload
                                };
                            
                        case CREATE_STAFFPATIENT_FAILED:
                            return {
                                ...state,
                                isLoading: true,
                            }; 
                      
                            default:
                                return state;
                        }
                        
                    };