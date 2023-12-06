import {
    CREATE_FORMS_STARTED,
    CREATE_FORMS_COMPLETED,
    CREATE_FORMS_FAILED,
    GETALL_FORMS_STARTED,
    GETALL_FORMS_COMPLETED,
    GETALL_FORMS_FAILED,
    GETBYNAME_FORMS_STARTED,
    GETBYNAME_FORMS_COMPLETED,
    GETBYNAME_FORMS_FAILED,
    GET_FIELDS_STARTED,
    GET_FIELDS_COMPLETED,
    GET_FIELDS_FAILED,
    CREATE_FIELDS_STARTED,
    CREATE_FIELDS_COMPLETED,
    CREATE_FIELDS_FAILED,
    UPDATE_FIELDS_STARTED,
    UPDATE_FIELDS_COMPLETED,
    UPDATE_FIELDS_FAILED,
    GET_FIELD_FORM_STARTED,
    GET_FIELD_FORM_COMPLETED,
    GET_FIELD_FORM_FAILED,
    CREATE_FIELD_FORM_STARTED,
    CREATE_FIELD_FORM_COMPLETED,
    CREATE_FIELD_FORM_FAILED,
    DELETE_FIELDS_STARTED,
    DELETE_FIELDS_COMPLETED,
    DELETE_FIELDS_FAILED,
    DELETE_FIELD_FORM_STARTED,
    DELETE_FIELD_FORM_COMPLETED,
    DELETE_FIELD_FORM_FAILED
} from '../actions/TreatmentPlan';

const intialLoginData = {
    status: {
        statusCode: 300,
        statusDisplay: "",
        statusValue: true
    },
    items: [],
    loginInput: {
        userId: "",
        password: "",
        username: "",
        jwtToken: "",
        secretKey: "",
        securityQuestion: "",
        email: "",
        otp: "",
        newPassword: "",
        confirmNewPass: "",
        answer: "",
        roleFkId: { roleId: 0, roleName: "", description: "", status: 0, createdAt: "", createdBy: "", updatedAt: "", updatedBy: "" },
        status: 0,
        createdAt: "",
        createdBy: "",
        updatedAt: "",
        updatedBy: ""

    },
    isLoading: true,
    isFormSubmit: false,
    isLoggedIn: false,
    error: ''
}

export const createFormsData = (state = intialLoginData, action: any) => {

    switch (action.type) {

        case CREATE_FORMS_STARTED:
            return {
                ...state,
                isLoading: true,
                isFormSubmit: true,
                items: [],
                loginInput: action.input

            };

        case CREATE_FORMS_COMPLETED:
            return {
                ...state,
                isLoading: false,
                isFormSubmit: true,
                status: action.status,
                items: action.payload
            };

        case CREATE_FORMS_FAILED:
            return {
                ...state,
                isLoading: true,
            };

        default:
            return state;
    }

};

export const getAllFormsData = (state = intialLoginData, action: any) => {

    switch (action.type) {

        case GETALL_FORMS_STARTED:
            return {
                ...state,
                isLoading: true,
                isFormSubmit: true,
                items: [],
                loginInput: action.input

            };

        case GETALL_FORMS_COMPLETED:
            return {
                ...state,
                isLoading: false,
                isFormSubmit: true,
                status: action.status,
                items: action.payload
            };

        case GETALL_FORMS_FAILED:
            return {
                ...state,
                isLoading: true,
            };

        default:
            return state;
    }

};

export const getByNameFormsData = (state = intialLoginData, action: any) => {

    switch (action.type) {

        case GETBYNAME_FORMS_STARTED:
            return {
                ...state,
                isLoading: true,
                isFormSubmit: true,
                items: [],
                loginInput: action.input

            };

        case GETBYNAME_FORMS_COMPLETED:
            return {
                ...state,
                isLoading: false,
                isFormSubmit: true,
                status: action.status,
                items: action.payload
            };

        case GETBYNAME_FORMS_FAILED:
            return {
                ...state,
                isLoading: true,
            };

        default:
            return state;
    }

};

