import { useState, Dispatch, useEffect } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import "./../Bed/BedMasterConfiguration.css";
import React from "react";
import { connect } from "react-redux";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/BottomFooter.css";
import { HttpLogin } from "../../../utils/Http";
import { getImmunizationByPatientInputId } from "../../../store/actions/PatientImmunization";
import moment from "moment";
import { getAllStaff } from "../../../store/actions/Staff";
import PatientImmunizationData from "./../../../assets/data/PatientImmunizationData.json";
interface IImmunizationView { }
interface IImmunizationView {
    StaticPage: any;
    dispatch: Dispatch<any>;
    createOrganizationData: any;
    getImmunizationByPatientInputIdData: any;
    errorMessage: any;
    match: any;
    getAllStaffData: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const ImmunizationView: React.FC<IImmunizationView> = ({
    dispatch, getImmunizationByPatientInputIdData, match, getAllStaffData

}) => {
    let [inputFormData, setInputFormData] = useState(PatientImmunizationData);
    let [encryptPatientId, setEncryptPatientId] = useState(null);
    let [decryptPatientId, setDecryptPatientId] = useState(null);
    let [encryptVisitId, setEncryptVisitId] = useState(null);
    let [decryptVisitId, setDecryptVisitId] = useState(null);
    let [encryptId, setEncryptId] = useState(null);
    let [decryptId, setDecryptId] = useState(null);
    let [patientImage, setPatientImage] = useState("");
    let [getStaffDataItems, setGetStaffDataItems] = useState(new Array<any>());
    let [inputOrgData, setInputOrgData] = useState("");
    let [patientDateOfBirth, setPatientDateOfBirth] = useState(null);
    let [inputPatientInfo, setInputPatientInfo] = useState(null);
    let [patientAge, setPatientAge] = useState(null);


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
        console.log(JSON.stringify(decodeFinalPatientid));
        console.log(JSON.stringify(decodeFinalVisitid));
        console.log(JSON.stringify(decodeFinalId));
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
        //  console.log(JSON.stringify(decodeFinalId))     

        HttpLogin.axios().get("api/patient/getPatient/" + decodeFinalPatientid)
            .then((res) => {
                //  console.log(JSON.stringify(res.data.data))     
                
                if (res.data.message.code === "MHC - 0200") {
                    setInputPatientInfo(res.data.data.basicDetails[0].name[0].given+" "+res.data.data.basicDetails[0].name[0].family);
          setPatientImage(res.data.data.basicDetails[0].profile !== ""? res.data.data.basicDetails[0].profile:"");
                    setPatientDateOfBirth(moment(res.data.data.basicDetails[0].birthDate).format('MMM DD,YYYY'));
                    var today = new Date();
                    var birthDate = new Date(res.data.data.basicDetails[0].birthDate);
                    // create a date object directly from `dob1` argument
                    var age_now = today.getFullYear() - birthDate.getFullYear();
                    var m = today.getMonth() - birthDate.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age_now--;
                    }
                    setPatientAge(age_now);
                } else {
                    alert(res.data.message.description);
                }
            })
        if (decodeFinalId !== "") {
            dispatch(getImmunizationByPatientInputId(decodeFinalPatientid, decodeFinalId));
        }
        dispatch(getAllStaff());
    }, []);

    const [isPatientPageLoaded, setPatientPageLoaded] = useState(false);

    if (!isPatientPageLoaded && !getImmunizationByPatientInputIdData.isLoading) {
        //  console.log(JSON.stringify(getImmunizationByPatientInputIdData.items.data))

        if (getImmunizationByPatientInputIdData.items.message.code === "MHC - 0200") {
            getImmunizationByPatientInputIdData.items.data.doneDate = new Date(moment(getImmunizationByPatientInputIdData.items.data.doneDate, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z"));
            getImmunizationByPatientInputIdData.items.data.dueDate = new Date(moment(getImmunizationByPatientInputIdData.items.data.dueDate, "YYYYMMDDHHmm").format("YYYY-MM-DDThh:mm:ss.000Z"));
            getImmunizationByPatientInputIdData.items.data.administrationDate = new Date(moment(getImmunizationByPatientInputIdData.items.data.administrationDate, "YYYYMMDDHHmm").format("YYYY-MM-DDThh:mm:ss.000Z"));

            setInputFormData(getImmunizationByPatientInputIdData.items.data);
        } else {
            setInputFormData({ ...PatientImmunizationData });
            alert(getImmunizationByPatientInputIdData.items.message.description);
        }
        setPatientPageLoaded(true);
    }
    if (!getImmunizationByPatientInputIdData && getImmunizationByPatientInputIdData.isFormSubmit) {

        setTimeout(() => {
            setPatientPageLoaded(false);

        }, (1000));
    }
    const [isPageLoaded, setPageLoaded] = useState(false);
    if (!isPageLoaded && !getAllStaffData.isLoading) {

        if (getAllStaffData.items.message.code === "MHC - 0200") {
            setGetStaffDataItems(getAllStaffData.items.data.filter(t => t.organization === inputOrgData));
        } else {
            setGetStaffDataItems([]);
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
        window.location.href = "/MettlerVisitPatientdata/" + encryptPatientId + "/" + encryptVisitId;
    }
    return (
        <>
            <div className="bed-details" style={{ height: "1189px" }}>
                <div className="bed-details-child" />
                <div className="bed-details-child1" style={{ height: "1106px" }} />
                <div className="bedline-div" />
                <div style={{ position: "absolute", width: "calc(100% - 1px)", top: "16px", right: "925px", left: "34px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "var(--gap-3xs)", fontSize: "var(--font-size-base)", color: "var(--color-black)" }}>
                    <img
                        className="bedexpand-more-24px-icon"
                        alt=""
                        src="/expand-more-24px.svg"
                    />
                    <div className="beddetails"> <i onClick={handleBackclick} style={{ position: "relative", top: "21px", left: "-7px", color: "#133C93", cursor: "pointer" }} className="large material-icons">arrow_back</i>MMR</div>

                    <div style={{ color: "#9DA1C3", left: "21px", position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "13px", lineHeight: "19.5px" }}>{inputFormData.doneDate !== null && inputFormData.doneDate !== "" && inputFormData.doneDate !== undefined ? moment(inputFormData.doneDate, "YYYYMMDDhhmmss").format("MMM DD, hh:mm A") : null}</div>
                    <div>
                        <div style={{ display: "flex", position: "absolute", left: "831px", top: "20px", gap: "9px", backgroundColor: "#F8F9FB", height: "32px", width: "89.93px", borderRadius: "4px", cursor: "pointer" }}>
                            <div><i style={{ position: "relative", top: "5px", left: "7px", cursor: "pointer" }} className="large material-icons">print</i></div>
                            <div style={{ position: "absolute", top: "6px", left: "39px", fontSize: "14px" }}>Print</div>
                        </div>
                        <div style={{ display: "flex", gap: "9px", top: "20px", position: "absolute", left: "934px", width: "125px", height: "32px", backgroundColor: "#F8F9FB", borderRadius: "4px", cursor: "pointer" }}>
                            <div>
                                <i style={{ position: "absolute", top: "5px", left: "5px", cursor: "pointer" }} className="large material-icons">file_download</i>
                            </div>
                            <div style={{ position: "absolute", top: "6px", left: "39px", fontSize: "14px" }}>Download</div>
                        </div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "156px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3", fontWeight: "lighter", fontSize: "14px" }}>Immunization</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.immunization !== null && inputFormData.immunization !== undefined ? inputFormData.immunization : "--"}</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3", fontWeight: "lighter", fontSize: "14px" }}>Lot Number</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.lotNo !== null && inputFormData.lotNo !== undefined ? inputFormData.lotNo : "--"}</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "256px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Due Date</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.dueDate !== null && inputFormData.dueDate !== "" && inputFormData.dueDate !== undefined ? moment(inputFormData.dueDate, "YYYYMMDDhhmmss").format("MMM DD, YYYY") : null}</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Done Date</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.doneDate !== null && inputFormData.doneDate !== "" && inputFormData.doneDate !== undefined ? moment(inputFormData.doneDate, "YYYYMMDDhhmmss").format("MMM DD, YYYY") : null}</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "356px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Administration Date</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.administrationDate !== null && inputFormData.administrationDate !== "" && inputFormData.administrationDate !== undefined ? moment(inputFormData.administrationDate, "YYYYMMDDhhmmss").format("MMM DD, YYYY") : null}</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Administered by</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.administeredBy !== null && inputFormData.administeredBy !== undefined ? inputFormData.administeredBy : "--"}</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "456px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Route</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.route !== null && inputFormData.route !== undefined ? inputFormData.route : "--"}</div>
                    </div>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Anatomic Location</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.anatomicLocation !== null && inputFormData.anatomicLocation !== undefined ? inputFormData.anatomicLocation : "--"}</div>
                    </div>

                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "556px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Series</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.series !== null && inputFormData.series !== undefined ? inputFormData.series : "--"}</div>
                    </div>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Dosage</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.dosage !== null && inputFormData.dosage !== undefined ? inputFormData.dosage : "--"}</div>
                    </div>

                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "656px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Ordered by</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.orderedBy !== null && inputFormData.orderedBy !== undefined ? inputFormData.orderedBy : "--"}</div>
                    </div>
                    <div className="name-input13">
                        <FormControlLabel
                            style={{ position: "relative", top: "-19px", left: "-1px" }}
                            label={<span style={{ color: "#000000" }}>Administering by Policy</span>}
                            labelPlacement="end"
                            control={<Checkbox size="medium" id="checkboxgenderselection" />}

                        />

                    </div>

                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "756px" }}>


                    <div className="name-input13">
                        <FormControlLabel
                            style={{ position: "relative", top: "-24px", left: "-4px" }}
                            label={<span style={{ color: "#000000" }}>Indude Non-VA Providers</span>}
                            labelPlacement="end"
                            control={<Checkbox size="medium" id="checkboxgenderselection" />}

                        />

                    </div>

                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "856px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#000000", fontWeight: "bold", fontSize: "16px" }}>Comments [2] </div>
                        <div style={{ position: "absolute", top: "61px", color: "#000000", fontWeight: "bold", fontSize: "16px" }}>{inputPatientInfo !== null && inputPatientInfo !== undefined && inputPatientInfo !== "" ? inputPatientInfo : "--"}<span style={{ color: "#9DA1C3", position: "relative", left: "20px" }}>{inputFormData.doneDate !== null && inputFormData.doneDate !== "" && inputFormData.doneDate !== undefined ? moment(inputFormData.doneDate, "YYYYMMDDhhmmss").format("MMM DD, hh:mm A") : null}</span></div>
                        <div style={{ position: "absolute", top: "88px", color: "#3F3F46" }}>The objective of genuine health care reform must be premium</div>
                    </div>
                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "956px" }}>

                    <div className="name-input13">

                        <div style={{ position: "absolute", top: "61px", color: "#000000", fontWeight: "bold", fontSize: "16px" }}>{inputPatientInfo !== null && inputPatientInfo !== undefined && inputPatientInfo !== "" ? inputPatientInfo : "--"}<span style={{ color: "#9DA1C3", position: "relative", left: "20px" }}>{inputFormData.doneDate !== null && inputFormData.doneDate !== "" && inputFormData.doneDate !== undefined ? moment(inputFormData.doneDate, "YYYYMMDDhhmmss").format("MMM DD, hh:mm A") : null}</span></div>
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
    const { deviceFormData, getImmunizationByPatientInputIdData, getAllStaffData } = state;
    return {
        deviceFormData, getImmunizationByPatientInputIdData, getAllStaffData
    };
};

export default connect(mapStateToProps)(ImmunizationView)




