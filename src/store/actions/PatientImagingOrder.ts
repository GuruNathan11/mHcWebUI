export const  CREATE_PATIENT_IMAGING_STARTED = "CREATE_PATIENT_IMAGING_STARTED";
export const CREATE_PATIENT_IMAGING_COMPLETED = "CREATE_PATIENT_IMAGING_COMPLETED";
export const CREATE_PATIENT_IMAGING_FAILED = "CREATE_PATIENT_IMAGING_FAILED";

export const  GETALL_PATIENT_IMAGING_STARTED = "GETALL_PATIENT_IMAGING_STARTED";
export const GETALL_PATIENT_IMAGING_COMPLETED = "GETALL_PATIENT_IMAGING_COMPLETED";
export const GETALL_PATIENT_IMAGING_FAILED = "GETALL_PATIENT_IMAGING_FAILED";

export const  GETBYINPUT_PATIENT_IMAGING_STARTED = "GETBYINPUT_PATIENT_IMAGING_STARTED";
export const GETBYINPUT_PATIENT_IMAGING_COMPLETED = "GETBYINPUT_PATIENT_IMAGING_COMPLETED";
export const GETBYINPUT_PATIENT_IMAGING_FAILED = "GETBYINPUT_PATIENT_IMAGING_FAILED";

export const  UPDATE_PATIENT_IMAGING_STARTED = "UPDATE_PATIENT_IMAGING_STARTED";
export const UPDATE_PATIENT_IMAGING_COMPLETED = "UPDATE_PATIENT_IMAGING_COMPLETED";
export const UPDATE_PATIENT_IMAGING_FAILED = "UPDATE_PATIENT_IMAGING_FAILED";

export const  DELETE_PATIENT_IMAGING_STARTED = "DELETE_PATIENT_IMAGING_STARTED";
export const DELETE_PATIENT_IMAGING_COMPLETED = "DELETE_PATIENT_IMAGING_COMPLETED";
export const DELETE_PATIENT_IMAGING_FAILED = "DELETE_PATIENT_IMAGING_FAILED";

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

  export const createPatientImaging = (loginInput: any) => { 
    
    return {
      type: CREATE_PATIENT_IMAGING_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const getAllPatientImaging = () => { 
    return {
      type: GETALL_PATIENT_IMAGING_STARTED,
      payload: "status"
    };
  }; 

  export const getPatientImagingInput = (loginInput) => { 
    
    return {
      type: GETBYINPUT_PATIENT_IMAGING_STARTED,
      payload: "Value",
      input: loginInput,
    };
  };
 

  export const updatePatientImagingById = (loginInput: any) => { 
    
    return {
      type: UPDATE_PATIENT_IMAGING_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const deletePatientImagingById = (loginInput: any) => { 
    
    return {
      type: DELETE_PATIENT_IMAGING_STARTED,
      payload: "status",
      input: loginInput
    };
  };