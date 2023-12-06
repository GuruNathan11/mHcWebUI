import { all, takeLatest } from "redux-saga/effects";
import { SAVE_LOGIN_STARTED,CHECK_SECURITY_STARTED,SAVE_FORGOTPASSWORD_STARTED,VERIFY_LOGIN_STARTED,VERIFY_OTP_STARTED,
  SAVE_RESETPASSWORD_STARTED,SAVE_RESETSECRTKEY_STARTED, SAVE_RECREATEPASSWORD_STARTED } from "../actions/Login";
import { GETALL_ORGANIZATION_STARTED,UPDATE_ORGANIZATION_STARTED,CREATE_ORGANIZATION_STARTED,GETBYID_ORGANIZATION_STARTED } from "../actions/Organization";
import { saveLogin,loginSecurity,forgetPassword,verifyLogin,verifyOtp,saveResetPassword,resetSecretKey,reCreatePassword } from "./Login";
import { getAllOrganization, updateOrganization,createOrganization,getByIdOrganization} from "./Organization";
import {CREATE_PATIENT_STARTED,GETALL_PATIENT_STARTED,GETBYID_PATIENT_STARTED,GETBYINPUT_PATIENT_STARTED,DISCHARGEBYID_PATIENT_STARTED, UPDATE_PATIENT_STARTED,DELETE_PATIENT_STARTED} from "../actions/Patient";
import {createPatient,getAllPatient,getByIdPatient,getPatientByInput,dischargePatientById,updatePatient,deletePatient} from "./Patient";
import { GETALL_STAFF_STARTED,GETBYID_STAFF_STARTED,CREATE_STAFF_STARTED,INUPDATE_STAFF_STARTED ,OUTUPDATE_STAFF_STARTED,UPDATE_STAFF_STARTED,DELETE_STAFF_STARTED} from "../actions/Staff";
import {getAllStaff,getByIdStaff,createStaff,inUpdateStaff,outUpdateStaff,UpdateStaff,deleteStaff} from "./Staff";
import {UPDATE_PTVISIT_STARTED,CREATE_PTVISIT_STARTED,GETALL_PTVISIT_STARTED,GETBYID_PTVISIT_STARTED,GETBYPID_PTVISIT_STARTED,DELETE_PTVISIT_STARTED} from "../actions/PatientVisitAdminController";
import {updatePatientVisit,deletePatientVisitById,createPatientVisit,getAllPatientVisit,getPatientVisitById,getpatientvisitByPid} from "./PatientVisitAdminController";
import {UPDATE_LOCATION_Q15FORM_FAILED,UPDATE_ACTIVITY_Q15FORM_STARTED,UPDATE_Q15FORM_STARTED,CREATE_ACTIVITY_Q15FORM_STARTED,CREATE_LOCATION_Q15FORM_STARTED,CREATE_Q15FORM_STARTED,GET_Q15FORM_COMPLETED} from "../actions/Q15FormController";
import {updatelocationq15form,updateActivityq15form,updateq15form,createactivityq15form,createlocationq15form,createq15form,getq15form} from "./Q15FormController";
import {GET_PATIENTSTAFF_STARTED,CREATE_PATIENTSTAFF_STARTED,GETID_PATIENTSTAFF_STARTED} from "../actions/PatientStaffAssignController";
import {assignpatientstaff,getallpatientstaff,getIDpatientstaff} from "./PatientStaffAssignController";
import {CREATE_STAFFPATIENT_STARTED} from '../actions/PatientStaffAssignController';
import {assignstaffpatient} from './PatientStaffAssignController';
import {CREATE_Q15CONFIG_STARTED,GETID_Q15CONFIG_STARTED,GET_Q15CONFIG_COMPLETED,GETSLOT_Q15CONFIG_STARTED} from "../actions/Q15ConfigController";
import {createq15config,GETIDq15config,GETq15config,GETslotq15config} from "./Q15ConfigController";
import {createBedAssignment,getAllBedAssignment,getBedAssignmentByOrgId} from "./BedAssignment";
import {createDynamicBedAssign,getAllDynamicBedAssign,deleteDynamicBedAssign} from "./DynamicBedAssign"
import {GET_PATIENT_BED_ASSIGNMENT_STARTED,CREATE_PATIENT_BED_ASSIGNMENT_STARTED,DELETE_PATIENT_BED_ASSIGNMENT_STARTED} from "../actions/DynamicBedAssign";
import {CREATE_BED_ASSIGNMENT_STARTED,GETALL_BED_ASSIGNMENT_STARTED,GET_BYORGID_BED_ASSIGNMENT_STARTED} from "../actions/BedAssignment";
import {CREATE_PATIENT_ALLERGY_STARTED,GETALL_PATIENT_ALLERGY_STARTED,GETBYINPUT_PATIENT_ALLERGY_STARTED,UPDATE_PATIENT_ALLERGY_STARTED,DELETE_PATIENT_ALLERGY_STARTED,GET_PATIENTBYINPUTID_ALLERGY_STARTED} from "../actions/PatientAllergy";
import {createPatientAllergy,getAllPatientAllergy,getAllergyByPatientInput,updatePatientAllergy,deletePatientAllergy,getAllergyByPatientInputId} from "./PatientAllergy";
import {CREATE_PATIENT_PROBLEMS_STARTED,GETALL_PATIENT_PROBLEMS_STARTED,GETBYINPUT_PATIENT_PROBLEMS_STARTED,GET_PATIENTBYINPUTID_PROBLEMS_STARTED,UPDATE_PATIENT_PROBLEMS_STARTED,DELETE_PATIENT_PROBLEMS_STARTED} from "../actions/PatientProblem";
import {createPatientProblems,getAllPatientProblems,getProblemsByPatientInput,getProblemsByPatientInputId,updatePatientProblems,deletePatientProblems} from "./PatientProblem";
import {CREATE_PATIENT_VITALS_STARTED,GETALL_PATIENT_VITALS_STARTED,GETBYINPUT_PATIENT_VITALS_STARTED,UPDATE_PATIENT_VITALS_STARTED,DELETE_PATIENT_VITALS_STARTED,GET_PATIENTBYINPUTID_VITALS_STARTED} from "../actions/PatientVitals";
import {createPatientVitals,getAllPatientVitals,getVitalsByPatientInput,getVitalsByPatientInputId,updatePatientVitals,deletePatientVitals} from "./PatientVitals";
import {CREATE_PATIENT_IMMUNIZATION_STARTED,GETALL_PATIENT_IMMUNIZATION_STARTED,GETBYINPUT_PATIENT_IMMUNIZATION_STARTED,GET_PATIENTBYINPUTID_IMMUNIZATION_STARTED,UPDATE_PATIENT_IMMUNIZATION_STARTED,DELETE_PATIENT_IMMUNIZATION_STARTED} from "../actions/PatientImmunization";
import {createPatientImmunization,getAllPatientImmunization,getImmunizationByPatientInput,getImmunizationByPatientInputId,updatePatientImmunization,deletePatientImmunization} from "./PatientImmunization";
import {CREATE_PATIENT_LABORDER_STARTED,GETALL_PATIENT_LABORDER_STARTED,GETBYINPUT_PATIENT_LABORDER_STARTED,GET_PATIENTBYINPUTID_LABORDER_STARTED,UPDATE_PATIENT_LABORDER_STARTED,DELETE_PATIENT_LABORDER_STARTED} from "../actions/PatientLabOrder";
import {createPatientLabOrder,getAllPatientLabOrder,getLabOrderByPatientInput,getLabOrderByPatientInputId,updatePatientLabOrder,deletePatientLabOrder} from "./PatientLabOrder";
import {createFields,createForms,getAllFields,getAllForms,getByNameForms,updateFields,createFilledForm,getByPatientIdFilledForm,deleteFilledForm,deleteSelectedFields} from "./TreatmentPlan";
import {CREATE_FIELDS_STARTED,CREATE_FORMS_STARTED,GETALL_FORMS_STARTED,GETBYNAME_FORMS_STARTED,GET_FIELDS_STARTED,UPDATE_FIELDS_STARTED,CREATE_FIELD_FORM_STARTED, GET_FIELD_FORM_STARTED, DELETE_FIELDS_STARTED, DELETE_FIELD_FORM_STARTED} from "../actions/TreatmentPlan";
import {createOrderProcedureProblem,getAllOrderProcedureProblems,getOrderProcedureByControlInput,updateOrderProcedureProblems,deleteOrderProcedureProblems} from "./OrderProcedureControl";
import {CREATE_ORDERPROCEDURE_PROBLEMS_STARTED ,GETALL_ORDERPROCEDURE_PROBLEMS_STARTED,GETBYINPUT_ORDERPROCEDURE_PROBLEMS_STARTED,UPDATE_ORDERPROCEDURE_PROBLEMS_STARTED,DELETE_ORDERPROCEDURE_PROBLEMS_STARTED, } from "../actions/OrderProcedureControl";
import {CREATE_PATIENT_ADMIT_STARTED,CREATE_DISCHARGE_PATIENT_STARTED,CREATE_TRANSFER_PATIENT_STARTED,GET_DISCHARGE_PATIENT_STARTED,GET_TRANSFER_PATIENT_STARTED,GET_PATIENT_ADMIT_STARTED} from "../actions/PatientADT";
import {createPatientAdmit,createDischargePatient,createTransferPatient,getAdmitPatient,getTransferPatient,getDischargePatient} from './PatientADT';
import {createPatientImaging,getAllPatientImaging,getPatientImagingInput,updatePatientImaging,deletePatientImaging} from './PatientImagingOrder';
import {CREATE_PATIENT_IMAGING_STARTED,UPDATE_PATIENT_IMAGING_STARTED,DELETE_PATIENT_IMAGING_STARTED,GETALL_PATIENT_IMAGING_STARTED,GETBYINPUT_PATIENT_IMAGING_STARTED} from '../actions/PatientImagingOrder';
import {createPatientConsult,getAllPatientConsult,getPatientConsultInput,updatePatientConsult,deletePatientConsult} from './PatientConsultOrder';
import {CREATE_PATIENT_CONSULT_STARTED,GETBYINPUT_PATIENT_CONSULT_STARTED,UPDATE_PATIENT_CONSULT_STARTED,DELETE_PATIENT_CONSULT_STARTED,GETALL_PATIENT_CONSULT_STARTED} from '../actions/PatientConsultOrder';
import {CREATE_INDEX_FORM_STARTED, UPDATE_INDEX_FORM_STARTED, DELETE_INDEX_FORM_STARTED, GETALL_INDEX_FORM_STARTED, GET_BYID_INDEX_FORM_STARTED,CREATE_BYFORMID_INDEX_FORM_STARTED,CREATE_BYSUBID_FORM_STARTED,CREATE_BYCONTENTID_INDEX_FORM_STARTED} from '../actions/IndexFormController';
import {createIndexForm,updateIndexForm,deleteIndexForm,getAllIndexForm,getIndexFormById,createContentIndexFormId,createIndexByFormId,createSubIndexFormId} from './IndexFormController'

