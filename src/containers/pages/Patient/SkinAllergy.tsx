
import { useState, Dispatch, useEffect } from "react";
import "./../Bed/BedMasterConfiguration.css";
import React from "react";
import { connect } from "react-redux";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import PatientAllergyData from "./../../../assets/data/PatientAllergyData.json";
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/BottomFooter.css";
import { HttpLogin } from "../../../utils/Http";
import { getAllergyByPatientInputId } from "../../../store/actions/PatientAllergy";
import moment from "moment";
import { getAllStaff } from "../../../store/actions/Staff";

interface ISkinAllergy { }
interface ISkinAllergy {
    StaticPage: any;
    dispatch: Dispatch<any>;
    getAllergyByPatientInputIdData: any;
    match: any;
    getAllStaffData: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const SkinAllergy: React.FC<ISkinAllergy> = ({
    dispatch, getAllergyByPatientInputIdData, match, getAllStaffData


}) => {


    let [inputFormData, setInputFormData] = useState(PatientAllergyData);
    let [encryptPatientId, setEncryptPatientId] = useState(null);
    let [decryptPatientId, setDecryptPatientId] = useState(null);
    let [encryptVisitId, setEncryptVisitId] = useState(null);
    let [decryptVisitId, setDecryptVisitId] = useState(null);
    let [encryptId, setEncryptId] = useState(null);
    let [decryptId, setDecryptId] = useState(null);
    let [inputPatientInfo, setInputPatientInfo] = useState(null);
    let [inputOrgData, setInputOrgData] = useState("");
    let [inputOriginatorName, setInputOriginatorName] = useState(null);
    

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
        orgData = orgData.loginInput.organization;
        HttpLogin.axios().get("api/org/getById/" + orgData)
            .then((res) => {
                if (res.data.message.code === "MHC - 0200") {
                    setInputOrgData(res.data.data.id);
                } else {
                    setInputOrgData("");
                }
            })
            
        HttpLogin.axios().get("api/patient/getPatient/" + decodeFinalPatientid)
            .then((res) => {
                setInputPatientInfo(res.data.data.basicDetails[0].name[0].given+" "+res.data.data.basicDetails[0].name[0].family);
                
            })
        if (decodeFinalId !== "") {
            dispatch(getAllergyByPatientInputId(decodeFinalPatientid, decodeFinalId));
        }
        dispatch(getAllStaff());
    }, []);


    const [isPatientPageLoaded, setPatientPageLoaded] = useState(false);

    if (!isPatientPageLoaded && !getAllergyByPatientInputIdData.isLoading) {
        if (getAllergyByPatientInputIdData.items !== undefined) {
            if (getAllergyByPatientInputIdData.items.message.code === "MHC - 0200") {
                getAllergyByPatientInputIdData.items.data.dateOfOnset = new Date(moment(getAllergyByPatientInputIdData.items.data.dateOfOnset, "YYYYMMDDHHmm").format("YYYY-MM-DDTHH:mm:ss.000Z"));
                getAllergyByPatientInputIdData.items.data.observedDetails.reactionDateTime = new Date(moment(getAllergyByPatientInputIdData.items.data.observedDetails.reactionDateTime, "YYYYMMDDHHmm").format("YYYY-MM-DDThh:mm:ss.000Z"));
                //console.log(JSON.stringify(getAllergyByPatientInputIdData.items.data));
                setInputFormData(getAllergyByPatientInputIdData.items.data);
            } else {
                setInputFormData({ ...inputFormData });
                alert(getAllergyByPatientInputIdData.items.message.description);
            }
        } else {
            setInputFormData({ ...PatientAllergyData })
        }
        setPatientPageLoaded(true);
    }
    if (!getAllergyByPatientInputIdData && getAllergyByPatientInputIdData.isFormSubmit) {

        setTimeout(() => {
            setPatientPageLoaded(false);

        }, (1000));
    }

    const [isPageLoaded, setPageLoaded] = useState(false);

    if (!isPageLoaded && !getAllStaffData.isLoading) {

        if (getAllStaffData.items.message.code === "MHC - 0200") {
            let inputStaffName = getAllStaffData.items.data.filter(t => t.organization === inputOrgData && t.id === inputFormData.physicianName).map((k) => { return k.name[0].given });
            setInputOriginatorName(inputStaffName[0]);
        } else {
            alert(getAllStaffData.items.message.description);
        }
        setPageLoaded(true)
    }
    if (!getAllStaffData && getAllStaffData.isFormSubmit) {

        setTimeout(() => {
            setPageLoaded(false);

        }, (1000));
    }
    const handleBackclick = () => {
        window.location.href = "/MettlerVisitPatientdata/"+encryptPatientId+"/"+encryptVisitId;
      }

    return (
        <>
            <div className="bed-details" style={{ height: "858px" }}>
                <div className="bed-details-child" />
                <div className="bed-details-child1" style={{ height: "1106px" }} />
                <div className="bedline-div" />
                <div style={{ position: "absolute", width: "calc(100% - 1px)", top: "16px", right: "925px", left: "34px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "var(--gap-3xs)", fontSize: "var(--font-size-base)", color: "var(--color-black)" }}>
                    <img
                        className="bedexpand-more-24px-icon"
                        alt=""
                        src="/expand-more-24px.svg"
                    />
                    <div className="beddetails"> <i onClick={handleBackclick} style={{ position: "relative", top: "21px", left: "-7px", color: "#133C93",cursor:"pointer" }} className="large material-icons">arrow_back</i>Skin Allergy</div>

                    <div style={{ color: "#9DA1C3", left: "21px", position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "13px", lineHeight: "19.5px" }}>{inputFormData.updatedDate !== null && inputFormData.updatedDate !== "" && inputFormData.updatedDate !== undefined ? moment(inputFormData.updatedDate, "YYYYMMDDhhmmss").format("MMM DD, hh:mm A") : null}</div>
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
                        <div style={{ color: "#9DA1C3", fontWeight: "lighter", fontSize: "14px" }}>Active Allergies</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.inactive === true ? "Yes" : "No"}</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Originator</div>
                        <div style={{ color: "#3F3F46" }}>{inputOriginatorName !== null && inputOriginatorName !== undefined ? inputOriginatorName : "--"}</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "256px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Allergy Name</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.causativeAgentName !== null && inputFormData.causativeAgentName !== "" ? inputFormData.causativeAgentName : null}</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Origination Date</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.dateOfOnset !== null && inputFormData.dateOfOnset !== "" && inputFormData.dateOfOnset !== undefined ? moment(inputFormData.dateOfOnset, "YYYYMMDDhhmmss").format("MMM DD, YYYY") : null}</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "356px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Reaction Date/Time</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.observedDetails.reactionDateTime !== null && inputFormData.observedDetails.reactionDateTime !== "" && inputFormData.observedDetails.reactionDateTime !== undefined ? moment(inputFormData.observedDetails.reactionDateTime, "YYYYMMDDhhmm").format("MMM DD, YYYY@hh:mm A") : null}</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Nature of Reaction</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.natureOfReaction !== null && inputFormData.natureOfReaction !== "" ? inputFormData.natureOfReaction : "--"}</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "456px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Severity</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.allergySeverity !== null && inputFormData.allergySeverity !== "" ? inputFormData.allergySeverity : null}</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Symptoms</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.symptoms !== null && inputFormData.symptoms !== undefined && inputFormData.symptoms.length > 0 ? inputFormData.symptoms.map(function (item, index) { return <span key={`demo_snap_${index}`}>{(index ? ', ' : '') + item}</span>; }) : "--"}</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "556px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#000000", fontWeight: "bold", fontSize: "16px" }}>Comments [2] </div>
                        <div style={{ position: "absolute", top: "61px", color: "#000000", fontWeight: "bold", fontSize: "16px" }}>{inputPatientInfo !== null && inputPatientInfo !== undefined && inputPatientInfo !== "" ? inputPatientInfo : "--"}<span style={{ color: "#9DA1C3", position: "relative", left: "20px" }}>{inputFormData.updatedDate !== null && inputFormData.updatedDate !== "" && inputFormData.updatedDate !== undefined ? moment(inputFormData.updatedDate, "YYYYMMDDhhmmss").format("MMM-DD, YYYY") : null} at {inputFormData.updatedDate !== null && inputFormData.updatedDate !== "" && inputFormData.updatedDate !== undefined ? moment(inputFormData.updatedDate, "YYYYMMDDhhmmss").format("hh:mm") : null}</span></div>
                        <div style={{ position: "absolute", top: "88px", color: "#3F3F46" }}>The objective of genuine health care reform must be premium</div>
                    </div>
                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "656px" }}>

                    <div className="name-input13">

                        <div style={{ position: "absolute", top: "61px", color: "#000000", fontWeight: "bold", fontSize: "16px" }}>{inputPatientInfo !== null && inputPatientInfo !== undefined && inputPatientInfo !== "" ? inputPatientInfo : "--"}<span style={{ color: "#9DA1C3", position: "relative", left: "20px" }}>{inputFormData.updatedDate !== null && inputFormData.updatedDate !== "" && inputFormData.updatedDate !== undefined ? moment(inputFormData.updatedDate, "YYYYMMDDhhmmss").format("MMM-DD, YYYY") : null} at {inputFormData.updatedDate !== null && inputFormData.updatedDate !== "" && inputFormData.updatedDate !== undefined ? moment(inputFormData.updatedDate, "YYYYMMDDhhmmss").format("hh:mm") : null}</span></div>
                        <div style={{ position: "absolute", top: "88px", color: "#3F3F46" }}>The objective of genuine health care reform must be premium</div>
                    </div>
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
        </>
    );

};
const mapStateToProps = (state: any) => {
    const { deviceFormData, getAllergyByPatientInputIdData, getAllStaffData } = state;
    return {
        deviceFormData, getAllergyByPatientInputIdData, getAllStaffData
    };
};

export default connect(mapStateToProps)(SkinAllergy)




