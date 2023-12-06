export const  CREATE_PATIENT_LABORDER_STARTED = "CREATE_PATIENT_LABORDER_STARTED";
export const CREATE_PATIENT_LABORDER_COMPLETED = "CREATE_PATIENT_LABORDER_COMPLETED";
export const CREATE_PATIENT_LABORDER_FAILED = "CREATE_PATIENT_LABORDER_FAILED";

export const  GETALL_PATIENT_LABORDER_STARTED = "GETALL_PATIENT_LABORDER_STARTED";
export const GETALL_PATIENT_LABORDER_COMPLETED = "GETALL_PATIENT_LABORDER_COMPLETED";
export const GETALL_PATIENT_LABORDER_FAILED = "GETALL_PATIENT_LABORDER_FAILED";

export const  GETBYINPUT_PATIENT_LABORDER_STARTED = "GETBYINPUT_PATIENT_LABORDER_STARTED";
export const GETBYINPUT_PATIENT_LABORDER_COMPLETED = "GETBYINPUT_PATIENT_LABORDER_COMPLETED";
export const GETBYINPUT_PATIENT_LABORDER_FAILED = "GETBYINPUT_PATIENT_LABORDER_FAILED";

export const  GET_PATIENTBYINPUTID_LABORDER_STARTED = "GET_PATIENTBYINPUTID_LABORDER_STARTED";
export const GET_PATIENTBYINPUTID_LABORDER_COMPLETED = "GET_PATIENTBYINPUTID_LABORDER_COMPLETED";
export const GET_PATIENTBYINPUTID_LABORDER_FAILED = "GET_PATIENTBYINPUTID_LABORDER_FAILED";

export const  UPDATE_PATIENT_LABORDER_STARTED = "UPDATE_PATIENT_LABORDER_STARTED";
export const UPDATE_PATIENT_LABORDER_COMPLETED = "UPDATE_PATIENT_LABORDER_COMPLETED";
export const UPDATE_PATIENT_LABORDER_FAILED = "UPDATE_PATIENT_LABORDER_FAILED";

export const  DELETE_PATIENT_LABORDER_STARTED = "DELETE_PATIENT_LABORDER_STARTED";
export const DELETE_PATIENT_LABORDER_COMPLETED = "DELETE_PATIENT_LABORDER_COMPLETED";
export const DELETE_PATIENT_LABORDER_FAILED = "DELETE_PATIENT_LABORDER_FAILED";

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

  export const createPatientLabOrder = (loginInput: any) => { 
    
    return {
      type: CREATE_PATIENT_LABORDER_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const getAllPatientLabOrder = () => { 
    return {
      type: GETALL_PATIENT_LABORDER_STARTED,
      payload: "status"
    };
  }; 

  export const getLabOrderByPatientInput = (loginInput) => { 
    
    return {
      type: GETBYINPUT_PATIENT_LABORDER_STARTED,
      payload: "Value",
      input: loginInput,
    };
  };
 
  export const getLabOrderByPatientInputId = (loginInput) => {
 
    return {
        type: GET_PATIENTBYINPUTID_LABORDER_STARTED ,
        payload: 'Value' ,
        input:loginInput
    };
};

  export const updatePatientLabOrderById = (loginInput: any) => { 
    
    return {
      type: UPDATE_PATIENT_LABORDER_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const deletePatientLabOrderById = (loginInput: any) => { 
    
    return {
      type: DELETE_PATIENT_LABORDER_STARTED,
      payload: "status",
      input: loginInput
    };
  };