import {
    CREATE_Q15CONFIG_COMPLETED,CREATE_Q15CONFIG_FAILED,CREATE_Q15CONFIG_STARTED,GETID_Q15CONFIG_COMPLETED,GETID_Q15CONFIG_FAILED,GETID_Q15CONFIG_STARTED,GET_Q15CONFIG_COMPLETED,GET_Q15CONFIG_FAILED,GET_Q15CONFIG_STARTED,
  GETSLOT_Q15CONFIG_COMPLETED,GETSLOT_Q15CONFIG_FAILED,GETSLOT_Q15CONFIG_STARTED
       } from '../actions/Q15ConfigController';
       
       
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
       export const createq15configData = (state = intialLoginData, action: any) => {
        
           switch (action.type) {
              
               case CREATE_Q15CONFIG_STARTED:
                  return {
                       ...state,
                       isLoading: true,    
                       isFormSubmit:true,
                       items:[],
                       loginInput: action.input
                       
                   };
       
               case CREATE_Q15CONFIG_COMPLETED:
                     return {
                       ...state,
                       isLoading: false,
                       isFormSubmit:true,
                       status: action.status,
                       items: action.payload
                       };
                   
               case CREATE_Q15CONFIG_FAILED:
                   return {
                       ...state,
                       isLoading: true,
                   }; 
             
                   default:
                       return state;
               }
               
           };
           export const getallq15configData = (state = intialLoginData, action: any) => {
        
            switch (action.type) {
               
                case GET_Q15CONFIG_STARTED:
                   return {
                        ...state,
                        isLoading: true,    
                        isFormSubmit:true,
                        items:[],
                        loginInput: action.input
                        
                    };
        
                case GET_Q15CONFIG_COMPLETED:
                      return {
                        ...state,
                        isLoading: false,
                        isFormSubmit:true,
                        status: action.status,
                        items: action.payload
                        };
                    
                case GET_Q15CONFIG_FAILED:
                    return {
                        ...state,
                        isLoading: true,
                    }; 
              
                    default:
                        return state;
                }
                
            };
            export const getidq15configData = (state = intialLoginData, action: any) => {
        
                switch (action.type) {
                   
                    case GETID_Q15CONFIG_STARTED:
                       return {
                            ...state,
                            isLoading: true,    
                            isFormSubmit:true,
                            items:[],
                            loginInput: action.input
                            
                        };
            
                    case GETID_Q15CONFIG_COMPLETED:
                          return {
                            ...state,
                            isLoading: false,
                            isFormSubmit:true,
                            status: action.status,
                            items: action.payload
                            };
                        
                    case GETID_Q15CONFIG_FAILED:
                        return {
                            ...state,
                            isLoading: true,
                        }; 
                  
                        default:
                            return state;
                    }
                    
                };
                export const getSLOTq15configData = (state = intialLoginData, action: any) => {
        
                    switch (action.type) {
                       
                        case GETSLOT_Q15CONFIG_STARTED:
                           return {
                                ...state,
                                isLoading: true,    
                                isFormSubmit:true,
                                items:[],
                                loginInput: action.input
                                
                            };
                
                        case GETSLOT_Q15CONFIG_COMPLETED:
                              return {
                                ...state,
                                isLoading: false,
                                isFormSubmit:true,
                                status: action.status,
                                items: action.payload
                                };
                            
                        case GETSLOT_Q15CONFIG_FAILED:
                            return {
                                ...state,
                                isLoading: true,
                            }; 
                      
                            default:
                                return state;
                        }
                        
                    };