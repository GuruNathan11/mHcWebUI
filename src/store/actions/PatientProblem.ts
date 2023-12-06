export const  CREATE_PATIENT_PROBLEMS_STARTED = "CREATE_PATIENT_PROBLEMS_STARTED";
export const CREATE_PATIENT_PROBLEMS_COMPLETED = "CREATE_PATIENT_PROBLEMS_COMPLETED";
export const CREATE_PATIENT_PROBLEMS_FAILED = "CREATE_PATIENT_PROBLEMS_FAILED";

export const  GETALL_PATIENT_PROBLEMS_STARTED = "GETALL_PATIENT_PROBLEMS_STARTED";
export const GETALL_PATIENT_PROBLEMS_COMPLETED = "GETALL_PATIENT_PROBLEMS_COMPLETED";
export const GETALL_PATIENT_PROBLEMS_FAILED = "GETALL_PATIENT_PROBLEMS_FAILED";

export const  GETBYINPUT_PATIENT_PROBLEMS_STARTED = "GETBYINPUT_PATIENT_PROBLEMS_STARTED";
export const GETBYINPUT_PATIENT_PROBLEMS_COMPLETED = "GETBYINPUT_PATIENT_PROBLEMS_COMPLETED";
export const GETBYINPUT_PATIENT_PROBLEMS_FAILED = "GETBYINPUT_PATIENT_PROBLEMS_FAILED";

export const  GET_PATIENTBYINPUTID_PROBLEMS_STARTED = "GET_PATIENTBYINPUTID_PROBLEMS_STARTED";
export const GET_PATIENTBYINPUTID_PROBLEMS_COMPLETED = "GET_PATIENTBYINPUTID_PROBLEMS_COMPLETED";
export const GET_PATIENTBYINPUTID_PROBLEMS_FAILED = "GET_PATIENTBYINPUTID_PROBLEMS_FAILED";

export const  UPDATE_PATIENT_PROBLEMS_STARTED = "UPDATE_PATIENT_PROBLEMS_STARTED";
export const UPDATE_PATIENT_PROBLEMS_COMPLETED = "UPDATE_PATIENT_PROBLEMS_COMPLETED";
export const UPDATE_PATIENT_PROBLEMS_FAILED = "UPDATE_PATIENT_PROBLEMS_FAILED";

export const  DELETE_PATIENT_PROBLEMS_STARTED = "DELETE_PATIENT_PROBLEMS_STARTED";
export const DELETE_PATIENT_PROBLEMS_COMPLETED = "DELETE_PATIENT_PROBLEMS_COMPLETED";
export const DELETE_PATIENT_PROBLEMS_FAILED = "DELETE_PATIENT_PROBLEMS_FAILED";

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

  export const createPatientProblems = (loginInput: any) => { 
    
    return {
      type: CREATE_PATIENT_PROBLEMS_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const getAllPatientProblems = () => { 
    return {
      type: GETALL_PATIENT_PROBLEMS_STARTED,
      payload: "status"
    };
  }; 

  export const getProblemsByPatientInput = (loginInput: any) => { 
    
    return {
      type: GETBYINPUT_PATIENT_PROBLEMS_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const getProblemsByPatientInputId = (loginInput,paramValue) => { 
    
    return {
      type: GET_PATIENTBYINPUTID_PROBLEMS_STARTED,
      payload: 'Value' ,
        input:loginInput, 
        inputParam:paramValue
    };
  };
 
  export const updatePatientProblemsById = (loginInput: any) => { 
    
    return {
      type: UPDATE_PATIENT_PROBLEMS_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const deletePatientProblemsById = (loginInput: any) => { 
    
    return {
      type: DELETE_PATIENT_PROBLEMS_STARTED,
      payload: "status",
      input: loginInput
    };
  };