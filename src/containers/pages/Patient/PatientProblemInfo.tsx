
import { useState, Dispatch, useEffect } from "react";
import {MenuItem} from "@mui/material";
import "./../Bed/BedMasterConfiguration.css";
import React from "react";
import { connect } from "react-redux";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import { getProblemsByPatientInputId } from "../../../store/actions/PatientProblem";
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/BottomFooter.css";
import { HttpLogin } from "../../../utils/Http";
import PatientProblemsData from "./../../../assets/data/PatientProblemData.json";
import { getAllStaff } from "../../../store/actions/Staff";
import moment from "moment";
import { createBrowserHistory } from "history";

interface IPatientProblem { }
interface IPatientProblem {
    StaticPage: any;
    dispatch: Dispatch<any>;
    getProblemsByPatientInputIdData: any;
    match: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const PatientProblem: React.FC<IPatientProblem> = ({
    dispatch, getProblemsByPatientInputIdData, match


}) => {

    const history = createBrowserHistory();
    let [inputFormData, setInputFormData] = useState(PatientProblemsData);
    let [encryptPatientId, setEncryptPatientId] = useState(null);
    let [decryptPatientId, setDecryptPatientId] = useState(null);
    let [encryptVisitId, setEncryptVisitId] = useState(null);
    let [decryptVisitId, setDecryptVisitId] = useState(null);
    let [encryptId, setEncryptId] = useState(null);
    let [decryptId, setDecryptId] = useState(null);
    let [inputPatientInfo, setInputPatientInfo] = useState(null); 
    let [inputOrgData, setInputOrgData] = useState("");

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
        //  console.log(JSON.stringify(decodeFinalId));
        var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
        orgData = orgData.loginInput.organization;
        HttpLogin.axios().get("api/org/getById/" + orgData)
            .then((res) => {
                if (res.data.message.code === "MHC - 0200") {
                    setInputOrgData(res.data.data.organizationdetails[0].name);
                } else {
                    setInputOrgData("");
                }
            })
     
            HttpLogin.axios().get("api/patient/getPatient/" + decodeFinalPatientid)
                .then((res) => {
                    setInputPatientInfo(res.data.data.basicDetails[0].name[0].given+" "+res.data.data.basicDetails[0].name[0].family);
                    
                    if (res.data.message.code === "MHC - 0200") {
                                            
                    } else {
                        alert(res.data.message.description);
                    }

                })
                if (decodeFinalId !== "") {
            dispatch(getProblemsByPatientInputId(decodeFinalPatientid,decodeFinalId));
        }

        dispatch(getAllStaff());
    }, []);

    const [isPatientPageLoaded, setPatientPageLoaded] = useState(false);

    if (!isPatientPageLoaded && !getProblemsByPatientInputIdData.isLoading) {
        if (getProblemsByPatientInputIdData.items !== undefined) {
            if (getProblemsByPatientInputIdData.items.message.code === "MHC - 0200") {
                console.log(JSON.stringify(getProblemsByPatientInputIdData.items.data));
                getProblemsByPatientInputIdData.items.data.dateOfOnset = new Date(moment(getProblemsByPatientInputIdData.items.data.dateOfOnset, "YYYYMMDD").format("YYYY-MM-DDTHH:mm:ss.000Z"));
                getProblemsByPatientInputIdData.items.data.lastUpdate = new Date(moment(getProblemsByPatientInputIdData.items.data.lastUpdate, "YYYYMMDD").format("YYYY-MM-DDThh:mm:ss.000Z"));              
                setInputFormData(getProblemsByPatientInputIdData.items.data);
            } else {
                setInputFormData({ ...inputFormData });
                alert(getProblemsByPatientInputIdData.items.message.description);
            }
        } else {
            setInputFormData({ ...PatientProblemsData })
        }
        setPatientPageLoaded(true);
    }
    if (!getProblemsByPatientInputIdData && getProblemsByPatientInputIdData.isFormSubmit) {

        setTimeout(() => {
            setPatientPageLoaded(false);

        }, (1000));
    }
    const handleBackclick = () => {
        window.location.href = "/MettlerVisitPatientdata/"+encryptPatientId+"/"+encryptVisitId;
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
                    <a style={{cursor:'pointer'}} onClick={() => history.goBack()}> <div className="beddetails"><i onClick={handleBackclick} style={{ position: "relative", top: "21px", left: "-7px", color: "#133C93",cursor:"pointer" }} className="large material-icons">arrow_back</i>Problem</div></a>

                    <div style={{ color: "#9DA1C3", left: "21px", position: "relative", font: "poppins", fontWeight: "lighter", fontSize: "13px", lineHeight: "19.5px" }}>{inputFormData.updatedDate !== null && inputFormData.updatedDate !== undefined ?moment(inputFormData.updatedDate,"YYYYMMDDhhmmss").format("MMM DD, hh:mm A"):null}</div>
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
                        <div style={{ color: "#9DA1C3", fontWeight: "lighter", fontSize: "14px" }}>Problem Description</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.problemDescription !== null && inputFormData.problemDescription !== ""?inputFormData.problemDescription:"--"}</div>
                    </div>



                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "256px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Date of Onset</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.dateOfOnset !== null && inputFormData.dateOfOnset !== undefined ?moment(inputFormData.dateOfOnset,"YYYYMMDDhhmmss").format("MMM DD, YYYY"):null}</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Last Update</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.lastUpdate !== null && inputFormData.lastUpdate !== undefined ?moment(inputFormData.lastUpdate,"YYYYMMDDhhmmss").format("MMM DD, YYYY"):null}</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "356px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Location</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.locationOfProblem !== null && inputFormData.locationOfProblem !== ""?inputFormData.locationOfProblem:"--"}</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Resp Provider</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.respProvider !== null && inputFormData.respProvider !== ""?inputFormData.respProvider:"--"}</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "456px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Service</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.service !== null && inputFormData.service !== ""?inputFormData.service:"--"}</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Status</div>
                        <div style={{ color: "#3F3F46" }}>Active</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "556px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Immediacy</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.immediacy !== null && inputFormData.immediacy !== ""?inputFormData.immediacy:"--"}</div>
                    </div>
                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Clinic</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.clinic !== null && inputFormData.clinic !== ""?inputFormData.clinic:"--"}</div>
                    </div>


                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "656px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#9DA1C3" }}>Treatment Factors</div>
                        <div style={{ color: "#3F3F46" }}>{inputFormData.treatmentFactors !== null  && inputFormData.treatmentFactors !== undefined && inputFormData.treatmentFactors.length>0 ? inputFormData.treatmentFactors.map(function(item, index) {return <span key={`demo_snap_${index}`}>{ (index ? ', ' : '') + item }</span>;}):"--"}</div>
                    </div>
                </div>
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "756px" }}>

                    <div className="name-input13">
                        <div style={{ color: "#000000", fontWeight: "bold", fontSize: "16px" }}>Comments</div>
                        <div style={{ position: "absolute", top: "61px", color: "#000000", fontWeight: "bold", fontSize: "16px" }}>{inputPatientInfo !== null && inputPatientInfo !== undefined && inputPatientInfo !== ""?inputPatientInfo:"--"}<span style={{ color: "#9DA1C3", position: "relative", left: "20px" }}>{inputFormData.updatedDate !== null  && inputFormData.updatedDate !== "" && inputFormData.updatedDate !== undefined ?moment(inputFormData.updatedDate,"YYYYMMDDhhmmss").format("MMM-DD, YYYY"):inputFormData.updatedDate} at {inputFormData.updatedDate !== null && inputFormData.updatedDate !== "" && inputFormData.updatedDate !== undefined ? moment(inputFormData.updatedDate,"YYYYMMDDhhmmss").format("hh:mm"):null}</span></div>
                        <div style={{ position: "absolute", top: "88px", color: "#3F3F46" }}>{inputFormData.comments}</div>
                    </div>
                </div>
                {/*
                <div className="bedorgForm-fields3" style={{ gap: "114px", position: "absolute", display: "flex", top: "856px" }}>

                    <div className="name-input13">

                        <div style={{ position: "absolute", top: "61px", color: "#000000", fontWeight: "bold", fontSize: "16px" }}>{inputPatientInfo !== null && inputPatientInfo !== undefined && inputPatientInfo !== ""?inputPatientInfo:"--"}<span style={{ color: "#9DA1C3", position: "relative", left: "20px" }}>{inputFormData.updatedDate !== null  && inputFormData.updatedDate !== "" && inputFormData.updatedDate !== undefined ?moment(inputFormData.updatedDate,"YYYYMMDDhhmmss").format("MMM-DD, YYYY"):null} at {inputFormData.updatedDate !== null && inputFormData.updatedDate !== "" && inputFormData.updatedDate !== undefined ? moment(inputFormData.updatedDate,"YYYYMMDDhhmmss").format("hh:mm"):null}</span></div>
                        <div style={{ position: "absolute", top: "88px", color: "#3F3F46" }}>The objective of genuine health care reform must be premium</div>
                    </div>
                </div>
    */}


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
    const { deviceFormData, getProblemsByPatientInputIdData } = state;
    return {
        deviceFormData, getProblemsByPatientInputIdData
    };
};

export default connect(mapStateToProps)(PatientProblem)




