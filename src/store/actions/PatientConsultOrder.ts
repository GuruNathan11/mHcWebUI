export const  CREATE_PATIENT_CONSULT_STARTED = "CREATE_PATIENT_CONSULT_STARTED";
export const CREATE_PATIENT_CONSULT_COMPLETED = "CREATE_PATIENT_CONSULT_COMPLETED";
export const CREATE_PATIENT_CONSULT_FAILED = "CREATE_PATIENT_CONSULT_FAILED";

export const  GETALL_PATIENT_CONSULT_STARTED = "GETALL_PATIENT_CONSULT_STARTED";
export const GETALL_PATIENT_CONSULT_COMPLETED = "GETALL_PATIENT_CONSULT_COMPLETED";
export const GETALL_PATIENT_CONSULT_FAILED = "GETALL_PATIENT_CONSULT_FAILED";

export const  GETBYINPUT_PATIENT_CONSULT_STARTED = "GETBYINPUT_PATIENT_CONSULT_STARTED";
export const GETBYINPUT_PATIENT_CONSULT_COMPLETED = "GETBYINPUT_PATIENT_CONSULT_COMPLETED";
export const GETBYINPUT_PATIENT_CONSULT_FAILED = "GETBYINPUT_PATIENT_CONSULT_FAILED";

export const  UPDATE_PATIENT_CONSULT_STARTED = "UPDATE_PATIENT_CONSULT_STARTED";
export const UPDATE_PATIENT_CONSULT_COMPLETED = "UPDATE_PATIENT_CONSULT_COMPLETED";
export const UPDATE_PATIENT_CONSULT_FAILED = "UPDATE_PATIENT_CONSULT_FAILED";

export const  DELETE_PATIENT_CONSULT_STARTED = "DELETE_PATIENT_CONSULT_STARTED";
export const DELETE_PATIENT_CONSULT_COMPLETED = "DELETE_PATIENT_CONSULT_COMPLETED";
export const DELETE_PATIENT_CONSULT_FAILED = "DELETE_PATIENT_CONSULT_FAILED";

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

  export const createPatientConsult = (loginInput: any) => { 
    
    return {
      type: CREATE_PATIENT_CONSULT_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const getAllPatientConsult = () => { 
    return {
      type: GETALL_PATIENT_CONSULT_STARTED,
      payload: "status"
    };
  }; 

  export const getPatientConsultInput = (loginInput) => { 
    
    return {
      type: GETBYINPUT_PATIENT_CONSULT_STARTED,
      payload: "Value",
      input: loginInput,
    };
  };
 

  export const updatePatientConsultById = (loginInput: any) => { 
    
    return {
      type: UPDATE_PATIENT_CONSULT_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const deletePatientConsultById = (loginInput: any) => { 
    
    return {
      type: DELETE_PATIENT_CONSULT_STARTED,
      payload: "status",
      input: loginInput
    };
  };