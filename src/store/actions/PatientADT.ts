export const CREATE_PATIENT_ADMIT_STARTED = "CREATE_PATIENT_ADMIT_STARTED";
export const CREATE_PATIENT_ADMIT_COMPLETED = "CREATE_PATIENT_ADMIT_COMPLETED";
export const CREATE_PATIENT_ADMIT_FAILED = "CREATE_PATIENT_ADMIT_FAILED";

export const CREATE_TRANSFER_PATIENT_STARTED = "CREATE_TRANSFER_PATIENT_STARTED";
export const CREATE_TRANSFER_PATIENT_COMPLETED = "CREATE_TRANSFER_PATIENT_COMPLETED";
export const CREATE_TRANSFER_PATIENT_FAILED = "CREATE_TRANSFER_PATIENT_FAILED";

export const CREATE_DISCHARGE_PATIENT_STARTED = "CREATE_DISCHARGE_PATIENT_STARTED";
export const CREATE_DISCHARGE_PATIENT_COMPLETED = "CREATE_DISCHARGE_PATIENT_COMPLETED";
export const CREATE_DISCHARGE_PATIENT_FAILED = "CREATE_DISCHARGE_PATIENT_FAILED";

export const GET_PATIENT_ADMIT_STARTED = "GET_PATIENT_ADMIT_STARTED";
export const GET_PATIENT_ADMIT_COMPLETED = "GET_PATIENT_ADMIT_COMPLETED";
export const GET_PATIENT_ADMIT_FAILED = "GET_PATIENT_ADMIT_FAILED";

export const GET_TRANSFER_PATIENT_STARTED = "GET_TRANSFER_PATIENT_STARTED";
export const GET_TRANSFER_PATIENT_COMPLETED = "GET_TRANSFER_PATIENT_COMPLETED";
export const GET_TRANSFER_PATIENT_FAILED = "GET_TRANSFER_PATIENT_FAILED";

export const GET_DISCHARGE_PATIENT_STARTED = "GET_DISCHARGE_PATIENT_STARTED";
export const GET_DISCHARGE_PATIENT_COMPLETED = "GET_DISCHARGE_PATIENT_COMPLETED";
export const GET_DISCHARGE_PATIENT_FAILED = "GET_DISCHARGE_PATIENT_FAILED";

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

  export const createPatientAdmit = (loginInput: any) => { 
    
    return {
      type: CREATE_PATIENT_ADMIT_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const createTransferPatient = (loginInput: any) => { 
    return {
      type: CREATE_TRANSFER_PATIENT_STARTED,
      payload: "status",
      input: loginInput
    };
  }; 

  export const createDischargePatient = (loginInput: any) => { 
    
    return {
      type: CREATE_DISCHARGE_PATIENT_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const getPatientAdmit = () => { 
    
    return {
      type: GET_PATIENT_ADMIT_STARTED,
      payload: "status"
    };
  };
 
  export const getTransferPatient = () => {
 
    return {
        type: GET_TRANSFER_PATIENT_STARTED ,
        payload: 'status' 
    };
};

  export const getDischargePatient = () => { 
    
    return {
      type: GET_DISCHARGE_PATIENT_STARTED,
      payload: "status"
    };
  };