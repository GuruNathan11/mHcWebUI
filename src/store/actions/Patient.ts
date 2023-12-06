export const  CREATE_PATIENT_STARTED = "CREATE_PATIENT_STARTED";
export const CREATE_PATIENT_COMPLETED = "CREATE_PATIENT_COMPLETED";
export const CREATE_PATIENT_FAILED = "CREATE_PATIENT_FAILED";

export const  GETALL_PATIENT_STARTED = "GETALL_PATIENT_STARTED";
export const GETALL_PATIENT_COMPLETED = "GETALL_PATIENT_COMPLETED";
export const GETALL_PATIENT_FAILED = "GETALL_PATIENT_FAILED";

export const  GETBYID_PATIENT_STARTED = "GETBYID_PATIENT_STARTED";
export const GETBYID_PATIENT_COMPLETED = "GETBYID_PATIENT_COMPLETED";
export const GETBYID_PATIENT_FAILED = "GETBYID_PATIENT_FAILED";

export const  GETBYINPUT_PATIENT_STARTED = "GETBYINPUT_PATIENT_STARTED";
export const GETBYINPUT_PATIENT_COMPLETED = "GETBYINPUT_PATIENT_COMPLETED";
export const GETBYINPUT_PATIENT_FAILED = "GETBYINPUT_PATIENT_FAILED";

export const  DISCHARGEBYID_PATIENT_STARTED = "DISCHARGEBYID_PATIENT_STARTED";
export const DISCHARGEBYID_PATIENT_COMPLETED = "DISCHARGEBYID_PATIENT_COMPLETED";
export const DISCHARGEBYID_PATIENT_FAILED = "DISCHARGEBYID_PATIENT_FAILED";

export const  UPDATE_PATIENT_STARTED = "UPDATE_PATIENT_STARTED";
export const UPDATE_PATIENT_COMPLETED = "UPDATE_PATIENT_COMPLETED";
export const UPDATE_PATIENT_FAILED = "UPDATE_PATIENT_FAILED";

export const  DELETE_PATIENT_STARTED = "DELETE_PATIENT_STARTED";
export const DELETE_PATIENT_COMPLETED = "DELETE_PATIENT_COMPLETED";
export const DELETE_PATIENT_FAILED = "DELETE_PATIENT_FAILED";

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

  export const createPatient = (loginInput: any) => { 
    
    return {
      type: CREATE_PATIENT_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const getAllPatient = () => { 
    return {
      type: GETALL_PATIENT_STARTED,
      payload: "status"
    };
  };

  export const getByIdPatient = (loginInput: any) => { 
    
    return {
      type: GETBYID_PATIENT_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const getPatientByInput = (loginInput: any) => { 
    
    return {
      type: GETBYINPUT_PATIENT_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const dischargePatientById = (loginInput: any) => { 
    
    return {
      type: DISCHARGEBYID_PATIENT_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const updatePatientById = (loginInput: any) => { 
    
    return {
      type: UPDATE_PATIENT_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const deletePatientById = (loginInput: any) => { 
    
    return {
      type: DELETE_PATIENT_STARTED,
      payload: "status",
      input: loginInput
    };
  };