export const UPDATE_PTVISIT_STARTED = "UPDATE_PTVISIT_STARTED";
export const UPDATE_PTVISIT_COMPLETED = "UPDATE_PTVISIT_COMPLETED";
export const UPDATE_PTVISIT_FAILED = "UPDATE_PTVISIT_FAILED";

export const GETBYPID_PTVISIT_STARTED = "GETBYPID_PTVISIT_STARTED";
export const GETBYPID_PTVISIT_COMPLETED = "GETBYPID_PTVISIT_COMPLETED";
export const GETBYPID_PTVISIT_FAILED = "GETBYPID_PTVISIT_FAILED";

export const DELETE_PTVISIT_STARTED = "DELETE_PTVISIT_STARTED";
export const DELETE_PTVISIT_COMPLETED ="DELETE_PTVISIT_COMPLETED";
export const DELETE_PTVISIT_FAILED = "DELETE_PTVISIT_FAILED";

export const  CREATE_PTVISIT_STARTED = "CREATE_PTVISIT_STARTED";
export const CREATE_PTVISIT_COMPLETED = "CREATE_PTVISIT_COMPLETED";
export const CREATE_PTVISIT_FAILED = "CREATE_PTVISIT_FAILED";

export const  GETALL_PTVISIT_STARTED = "GETALL_PTVISIT_STARTED";
export const GETALL_PTVISIT_COMPLETED = "GETALL_PTVISIT_COMPLETED";
export const GETALL_PTVISIT_FAILED = "GETALL_PTVISIT_FAILED";

export const  GETBYID_PTVISIT_STARTED = "GETBYID_PTVISIT_STARTED";
export const GETBYID_PTVISIT_COMPLETED = "GETBYID_PTVISIT_COMPLETED";
export const GETBYID_PTVISIT_FAILED = "GETBYID_PTVISIT_FAILED";

export interface IPatient {
    status: {
      statusCode: number;
      statusDisplay: string;
      statusValue: boolean; 
    };
    items: Array<any>;
    loginInput: {
      userId: string;
      username:string,
      password: string;
      organization:string;
      jwtToken: string;
      secretKey: string,
      email:string,
      otp:string,
      confirmNewPass: string,
      newPassword:string,
      patientid:string,
      securityQuestion: string;
      answer: string;
      roleFkId: {
        roleId: number;
        roleName: string;
        description: string;
        status: number;
        createdAt: Date;
        createdBy: string;
        updatedAt: Date;
        updatedBy: string;
      };
      status: number;
      createdAt: Date;
      createdBy: string;
      updatedAt: Date;
      updatedBy: string;
    };
    loginID: number;
    isLoading: boolean;
    error: string;
  }


  export const UpdatePatientVisit = (loginInput: any) => { 
    
    return {
      type: UPDATE_PTVISIT_STARTED,
      payload: "status",
      input: loginInput
    };
  };
  export const getPatientVisitByPid = (loginInput: any) => { 
    
    return {
      type: GETBYPID_PTVISIT_STARTED,
      payload: "status",
      input: loginInput
    };
  };
  export const deletePatientVisitById = (loginInput: any) => { 
    
    return {
      type: DELETE_PTVISIT_STARTED,
      payload: "status",
      input: loginInput
    };
  };
  
  export const createPatientVisit = (loginInput: any) => {   
    return {
      type: CREATE_PTVISIT_STARTED,
      payload: "status",
      input: loginInput
    };
  };
  export const getallPatientVisit = () => { 
    
    return {
      type:GETALL_PTVISIT_STARTED ,
      payload: "status"
    };
  };
  export const getPatientVisitById = (loginInput: any) => { 
    
    return {
      type:GETBYID_PTVISIT_STARTED ,
      payload: "status",
      input: loginInput
    };
  };
  
  