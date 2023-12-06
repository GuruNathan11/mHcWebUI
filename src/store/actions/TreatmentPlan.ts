export const CREATE_FORMS_STARTED = "CREATE_FORMS_STARTED";
export const CREATE_FORMS_COMPLETED = "CREATE_FORMS_COMPLETED";
export const CREATE_FORMS_FAILED = "CREATE_FORMS_FAILED";

export const  GETALL_FORMS_STARTED = "GETALL_FORMS_STARTED";
export const GETALL_FORMS_COMPLETED = "GETALL_FORMS_COMPLETED";
export const GETALL_FORMS_FAILED = "GETALL_FORMS_FAILED";

export const  GETBYNAME_FORMS_STARTED = "GETBYNAME_FORMS_STARTED";
export const GETBYNAME_FORMS_COMPLETED = "GETBYNAME_FORMS_COMPLETED";
export const GETBYNAME_FORMS_FAILED = "GETBYNAME_FORMS_FAILED";

export const  GET_FIELDS_STARTED = "GET_FIELDS_STARTED";
export const GET_FIELDS_COMPLETED = "GET_FIELDS_COMPLETED";
export const GET_FIELDS_FAILED = "GET_FIELDS_FAILED";

export const CREATE_FIELDS_STARTED = "CREATE_FIELDS_STARTED";
export const CREATE_FIELDS_COMPLETED = "CREATE_FIELDS_COMPLETED";
export const CREATE_FIELDS_FAILED = "CREATE_FIELDS_FAILED";

export const UPDATE_FIELDS_STARTED = "UPDATE_FIELDS_STARTED";
export const UPDATE_FIELDS_COMPLETED = "UPDATE_FIELDS_COMPLETED";
export const UPDATE_FIELDS_FAILED = "UPDATE_FIELDS_FAILED";

export const  GET_FIELD_FORM_STARTED = "GET_FIELD_FORM_STARTED";
export const GET_FIELD_FORM_COMPLETED = "GET_FIELD_FORM_COMPLETED";
export const GET_FIELD_FORM_FAILED = "GET_FIELD_FORM_FAILED";

export const CREATE_FIELD_FORM_STARTED = "CREATE_FIELD_FORM_STARTED";
export const CREATE_FIELD_FORM_COMPLETED = "CREATE_FIELD_FORM_COMPLETED";
export const CREATE_FIELD_FORM_FAILED = "CREATE_FIELD_FORM_FAILED";

export const DELETE_FIELDS_STARTED = "DELETE_FIELDS_STARTED";
export const DELETE_FIELDS_COMPLETED = "DELETE_FIELDS_COMPLETED";
export const DELETE_FIELDS_FAILED = "DELETE_FIELDS_FAILED";

export const DELETE_FIELD_FORM_STARTED = "DELETE_FIELD_FORM_STARTED";
export const DELETE_FIELD_FORM_COMPLETED = "DELETE_FIELD_FORM_COMPLETED";
export const DELETE_FIELD_FORM_FAILED = "DELETE_FIELD_FORM_FAILED";


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

  export const createForms = (loginInput: any) => { 
    
    return {
      type: CREATE_FORMS_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const getAllForms = () => { 
    return {
      type: GETALL_FORMS_STARTED,
      payload: "status"
    };
  }; 

  export const getByNameForms = (loginInput: any) => { 
    
    return {
      type: GETBYNAME_FORMS_STARTED,
      payload: "status",
      input: loginInput
    };
  };
 
  export const getAllFields = () => {
 
    return {
        type: GET_FIELDS_STARTED ,
        payload: "status"
    };
};

  export const createFields = (loginInput: any) => { 
    
    return {
      type: CREATE_FIELDS_STARTED,
      payload: "status",
      input: loginInput
    };
  };


  export const updateFields = (loginInput: any) => { 
    
    return {
      type: UPDATE_FIELDS_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const getByPatientIdFilledForm = (loginInput: any) => { 
    
    return {
      type: GET_FIELD_FORM_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const createFilledForm = (loginInput: any) => { 
    
    return {
      type: CREATE_FIELD_FORM_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const deleteSelectedFields = (loginInput: any) => { 
    
    return {
      type: DELETE_FIELDS_STARTED,
      payload: "status",
      input: loginInput
    };
  };


  export const deleteFilledForm = (loginInput,patientId) => { 
    
    return {
      type: DELETE_FIELD_FORM_STARTED,
      payload: "status",
      input: loginInput,
      inputParam: patientId
    };
  };