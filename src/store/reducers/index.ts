﻿
import { combineReducers } from "redux";
import { loginData,loginSecurityData,forgotpasswordData,resetPasswordData,verifyLoginData,verifyOTPData,resetSecretkeyData,reCreatePasswordData } from "./Login";
import { allOrganizationData,updateOrganizationData,createOrganizationData,getByIdOrganizationData } from "./Organization";
import {createPatientData,getAllPatientData,getByIdPatientData,getPatientByInputData,dischargePatientById,updatePatientData,deletePatientData} from "./Patient";
import { getAllStaffData,getByIdStaffData,createStaffData,inUpdateStaffData,outUpdateStaffData,UpdateStaffData,deleteStaffData} from "./Staff";
import {updatePatientVisitData, CreatePatientVisitData,getallPatientVisitData, getbyPidPatientVisitData, getbyidPatientVisitData,deletePatientVisitData} from "./PatientVisitAdminController";
import {updatelocationData,updateactivityData,updateQ15Data,createQ15Data,createactivityQ15Data,CreatelocationQ15Data,getQ15Data} from "./Q15FormController";
import {assignpatientstaffData,getallpatientstaffData,getIDpatientstaffData} from "./PatientStaffAssignController";
import {createq15configData,getallq15configData,getidq15configData,getSLOTq15configData} from "./Q15ConfigController";
import {getallBedAssignmentData,createBedAssignmentData,getBedAssignmentByOrgIdData} from "./BedAssignment";
import {assignstaffpatientData} from './PatientStaffAssignController';
import {createDynamicBedAssignData,getAllDynamicBedAssignData, deleteDynamicBedAssignData} from "./DynamicBedAssign";
import {createPatientAllergyData,getAllPatientAllergyData,getAllergyByPatientInputData,updatePatientAllergyData,deletePatientAllergyData,getAllergyByPatientInputIdData} from "./PatientAllergy";
import {createPatientProblemsData,getAllPatientProblemsData,getProblemsByPatientInputData,updatePatientProblemsData,deletePatientProblemsData,getProblemsByPatientInputIdData} from "./PatientProblem";
import {createPatientVitalsData,getAllPatientVitalsData,getVitalsByPatientInputData,getVitalsByPatientInputIdData,updatePatientVitalsData,deletePatientVitalsData} from "./PatientVitals";
import {createPatientImmunizationData,getAllPatientImmunizationData,getImmunizationByPatientInputData,updatePatientImmunizationData,deletePatientImmunizationData,getImmunizationByPatientInputIdData} from "./PatientImmunization";
import {createPatientLabOrderData,getAllPatientLabOrderData,getLabOrderByPatientInputData,updatePatientLabOrderData,deletePatientLabOrderData,getLabOrderByPatientInputIdData} from "./PatientLabOrder";
import {createFieldsData,createFormsData,getAllFieldsData,getAllFormsData,getByNameFormsData,updateFieldsData,createFilledFormData,getByPatientIdFilledFormData,deleteFilledFormData,deleteSelectedFieldsData} from "./TreatmentPlan";
import {createOrderProcedureProblemsData,getAllOrderProcedureProblemsData,getOrderProcedureByProblemsInputData,updateOrderProcedureControlData,deleteOrderProcedureControlData} from "./OrderProcedureControl";
import {createPatientAdmitData,createTransferPatientData,createDischargePatientData,getPatientAdmitData,getTransferPatientData,getDischargePatientData} from './PatientADT';
import {createPatientImagingData,updatePatientImagingData,deletePatientImagingData,getAllPatientImagingData,getPatientImagingInputData} from './PatientImagingOrder';
import {createPatientConsultData,updatePatientConsultData,deletePatientConsultData,getAllPatientConsultData,getPatientConsultInputData} from './PatientConsult'
import {createIndexFormData, getAllIndexFormData, getIndexFormByIdData, updateIndexFormData, deleteIndexFormData, createContentIndexFormIdData, createIndexByFormIdData, createSubIndexFormIdData} from './IndexFormController'

const reducers = combineReducers({
  allOrganizationData, updateOrganizationData,createOrganizationData,getByIdOrganizationData,createPatientData, loginData,loginSecurityData, forgotpasswordData,resetPasswordData,  verifyLoginData,verifyOTPData,resetSecretkeyData,reCreatePasswordData,
  getAllPatientData,getByIdPatientData,getPatientByInputData,dischargePatientById,updatePatientData,
  getAllStaffData,getByIdStaffData,createStaffData,inUpdateStaffData,outUpdateStaffData,UpdateStaffData,deleteStaffData,  
  updatelocationData,updateactivityData,updateQ15Data,createQ15Data,createactivityQ15Data,CreatelocationQ15Data,getQ15Data,
  assignpatientstaffData,getallpatientstaffData,getIDpatientstaffData,createDynamicBedAssignData,getAllDynamicBedAssignData,getBedAssignmentByOrgIdData,deleteDynamicBedAssignData,
  createq15configData,getallq15configData,getidq15configData,getSLOTq15configData,assignstaffpatientData,deletePatientData,
  getallBedAssignmentData,createBedAssignmentData,createPatientAllergyData,getAllPatientAllergyData,getAllergyByPatientInputData,getAllergyByPatientInputIdData,
  updatePatientAllergyData,deletePatientAllergyData,createPatientProblemsData,getAllPatientProblemsData,getProblemsByPatientInputData,getProblemsByPatientInputIdData,
  updatePatientProblemsData,deletePatientProblemsData, createPatientVitalsData,getAllPatientVitalsData,getVitalsByPatientInputData,getVitalsByPatientInputIdData,
  updatePatientVitalsData,deletePatientVitalsData,createPatientImmunizationData,getAllPatientImmunizationData,getImmunizationByPatientInputData,updatePatientImmunizationData,
  deletePatientImmunizationData,getImmunizationByPatientInputIdData,createPatientLabOrderData,getAllPatientLabOrderData,getLabOrderByPatientInputData,updatePatientLabOrderData,
  deletePatientLabOrderData,getLabOrderByPatientInputIdData,createFieldsData,createFormsData,getAllFieldsData,getAllFormsData,getByNameFormsData,updateFieldsData,createFilledFormData,getByPatientIdFilledFormData,
  createOrderProcedureProblemsData,getAllOrderProcedureProblemsData,getOrderProcedureByProblemsInputData,updateOrderProcedureControlData,deleteOrderProcedureControlData,
  createPatientAdmitData,createTransferPatientData,createDischargePatientData,getPatientAdmitData,getTransferPatientData,getDischargePatientData,
  createPatientConsultData,updatePatientConsultData,deletePatientConsultData,getAllPatientConsultData,getPatientConsultInputData,
  createPatientImagingData,updatePatientImagingData,deletePatientImagingData,getAllPatientImagingData,getPatientImagingInputData,
  updatePatientVisitData, CreatePatientVisitData,getallPatientVisitData, getbyPidPatientVisitData, getbyidPatientVisitData,deletePatientVisitData,
  deleteFilledFormData,deleteSelectedFieldsData,createIndexFormData, getAllIndexFormData, getIndexFormByIdData, updateIndexFormData, deleteIndexFormData, createContentIndexFormIdData, createIndexByFormIdData, createSubIndexFormIdData
});
export default reducers;
