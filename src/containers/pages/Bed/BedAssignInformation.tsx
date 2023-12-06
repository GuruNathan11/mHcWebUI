
import { useState, useCallback, Dispatch, useEffect } from "react";
import {
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    FormHelperText,
    Select,
    Button,
    Icon,
    colors,
    FormControlLabel,
    Checkbox,



} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CheckBoxgary from "../../../components/CheckBoxgary";
import HIPAAComplianceContainer from "../../../components/HIPAAComplianceContainer";
import "./BedMasterConfiguration.css";
import React from "react";
import { connect } from "react-redux";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import newImage from './../../../assets/images/mettler_images/rectangle-5999.svg';
import BedMasterConfigurationData from "../../../assets/data/BedMasterConfigurationData.json";
import { createOrganization, getByIdOrganization, updateOrganization } from "../../../store/actions/Organization";
import * as Constants from "../Constants/ConstantValues";
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/BottomFooter.css";
import { HttpLogin } from "../../../utils/Http";


interface IBedAssign { }
interface IBedAssign {
    StaticPage: any;
    dispatch: Dispatch<any>;
    createOrganizationData: any;
    errorMessage: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const BedAssign: React.FC<IBedAssign> = ({
    dispatch, createOrganizationData, errorMessage


}) => {


    let [inputFormData, setInputFormData] = useState(BedMasterConfigurationData);
    let [organizationId, setOrganizationId] = useState("");

    useEffect(() => {
        var orgData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
        orgData = orgData.loginInput.organization;
        setOrganizationId(orgData);

    }, []);
    const [Gendercreatepation, setGendercreatepation] = useState(false);
    const [organizationred, setorganizationred] = useState(false);
    const handleInputChange = (event: any) => {
        if (event.target.name === "Floorno") {
            inputFormData.floorNo = event.target.value;
        } else if (event.target.name === "WardunitName") {
            inputFormData.wardName = event.target.value;
        } else if (event.target.name === "wings") {
            inputFormData.wing = event.target.value;
        } else if (event.target.name === "sideIn") {
            inputFormData.side = event.target.value;
        } else if (event.target.name === "room") {
            inputFormData.roomNo = event.target.value;
        } else if (event.target.name === "bedtypes") {
            inputFormData.bedType = event.target.value;
        } else if (event.target.id === "BedNumber") {
            inputFormData.bedNo = event.target.value;
        } else if (event.target.name === "bedFeature") {
            inputFormData.bedFeatures = event.target.value;
        } else if (event.target.name === "Supervision") {
            inputFormData.supervisionLevel = event.target.value;
        } else if (event.target.id === "SecurityMeasuresforHighriskPation") {
            inputFormData.securityMeasures = (event.target.value);
        } else if (event.target.id === "Positions") {
            inputFormData.position = (event.target.value);
        } else if (event.target.id === "colorred") {
            setorganizationred(event.target.checked);          
        } else if (event.target.id === "checkboxgenderselection") {
            setGendercreatepation(event.target.checked);

        }

        setInputFormData({ ...inputFormData });
    }
    /*
      const [isPageLoaded, setPageLoaded] = useState(false);
    
      if (!isPageLoaded && !createOrganizationData.isLoading) {
    
        if (createOrganizationData.items !== null && createOrganizationData.items !== "") {
    
          if (createOrganizationData.items.message !== undefined && createOrganizationData.items.message.code !== "MHC - 0200") {
            alert(createOrganizationData.items.message.description);
          } else {
            alert("Organization Created / Updated Sucessfully")
          }
        }
    
        // setInputOrgData(getByIdOrganizationData.items);
        setPageLoaded(true)
      }
      if (!createOrganizationData && createOrganizationData.isFormSubmit) {
    
        setTimeout(() => {
          setPageLoaded(false);
    
        }, (1000));
      }  */

    // const [isValid, setValid] = useState(true);
    // const checkValidation = () => {
    //     errorMessage = "";
    //     setValid(true);
    //     var email = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/i;
    //     var phoneno = /^\(\d{3}\) \d{3}-\d{4}$/;
    //     if ((inputFormData.Floorno == null || inputFormData.Floorno == "" || inputFormData.Floorno.length == 0)) {
    //         setValid(false);
    //         document.getElementById("Floorno").focus();
    //         errorMessage = "select the floor no";
    //         return false;
    //     } else if ((inputFormData.wing == null || inputFormData.wing == "" || inputFormData.wing!.length == 0)) {
    //         setValid(false);
    //         document.getElementById("wings").focus();
    //         errorMessage = "Select Wing";
    //         return false;
    //     } else if ((inputFormData.wardName == null || inputFormData.wardName == "" || inputFormData.wardName.length == 0)) {
    //         setValid(false);
    //         document.getElementById("WardunitName").focus();
    //         errorMessage = "Ward/Unit Name is Not a Valid";
    //         return false;
    //     } else if ((inputFormData.side == null || inputFormData.side == "" || inputFormData.side!.length == 0)) {
    //         setValid(false);
    //         document.getElementById("sideIn").focus();
    //         errorMessage = "Select side";
    //         return false;
    //     } else if ((inputFormData.room == null || inputFormData.room == "" || inputFormData.room!.length == 0)) {
    //         setValid(false);
    //         document.getElementById("room").focus();
    //         errorMessage = "select room";
    //         return false;
    //     } else if ((inputFormData.bedtype == null || inputFormData.bedtype == "" || inputFormData.bedtype!.length == 0)) {
    //         setValid(false);
    //         document.getElementById("bedtypes").focus();
    //         errorMessage = "select bedtype";
    //         return false;
    //     } else if ((inputFormData.bednumber == null || inputFormData.bednumber == "" || inputFormData.bednumber!.length == 0 || phoneno.test(inputFormData.bednumber))) {
    //         setValid(false);
    //         document.getElementById("BedNumber").focus();
    //         errorMessage = "enter valid bed number";
    //         return false;
    //     } else if ((inputFormData.bedfeatures == null || inputFormData.bedfeatures == "" || inputFormData.bedfeatures!.length == 0)) {
    //         setValid(false);
    //         document.getElementById("bedFeature").focus();
    //         errorMessage = "select bedfeatures ";
    //         return false;
    //     } else if ((inputFormData.supervisionlevel == null || inputFormData.supervisionlevel == "" || inputFormData.supervisionlevel!.length == 0)) {
    //         setValid(false);
    //         document.getElementById("Supervision").focus();
    //         errorMessage = "select supervision level ";
    //         return false;
    //     } else if ((inputFormData.securitymeasures == null || inputFormData.securitymeasures == "" || inputFormData.securitymeasures!.length == 0)) {
    //         setValid(false);
    //         document.getElementById("SecurityMeasuresforHighriskPation").focus();
    //         errorMessage = "enter valid securitymeasures ";
    //         return false;
    //     } else if ((inputFormData.position == null || inputFormData.position == "" || inputFormData.position!.length == 0)) {
    //         setValid(false);
    //         document.getElementById("Positions").focus();
    //         errorMessage = "enter the positions ";
    //         return false;
    //     }
        // else {
        //     setValid(true);
        //     return true;
        // }

    // }

    // const handleClickChange = () => {
    //     checkValidation();

    //     if (isValid && errorMessage.length === 0) {

    //         setInputFormData({ ...inputFormData });


    //         if (inputFormData.id != "") {
    //             //  dispatch(updateOrganization(inputFormData));
    //         } else {
    //             //   dispatch(createOrganization(inputFormData));
    //         }

    //     } else {
    //         alert(errorMessage);
    //     }


    // }

    return (
        <>
            <div className="bed-details">
                <div className="bed-details-child" />
                <div className="bed-details-child1" />
                <div className="bedline-div" />
                <div className="bedexpand-more-24px-parent">
                    <img
                        className="bedexpand-more-24px-icon"
                        alt=""
                        src="/expand-more-24px.svg"
                    />
                    <div className="beddetails">Assign Bed</div>
                    <div style={{position:"absolute",top:"24px",fontSize:"9px" ,color:"#9DA1C3"}}>Semiprivate - 105-02</div>
                </div>
                <div className="bedorgForm-fields">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TextField
                        id="BedNumber"
                        className="destination-name-input"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label={
                            <span>
                               Age<span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        value={""}
                        onChange={handleInputChange}
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                    />

                        <TextField
                        id="BedNumber"
                        className="destination-name-input"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label={
                            <span>
                               SSN NO <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        value={""}
                        onChange={handleInputChange}
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                    />
                        <div className="selectoutlined">
                            <DatePicker
                                label="Admit Date"
                                slotProps={{
                                    textField: {
                                        variant: "outlined",
                                        size: "medium",
                                        fullWidth: true,
                                        color: "primary",
                                    },
                                }}
                            />
                        </div>

                    </LocalizationProvider>

                </div>

                <div className="bedorgForm-fields2">
                    <TextField
                        id="BedNumber"
                        className="destination-name-input"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label={
                            <span>
                               Height <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        value={""}
                        onChange={handleInputChange}
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                    />
                    <TextField
                        id="BedNumber"
                        className="destination-name-input"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label={
                            <span>
                               Weight<span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        value={""}
                        onChange={handleInputChange}
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                    />
                   <TextField
                        id="BedNumber"
                        className="destination-name-input"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label={
                            <span>
                               Ward & Bed Info <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        value={""}
                        onChange={handleInputChange}
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                    />
                </div>
                <div className="bedorgForm-fields3" style={{top:"594px"}}>
                    <div style={{position:"absolute",top:"-61px",color:"black",fontWeight:"bold"}}>Contact Information</div>
                    <TextField
                        id="SecurityMeasuresforHighriskPation"
                        className="destination-name-input"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label={
                            <span>
                               Email ID<span style={{ color: 'red' }}></span>
                            </span>
                        }
                        value={""}
                        onChange={handleInputChange}
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                    />
                    <TextField
                        id="Positions"
                        className="destination-name-input"
                        color="primary"
                        variant="outlined"
                        type="number"
                        label={
                            <span>
                                Phone Number <span style={{ color: 'red' }}></span>
                            </span>
                        }
                        value={""}
                        onChange={handleInputChange}
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                    />
                 
                </div>
                <div className="Address"  >
                <TextField
                        id="Positions"
                        className="destination-name-input"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label={
                            <span>
                                Address <span style={{ color: 'red' }}></span>
                            </span>
                        }
                        value={""}
                        onChange={handleInputChange}
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                    />
                </div>
                <div className="bedorgForm-fields8">

                <TextField
                        id="Positions"
                        className="destination-name-input"
                        color="primary"
                        variant="outlined"
                        type="text"
                        label={
                            <span>
                                Patient Name <span style={{ color: 'red' }}></span>
                            </span>
                        }
                        value={""}
                        onChange={handleInputChange}
                        placeholder="Placeholder"
                        size="medium"
                        margin="none"
                    />
                    <div className="frame-parent28" style={{ position: "relative", top: "-52px" }}>

                        <div className="check-boxgary-frame">
                            <FormControlLabel

                                label="Declined to Specify"
                                labelPlacement="end"
                                control={<Checkbox color="primary" size="medium" value={Gendercreatepation} id="checkboxgenderselection" />}
                                onChange={handleInputChange}
                            />
                            <CheckBoxgary
                                checkBoxgaryWidth="unset"
                                checkBoxgaryHeight="unset"
                            />
                        </div>

                        <FormControl className="name-input41" variant="outlined">
                            <InputLabel color="primary">Gender</InputLabel>
                            <Select style={{ background: Gendercreatepation ? 'lightgrey' : '' }} color="primary" size="medium" label="Gender" name="patientGender" disabled={Gendercreatepation} value={""} onChange={handleInputChange}>
                                <MenuItem value="">Select</MenuItem>

                            </Select>
                            <FormHelperText />
                        </FormControl>
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

                            label="Save"
                            primaryButtonCursor="pointer"
                            onNextContainerClick={() => {
                                // handleClickChange();
                                // Add this line
                            }}
                        />
                    </div>
                </div>
                <HIPAAComplianceContainer complianceDocumentation="Business Associate Agreement (BAA) with Covered Entities" />
                <div className="vector-parent">
                    <img className="frame-child1" alt="" src={newImage} />
                    <Button
                        className="orgButtoncontainedtruefalse1"
                        variant="outlined"
                        color="primary"
                        startIcon={<Icon>attachment_sharp</Icon>}
                    >
                        Attach Document
                    </Button>
                    <div className="orgLabel2">Risk AssessmentDocumentation</div>
                </div>
                <HIPAAComplianceContainer
                    complianceDocumentation="HIPAA Compliance Policies and Procedures Documentation "
                    propTop="1174px"
                />
            </div>
        </>
    );

};
const mapStateToProps = (state: any) => {
    const { deviceFormData, createOrganizationData } = state;
    return {
        deviceFormData, createOrganizationData
    };
};

export default connect(mapStateToProps)(BedAssign)




