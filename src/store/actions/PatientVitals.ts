export const  CREATE_PATIENT_VITALS_STARTED = "CREATE_PATIENT_VITALS_STARTED";
export const CREATE_PATIENT_VITALS_COMPLETED = "CREATE_PATIENT_VITALS_COMPLETED";
export const CREATE_PATIENT_VITALS_FAILED = "CREATE_PATIENT_VITALS_FAILED";

export const  GETALL_PATIENT_VITALS_STARTED = "GETALL_PATIENT_VITALS_STARTED";
export const GETALL_PATIENT_VITALS_COMPLETED = "GETALL_PATIENT_VITALS_COMPLETED";
export const GETALL_PATIENT_VITALS_FAILED = "GETALL_PATIENT_VITALS_FAILED";

export const  GETBYINPUT_PATIENT_VITALS_STARTED = "GETBYINPUT_PATIENT_VITALS_STARTED";
export const GETBYINPUT_PATIENT_VITALS_COMPLETED = "GETBYINPUT_PATIENT_VITALS_COMPLETED";
export const GETBYINPUT_PATIENT_VITALS_FAILED = "GETBYINPUT_PATIENT_VITALS_FAILED";

export const  GET_PATIENTBYINPUTID_VITALS_STARTED = "GET_PATIENTBYINPUTID_VITALS_STARTED";
export const GET_PATIENTBYINPUTID_VITALS_COMPLETED = "GET_PATIENTBYINPUTID_VITALS_COMPLETED";
export const GET_PATIENTBYINPUTID_VITALS_FAILED = "GET_PATIENTBYINPUTID_VITALS_FAILED";

export const  UPDATE_PATIENT_VITALS_STARTED = "UPDATE_PATIENT_VITALS_STARTED";
export const UPDATE_PATIENT_VITALS_COMPLETED = "UPDATE_PATIENT_VITALS_COMPLETED";
export const UPDATE_PATIENT_VITALS_FAILED = "UPDATE_PATIENT_VITALS_FAILED";

export const  DELETE_PATIENT_VITALS_STARTED = "DELETE_PATIENT_VITALS_STARTED";
export const DELETE_PATIENT_VITALS_COMPLETED = "DELETE_PATIENT_VITALS_COMPLETED";
export const DELETE_PATIENT_VITALS_FAILED = "DELETE_PATIENT_VITALS_FAILED";

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

  export const createPatientVitals = (loginInput: any) => { 
    
    return {
      type: CREATE_PATIENT_VITALS_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const getAllPatientVitals = () => { 
    return {
      type: GETALL_PATIENT_VITALS_STARTED,
      payload: "status"
    };
  }; 

  export const getVitalsByPatientInput = (loginInput: any) => { 
    
    return {
      type: GETBYINPUT_PATIENT_VITALS_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const getVitalsByPatientInputId = (loginInput,paramValue) => { 
    
    return {
      type: GET_PATIENTBYINPUTID_VITALS_STARTED,
      payload: 'Value' ,
        input:loginInput, 
        inputParam:paramValue
    };
  }
 
  export const updatePatientVitalsById = (loginInput: any) => { 
    
    return {
      type: UPDATE_PATIENT_VITALS_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const deletePatientVitalsById = (loginInput: any) => { 
    
    return {
      type: DELETE_PATIENT_VITALS_STARTED,
      payload: "status",
      input: loginInput
    };
  };