export default function* rootSaga() {
  yield all([
   
    takeLatest(GETALL_ORGANIZATION_STARTED, getAllOrganization),
    takeLatest(UPDATE_ORGANIZATION_STARTED, updateOrganization),
    takeLatest(CREATE_ORGANIZATION_STARTED, createOrganization),
    takeLatest(GETBYID_ORGANIZATION_STARTED, getByIdOrganization),
    takeLatest(SAVE_LOGIN_STARTED, saveLogin),
    takeLatest(VERIFY_LOGIN_STARTED, verifyLogin),   
    takeLatest(CHECK_SECURITY_STARTED, loginSecurity), 
    takeLatest(SAVE_FORGOTPASSWORD_STARTED, forgetPassword),
    takeLatest(VERIFY_OTP_STARTED, verifyOtp),
    takeLatest(SAVE_RESETPASSWORD_STARTED,saveResetPassword),
    takeLatest(SAVE_RESETSECRTKEY_STARTED, resetSecretKey),
    takeLatest(SAVE_RECREATEPASSWORD_STARTED, reCreatePassword),
    takeLatest(CREATE_PATIENT_STARTED, createPatient),
    takeLatest(GETALL_PATIENT_STARTED, getAllPatient),
    takeLatest(GETBYID_PATIENT_STARTED, getByIdPatient),
    takeLatest(GETBYINPUT_PATIENT_STARTED, getPatientByInput),
    takeLatest(DISCHARGEBYID_PATIENT_STARTED, dischargePatientById),
    takeLatest(UPDATE_PATIENT_STARTED, updatePatient),
	  takeLatest(GETALL_STAFF_STARTED, getAllStaff),
    takeLatest(GETBYID_STAFF_STARTED, getByIdStaff),
    takeLatest(CREATE_STAFF_STARTED, createStaff),
    takeLatest(INUPDATE_STAFF_STARTED, inUpdateStaff),
    takeLatest(OUTUPDATE_STAFF_STARTED, outUpdateStaff),
    takeLatest(UPDATE_STAFF_STARTED, UpdateStaff),
    takeLatest(DELETE_STAFF_STARTED, deleteStaff),
    takeLatest(UPDATE_PTVISIT_STARTED, updatePatientVisit),
    takeLatest(DELETE_PTVISIT_STARTED, deletePatientVisitById),
    takeLatest(CREATE_PTVISIT_STARTED, createPatientVisit),
    takeLatest(GETBYPID_PTVISIT_STARTED, getpatientvisitByPid),
    takeLatest(GETALL_PTVISIT_STARTED,getAllPatientVisit),
    takeLatest(GETBYID_PTVISIT_STARTED,getPatientVisitById),
    takeLatest(UPDATE_LOCATION_Q15FORM_FAILED,updatelocationq15form),
    takeLatest(UPDATE_ACTIVITY_Q15FORM_STARTED,updateActivityq15form),
    takeLatest(UPDATE_Q15FORM_STARTED,updateq15form),
    takeLatest(CREATE_ACTIVITY_Q15FORM_STARTED,createactivityq15form),
    takeLatest(CREATE_LOCATION_Q15FORM_STARTED,createlocationq15form),
    takeLatest(CREATE_Q15FORM_STARTED,createq15form),
    takeLatest(GET_Q15FORM_COMPLETED,getq15form),
    takeLatest(GET_PATIENTSTAFF_STARTED,getallpatientstaff),
    takeLatest(CREATE_PATIENTSTAFF_STARTED,assignpatientstaff),
    takeLatest(CREATE_STAFFPATIENT_STARTED, assignstaffpatient),
    takeLatest(GETID_PATIENTSTAFF_STARTED,getIDpatientstaff),
    takeLatest(CREATE_Q15CONFIG_STARTED,createq15config),
    takeLatest(GETID_Q15CONFIG_STARTED,GETIDq15config),
    takeLatest(GET_Q15CONFIG_COMPLETED,GETq15config),
    takeLatest(GETSLOT_Q15CONFIG_STARTED,GETslotq15config),
    takeLatest(DELETE_PATIENT_STARTED,deletePatient),
    takeLatest(CREATE_BED_ASSIGNMENT_STARTED,createBedAssignment),
    takeLatest(GETALL_BED_ASSIGNMENT_STARTED,getAllBedAssignment),
    takeLatest(GET_BYORGID_BED_ASSIGNMENT_STARTED,getBedAssignmentByOrgId),
    takeLatest(CREATE_PATIENT_BED_ASSIGNMENT_STARTED,createDynamicBedAssign),
    takeLatest(GET_PATIENT_BED_ASSIGNMENT_STARTED,getAllDynamicBedAssign),
    takeLatest(DELETE_PATIENT_BED_ASSIGNMENT_STARTED,deleteDynamicBedAssign),
    takeLatest(CREATE_PATIENT_ALLERGY_STARTED,createPatientAllergy),
    takeLatest(GETALL_PATIENT_ALLERGY_STARTED,getAllPatientAllergy),
    takeLatest(GETBYINPUT_PATIENT_ALLERGY_STARTED,getAllergyByPatientInput),
    takeLatest(GET_PATIENTBYINPUTID_ALLERGY_STARTED,getAllergyByPatientInputId),
    takeLatest(UPDATE_PATIENT_ALLERGY_STARTED,updatePatientAllergy),
    takeLatest(DELETE_PATIENT_ALLERGY_STARTED,deletePatientAllergy),
    takeLatest(CREATE_PATIENT_PROBLEMS_STARTED,createPatientProblems),
    takeLatest(GETALL_PATIENT_PROBLEMS_STARTED,getAllPatientProblems),
    takeLatest(GETBYINPUT_PATIENT_PROBLEMS_STARTED,getProblemsByPatientInput),
    takeLatest(GET_PATIENTBYINPUTID_PROBLEMS_STARTED,getProblemsByPatientInputId),
    takeLatest(UPDATE_PATIENT_PROBLEMS_STARTED,updatePatientProblems),
    takeLatest(DELETE_PATIENT_PROBLEMS_STARTED,deletePatientProblems),
    takeLatest(CREATE_PATIENT_VITALS_STARTED,createPatientVitals),
    takeLatest(GETALL_PATIENT_VITALS_STARTED,getAllPatientVitals),
    takeLatest(GETBYINPUT_PATIENT_VITALS_STARTED,getVitalsByPatientInput),
    takeLatest(GET_PATIENTBYINPUTID_VITALS_STARTED,getVitalsByPatientInputId),
    takeLatest(UPDATE_PATIENT_VITALS_STARTED,updatePatientVitals),
    takeLatest(DELETE_PATIENT_VITALS_STARTED,deletePatientVitals),
    takeLatest(CREATE_PATIENT_IMMUNIZATION_STARTED,createPatientImmunization),
    takeLatest(GETALL_PATIENT_IMMUNIZATION_STARTED,getAllPatientImmunization),
    takeLatest(GETBYINPUT_PATIENT_IMMUNIZATION_STARTED,getImmunizationByPatientInput),
    takeLatest(GET_PATIENTBYINPUTID_IMMUNIZATION_STARTED,getImmunizationByPatientInputId),
    takeLatest(UPDATE_PATIENT_IMMUNIZATION_STARTED,updatePatientImmunization),
    takeLatest(DELETE_PATIENT_IMMUNIZATION_STARTED,deletePatientImmunization),
    takeLatest(CREATE_PATIENT_LABORDER_STARTED,createPatientLabOrder),
    takeLatest(GETALL_PATIENT_LABORDER_STARTED,getAllPatientLabOrder),
    takeLatest(GETBYINPUT_PATIENT_LABORDER_STARTED,getLabOrderByPatientInput),
    takeLatest(GET_PATIENTBYINPUTID_LABORDER_STARTED,getLabOrderByPatientInputId),
    takeLatest(UPDATE_PATIENT_LABORDER_STARTED,updatePatientLabOrder),
    takeLatest(DELETE_PATIENT_LABORDER_STARTED,deletePatientLabOrder),
    takeLatest(CREATE_FIELDS_STARTED,createFields),
    takeLatest(CREATE_FORMS_STARTED,createForms),
    takeLatest(GETALL_FORMS_STARTED,getAllForms),
    takeLatest(GETBYNAME_FORMS_STARTED,getByNameForms),
    takeLatest(GET_FIELDS_STARTED,getAllFields),
    takeLatest(UPDATE_FIELDS_STARTED, updateFields),
    takeLatest(CREATE_FIELD_FORM_STARTED, createFilledForm),
    takeLatest(GET_FIELD_FORM_STARTED, getByPatientIdFilledForm),
    takeLatest(DELETE_FIELD_FORM_STARTED,deleteFilledForm),
    takeLatest(DELETE_FIELDS_STARTED,deleteSelectedFields),
    takeLatest(CREATE_ORDERPROCEDURE_PROBLEMS_STARTED,createOrderProcedureProblem),
    takeLatest(GETALL_ORDERPROCEDURE_PROBLEMS_STARTED,getAllOrderProcedureProblems),
    takeLatest(GETBYINPUT_ORDERPROCEDURE_PROBLEMS_STARTED,getOrderProcedureByControlInput),    
    takeLatest(UPDATE_ORDERPROCEDURE_PROBLEMS_STARTED,updateOrderProcedureProblems),
    takeLatest(DELETE_ORDERPROCEDURE_PROBLEMS_STARTED,deleteOrderProcedureProblems),
    takeLatest(CREATE_PATIENT_ADMIT_STARTED,createPatientAdmit),
    takeLatest(CREATE_DISCHARGE_PATIENT_STARTED,createDischargePatient),
    takeLatest(CREATE_TRANSFER_PATIENT_STARTED,createTransferPatient),
    takeLatest(GET_DISCHARGE_PATIENT_STARTED,getDischargePatient),
    takeLatest(GET_TRANSFER_PATIENT_STARTED,getTransferPatient),
    takeLatest(GET_PATIENT_ADMIT_STARTED,getAdmitPatient),
    takeLatest(CREATE_PATIENT_IMAGING_STARTED,createPatientImaging),
    takeLatest(GETALL_PATIENT_IMAGING_STARTED,getAllPatientImaging),
    takeLatest(GETBYINPUT_PATIENT_IMAGING_STARTED,getPatientImagingInput),
    takeLatest(UPDATE_PATIENT_IMAGING_STARTED,updatePatientImaging),
    takeLatest(DELETE_PATIENT_IMAGING_STARTED,deletePatientImaging),
    takeLatest(CREATE_PATIENT_CONSULT_STARTED,createPatientConsult),
    takeLatest(GETALL_PATIENT_CONSULT_STARTED,getAllPatientConsult),
    takeLatest(GETBYINPUT_PATIENT_CONSULT_STARTED,getPatientConsultInput),
    takeLatest(UPDATE_PATIENT_CONSULT_STARTED,updatePatientConsult),
    takeLatest(DELETE_PATIENT_CONSULT_STARTED,deletePatientConsult),
    takeLatest(CREATE_INDEX_FORM_STARTED, createIndexForm),
    takeLatest(UPDATE_INDEX_FORM_STARTED, updateIndexForm),
    takeLatest(DELETE_INDEX_FORM_STARTED, deleteIndexForm),
    takeLatest(GET_BYID_INDEX_FORM_STARTED, getIndexFormById),
    takeLatest(GETALL_INDEX_FORM_STARTED, getAllIndexForm),
    takeLatest(CREATE_BYCONTENTID_INDEX_FORM_STARTED, createContentIndexFormId),
    takeLatest(CREATE_BYFORMID_INDEX_FORM_STARTED, createIndexByFormId),
    takeLatest(CREATE_BYSUBID_FORM_STARTED, createSubIndexFormId)
  ]);
}