export const getAllFieldsData = (state = intialLoginData, action: any) => {

    switch (action.type) {

        case GET_FIELDS_STARTED:
            return {
                ...state,
                isLoading: true,
                isFormSubmit: true,
                items: [],
                loginInput: action.input

            };

        case GET_FIELDS_COMPLETED:
            return {
                ...state,
                isLoading: false,
                isFormSubmit: true,
                status: action.status,
                items: action.payload
            };

        case GET_FIELDS_FAILED:
            return {
                ...state,
                isLoading: true,
            };

        default:
            return state;
    }

};

export const createFieldsData = (state = intialLoginData, action: any) => {

    switch (action.type) {

        case CREATE_FIELDS_STARTED:
            return {
                ...state,
                isLoading: true,
                isFormSubmit: true,
                items: [],
                loginInput: action.input

            };

        case CREATE_FIELDS_COMPLETED:
            return {
                ...state,
                isLoading: false,
                isFormSubmit: true,
                status: action.status,
                items: action.payload
            };

        case CREATE_FIELDS_FAILED:
            return {
                ...state,
                isLoading: true,
            };

        default:
            return state;
    }

};

export const updateFieldsData = (state = intialLoginData, action: any) => {

    switch (action.type) {

        case UPDATE_FIELDS_STARTED:
            return {
                ...state,
                isLoading: true,
                isFormSubmit: true,
                items: [],
                loginInput: action.input

            };

        case UPDATE_FIELDS_COMPLETED:
            return {
                ...state,
                isLoading: false,
                isFormSubmit: true,
                status: action.status,
                items: action.payload
            };

        case UPDATE_FIELDS_FAILED:
            return {
                ...state,
                isLoading: true,
            };

        default:
            return state;
    }

};

export const getByPatientIdFilledFormData = (state = intialLoginData, action: any) => {

    switch (action.type) {

        case GET_FIELD_FORM_STARTED:
            return {
                ...state,
                isLoading: true,
                isFormSubmit: true,
                items: [],
                loginInput: action.input

            };

        case GET_FIELD_FORM_COMPLETED:
            return {
                ...state,
                isLoading: false,
                isFormSubmit: true,
                status: action.status,
                items: action.payload
            };

        case GET_FIELD_FORM_FAILED:
            return {
                ...state,
                isLoading: true,
            };

        default:
            return state;
    }

};

export const createFilledFormData = (state = intialLoginData, action: any) => {

    switch (action.type) {

        case CREATE_FIELD_FORM_STARTED:
            return {
                ...state,
                isLoading: true,
                isFormSubmit: true,
                items: [],
                loginInput: action.input

            };

        case CREATE_FIELD_FORM_COMPLETED:
            return {
                ...state,
                isLoading: false,
                isFormSubmit: true,
                status: action.status,
                items: action.payload
            };

        case CREATE_FIELD_FORM_FAILED:
            return {
                ...state,
                isLoading: true,
            };

        default:
            return state;
    }

};                                                                                                              

export const deleteSelectedFieldsData = (state = intialLoginData, action: any) => {

    switch (action.type) {

        case DELETE_FIELDS_STARTED:
            return {
                ...state,
                isLoading: true,
                isFormSubmit: true,
                items: [],
                loginInput: action.input

            };

        case DELETE_FIELDS_COMPLETED:
            return {
                ...state,
                isLoading: false,
                isFormSubmit: true,
                status: action.status,
                items: action.payload
            };

        case DELETE_FIELDS_FAILED:
            return {
                ...state,
                isLoading: true,
            };

        default:
            return state;
    }

};
export const deleteFilledFormData = (state = intialLoginData, action: any) => {

    switch (action.type) {

        case DELETE_FIELD_FORM_STARTED:
            return {
                ...state,
                isLoading: true,
                isFormSubmit: true,
                items: [],
                loginInput: action.input

            };

        case DELETE_FIELD_FORM_COMPLETED:
            return {
                ...state,
                isLoading: false,
                isFormSubmit: true,
                status: action.status,
                items: action.payload
            };

        case DELETE_FIELD_FORM_FAILED:
            return {
                ...state,
                isLoading: true,
            };

        default:
            return state;
    }

};
