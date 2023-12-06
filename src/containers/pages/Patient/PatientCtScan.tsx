
import { useState, Dispatch, useEffect } from "react";
import {
    FormControlLabel,
    Checkbox
} from "@mui/material";
import CheckBoxgary from "../../../components/CheckBoxgary";
import "./../Bed/BedMasterConfiguration.css";
import React from "react";
import { connect } from "react-redux";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/BottomFooter.css";
import { HttpLogin } from "../../../utils/Http";
import PatientImagingProcedureOrderData from "./../../../assets/data/PatientImagingProcedureOrderData.json";
import { getPatientImagingInput } from "../../../store/actions/PatientImagingOrder";
import { getAllStaff } from "../../../store/actions/Staff";
import moment from "moment";
interface IPatientCtScan { }
interface IPatientCtScan {
    StaticPage: any;
    dispatch: Dispatch<any>;
    getPatientImagingInputData: any;
    match: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const PatientCtScan: React.FC<IPatientCtScan> = ({
    dispatch, getPatientImagingInputData, match


}) => {

    let [inputFormData, setInputFormData] = useState(PatientImagingProcedureOrderData);
    let [encryptPatientId, setEncryptPatientId] = useState(null);
    let [decryptPatientId, setDecryptPatientId] = useState(null);
    let [encryptVisitId, setEncryptVisitId] = useState(null);
    let [decryptVisitId, setDecryptVisitId] = useState(null);
    let [encryptId, setEncryptId] = useState(null);
    let [decryptId, setDecryptId] = useState(null);
    
    let [getStaffDataItems, setGetStaffDataItems] = useState(new Array<any>());
    let [inputOrgData, setInputOrgData] = useState("");
    let [patientSSN, setPatientSSN] = useState(null);
    let [patientGender, setPatientGender] = useState(null);
    let [patientDateOfBirth, setPatientDateOfBirth] = useState(null);
    let [inputPatientInfo, setInputPatientInfo] = useState(null);
    let [patientAge, setPatientAge] = useState(null);
    let [AllergyData, setAllergyData] = useState(null);
    let [NatureOfReactionData, setNatureOfReactionData] = useState(null);
    let [SymptomsData, setSymptomsData] = useState(null);
    let [severitys, setseverity] = useState(null);
    let [inputOrgId, setInputOrgId] = useState("");
    let [loginEnteredBy, setLoginEnteredBy] = useState("");
    let [Urgency, setUrgency] = useState(null);

    useEffect(() => {
        var encryptInitial = match.params.patientid;
        setEncryptPatientId(encryptInitial);
        var CryptoJS = require("crypto-js");
        let decodePatientid = decodeURIComponent(encryptInitial);
        let decodeFinalPatientid = CryptoJS.AES.decrypt(decodePatientid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
        setDecryptPatientId(decodeFinalPatientid);
        var encryptVisitInitial = match.params.visitId;
        setEncryptVisitId(encryptVisitInitial);
        let decodeVisitid = decodeURIComponent(encryptVisitInitial);
        let decodeFinalVisitid = CryptoJS.AES.decrypt(decodeVisitid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
        setDecryptVisitId(decodeFinalVisitid);
        var encryptIdInitial = match.params.id;
        setEncryptId(encryptIdInitial);
        let decodeId = decodeURIComponent(encryptIdInitial);
        let decodeFinalId = CryptoJS.AES.decrypt(decodeId.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
        setDecryptId(decodeFinalId);

        var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
        inputFormData.enteredBy = orgData.items.data.userDetail.name[0].given + " " + orgData.items.data.userDetail.name[0].family;
        setInputFormData({ ...inputFormData });
        setLoginEnteredBy(orgData.items.data.userDetail.name[0].given + " " + orgData.items.data.userDetail.name[0].family);
        orgData = orgData.loginInput.organization;
        HttpLogin.axios().get("api/org/getById/" + orgData)
            .then((res) => {
                if (res.data.message.code === "MHC - 0200") {

                    setInputOrgId(res.data.data.id);
                    setInputOrgData(res.data.data.organizationdetails[0].name);
                } else {
                    setInputOrgData("");
                }
            })
        HttpLogin.axios().get("api/patient/getPatient/" + decodeFinalPatientid)
            .then((response) => {
                //     console.log(JSON.stringify(response.data.data))     
                

            })
        if (decodeFinalId !== "") {
            dispatch(getPatientImagingInput(decodeFinalId));
        }
        dispatch(getAllStaff());

    }, []);
    const [isPageLoaded, setPageLoaded] = useState(false);

    if (!isPageLoaded && !getPatientImagingInputData.isLoading) {
        if (getPatientImagingInputData.items !== undefined) {
            if (getPatientImagingInputData.items.message.code === "MHC - 0200") {
                getPatientImagingInputData.items.data.dateDesired = new Date(moment(getPatientImagingInputData.items.data.dateDesired, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z"));
                getPatientImagingInputData.items.data.preOpScheduled = new Date(moment(getPatientImagingInputData.items.data.preOpScheduled, "YYYYMMDDHHmm").format("YYYY-MM-DDThh:mm:ss.000Z"));
                getPatientImagingInputData.items.data.enteredBy = loginEnteredBy;
                setInputFormData(getPatientImagingInputData.items.data);
            } else {
                setInputFormData({ ...inputFormData });
                alert(getPatientImagingInputData.items.message.description);
            }
        } else {
            setInputFormData({ ...PatientImagingProcedureOrderData })
        }

        setPageLoaded(true);
    }
    if (!getPatientImagingInputData && getPatientImagingInputData.isFormSubmit) {

        setTimeout(() => {
            setPageLoaded(false);

        }, (1000));
    }

    const handleBackclick = () => {
        window.location.href = "/MettlerVisitPatientdata/"+encryptPatientId+"/"+encryptVisitId;
      }
    return (
        <>
            <div className="bed-details" style={{ height: "950px" }}>
                <div className="bed-details-child" />
                <div className="bed-details-child1" style={{ height: "1106px" }} />
                <div className="bedline-div" />
                <div style={{ position: "absolute", width: "calc(100% - 1px)", top: "16px", right: "925px", left: "34px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "var(--gap-3xs)", fontSize: "var(--font-size-base)", color: "var(--color-black)" }}>
                    <img
                        className="bedexpand-more-24px-icon"
                        alt=""
                        src="/expand-more-24px.svg"
                    />
                    <div className="beddetails"> <i onClick={handleBackclick} style={{ position: "relative", top: "21px", left: "-7px", color: "#133C93",cursor:"pointer" }} className="large material-icons">arrow_back</i>CT Scan</div>

                    <div style={{ color: "#9DA1C3", left: "21px", position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "13px", lineHeight: "19.5px" }}>Routine</div>
                    <div>
                        <div style={{ display: "flex", position: "absolute", left: "831px", top: "20px", gap: "9px", backgroundColor: "#F8F9FB", height: "32px", width: "89.93px", borderRadius: "4px" }}>
                            <div><i style={{ position: "relative", top: "5px", left: "7px" }} className="large material-icons">print</i></div>
                            <div style={{ position: "absolute", top: "6px", left: "39px", fontSize: "14px" }}>Print</div>
                        </div>
                        <div style={{ display: "flex", gap: "9px", top: "20px", position: "absolute", left: "934px", width: "125px", height: "32px", backgroundColor: "#F8F9FB", borderRadius: "4px" }}>
                            <div>
                                <i style={{ position: "absolute", top: "5px", left: "5px" }} className="large material-icons">file_download</i>
                            </div>
                            <div style={{ position: "absolute", top: "6px", left: "39px", fontSize: "14px" }}>Download</div>
                        </div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "156px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3", fontWeight: "lighter", fontSize: "14px" }}>Imaging Type</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.imagingType !== null && inputFormData.imagingType !== "" ? inputFormData.imagingType : null}</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3", fontWeight: "lighter", fontSize: "14px" }}>Reason for Study</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.reasonForStudy !== null && inputFormData.reasonForStudy !== "" ? inputFormData.reasonForStudy : null}</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "256px" }}>

                <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Modifiers</div>
                        <div style={{ color: "#3F3F46" }}>    {Array.isArray(inputFormData.modifiers) && inputFormData.modifiers.length > 0 ? (
                            <div className="modifiers">{inputFormData.modifiers.join(" ")}</div>
                        ) : (
                            <div className="no-modifiers">No modifiers</div>
                        )}</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Date Desired</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.dateDesired !== null && inputFormData.dateDesired !== "" && inputFormData.dateDesired !== undefined ? moment(inputFormData.dateDesired, "YYYYMMDDhhmm").format("MMM DD, YYYY@hh:mm A") : null}</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "356px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Urgency</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.urgency !== null && inputFormData.urgency !== "" ? inputFormData.urgency : null}</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Transport</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.transport !== null && inputFormData.transport !== "" ? inputFormData.transport : null}</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "456px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Category</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.category !== null && inputFormData.category !== "" ? inputFormData.category : null}</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Submit to</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.submitTo !== null && inputFormData.submitTo !== "" ? inputFormData.submitTo : null}</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" ><FormControlLabel
                    style={{ top: "62px", position: "absolute" }}
                    label={<span style={{ color: "black", fontWeight: "bold" }}>Isolation</span>}
                    labelPlacement="end"
                    control={<Checkbox color="primary" size="medium" id="checkboxgenderselection" />}

                />
                    <CheckBoxgary
                        checkBoxgaryWidth="unset"
                        checkBoxgaryHeight="unset"
                    /></div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "556px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Pre OP Scheduled</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.preOpScheduled !== null && inputFormData.preOpScheduled !== "" && inputFormData.preOpScheduled !== undefined ? moment(inputFormData.preOpScheduled, "YYYYMMDDhhmm").format("MMM DD, YYYY@hh:mm A") : null}</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Pregnant</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.pragnant !== null && inputFormData.pragnant !== "" ? inputFormData.pragnant : null}</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "656px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Clinical History</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.clinicalHistory !== null && inputFormData.clinicalHistory !== "" ? inputFormData.clinicalHistory : null}</div>
                    </div>
                </div>


                <div className="component-5011">
                    <div className="cancel-group">
                        <SecondaryButton
                            label="Cancel"
                            secondaryButtonCursor="pointer"
                            onCancelContainerClick={null}
                        />
                        <div className="previous1">
                            <img className="bg-icon3" alt="" src={bottomImage} />
                            <div className="label5">Previous</div>
                        </div>
                        <PrimaryButton

                            label="Ok"
                            primaryButtonCursor="pointer"

                        />
                    </div>
                </div>


            </div>
        </>
    );

};
const mapStateToProps = (state: any) => {
    const { deviceFormData, getPatientImagingInputData } = state;
    return {
        deviceFormData, getPatientImagingInputData
    };
};

export default connect(mapStateToProps)(PatientCtScan)




