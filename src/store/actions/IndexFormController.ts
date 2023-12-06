export const CREATE_INDEX_FORM_STARTED ="CREATE_INDEX_FORM_STARTED";
export const CREATE_INDEX_FORM_COMPLETED ="CREATE_INDEX_FORM_COMPLETED";
export const CREATE_INDEX_FORM_FAILED ="CREATE_INDEX_FORM_FAILED";

export const CREATE_BYFORMID_INDEX_FORM_STARTED ="CREATE_BYFORMID_INDEX_FORM_STARTED";
export const CREATE_BYFORMID_INDEX_FORM_COMPLETED ="CREATE_BYFORMID_INDEX_FORM_COMPLETED";
export const CREATE_BYFORMID_INDEX_FORM_FAILED ="CREATE_BYFORMID_INDEX_FORM_FAILED";

export const CREATE_BYSUBID_FORM_STARTED ="CREATE_BYSUBID_FORM_STARTED";
export const CREATE_BYSUBID_FORM_COMPLETED ="CREATE_BYSUBID_INDEX_FORM_COMPLETED";
export const CREATE_BYSUBID_FORM_FAILED ="CREATE_BYSUBID_INDEX_FORM_FAILED";

export const CREATE_BYCONTENTID_INDEX_FORM_STARTED ="CREATE_BYCONTENTID_INDEX_FORM_STARTED";
export const CREATE_BYCONTENTID_INDEX_FORM_COMPLETED ="CREATE_BYCONTENTID_INDEX_FORM_COMPLETED";
export const CREATE_BYCONTENTID_INDEX_FORM_FAILED ="CREATE_BYCONTENTID_INDEX_FORM_FAILED";

export const GETALL_INDEX_FORM_STARTED ="GETALL_INDEX_FORM_STARTED";
export const GETALL_INDEX_FORM_COMPLETED ="GETALL_INDEX_FORM_COMPLETED";
export const GETALL_INDEX_FORM_FAILED ="GETALL_INDEX_FORM_FAILED";

export const GET_BYID_INDEX_FORM_STARTED ="GET_BYID_INDEX_FORM_STARTED";
export const GET_BYID_INDEX_FORM_COMPLETED ="GET_BYID_INDEX_FORM_COMPLETED";
export const GET_BYID_INDEX_FORM_FAILED ="GET_BYID_INDEX_FORM_FAILED";

export const UPDATE_INDEX_FORM_STARTED ="UPDATE_INDEX_FORM_STARTED";
export const UPDATE_INDEX_FORM_COMPLETED ="UPDATE_INDEX_FORM_COMPLETED";
export const UPDATE_INDEX_FORM_FAILED ="UPDATE_INDEX_FORM_FAILED";

export const DELETE_INDEX_FORM_STARTED ="DELETE_INDEX_FORM_STARTED";
export const DELETE_INDEX_FORM_COMPLETED ="DELETE_INDEX_FORM_COMPLETED";
export const DELETE_INDEX_FORM_FAILED ="DELETE_INDEX_FORM_FAILED";

export interface ILogin {
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
  
  
  export const createIndexForm = (loginInput: any) => {    
    return {
      type: CREATE_INDEX_FORM_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const createIndexByFormId = (loginInput: any, indexFormId:any) => {    
    return {
      type: CREATE_BYFORMID_INDEX_FORM_STARTED,
      payload: "status",
      input: loginInput,
      inputValue:indexFormId
    };
  };

  export const createSubIndexFormId = (loginInput: any, indexFormId:any, subHeadingId: any) => {    
    return {
      type: CREATE_BYSUBID_FORM_STARTED,
      payload: "status",
      input: loginInput,
      inputValue:indexFormId,
      inputParams: subHeadingId
    };
  };

  export const createContentIndexFormId = (loginInput: any, indexFormId:any, subHeadingId: any, contentId: any) => {    
    return {
      type: CREATE_BYCONTENTID_INDEX_FORM_STARTED,
      payload: "status",
      input: loginInput,
      inputValue:indexFormId,
      inputParams: subHeadingId,
      inputParams1: contentId
    };
  };

  export const getAllIndexForm = () => {    
    return {
      type: GETALL_INDEX_FORM_STARTED,
      payload: "status"
    };
  };

  export const getIndexFormById = (loginInput: any) => {    
    return {
      type: GET_BYID_INDEX_FORM_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const updateIndexForm = (loginInput: any) => {    
    return {
      type: UPDATE_INDEX_FORM_STARTED,
      payload: "status",
      input: loginInput
    };
  };

  export const deleteIndexForm = (loginInput: any) => {    
    return {
      type: DELETE_INDEX_FORM_STARTED,
      payload: "status",
      input: loginInput
    };
  };