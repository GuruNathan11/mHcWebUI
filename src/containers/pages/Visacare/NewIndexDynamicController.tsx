
import React, { useState, Dispatch, useEffect } from "react";
import {TextField} from "@mui/material";
import "./../Bed/BedMasterConfiguration.css";

import { connect } from "react-redux";
import bottomImage from './../../../assets/images/mettler_images/bg.svg';
import IndexFormData from "./../../../assets/data/IndexFormData.json";
import SecondaryButton from "../../../components/SecondaryButton";
import PrimaryButton from "../../../components/PrimaryButton";
import "../../../components/BottomFooter.css";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";


interface INewIndexDynamicController { }
interface INewIndexDynamicController {
    StaticPage: any;
    dispatch: Dispatch<any>;
    match: any; 
}
const NewIndexDynamicController: React.FC<INewIndexDynamicController> = ({
    dispatch, match,


}) => {

    const [MainIndexList, setMainIndexList] = useState(IndexFormData.content);
    let [inputFormData, setInputFormData] = useState(IndexFormData);

    useEffect(() => {



    }, []);

    const handlePageSave = () =>{
        setMainIndexList(MainIndexList);
        inputFormData.content = MainIndexList;
        console.log(JSON.stringify(inputFormData))
    }

    const handleMainIndexChange = (index, event) => {
        let data = [...MainIndexList];
        data[index][event.target.name] = event.target.value;
       
        setMainIndexList(data);
    };

    const handleMainIndexRemove = (index) => {
        const list = [...MainIndexList];
        list.splice(index, 1);
        setMainIndexList(list);
    };

    const handleMainIndexAdd = () => {

        setMainIndexList([...MainIndexList,
            {
                heading: "",
                institutionName: "",
                policyTitle: "",
                policyNumber: "",
                effectiveDate: null,
                department: "",
                subHeading: [
                  {
                    indexContent: "",
                    content: "",
                    indexContent1: [
                      {
                        indexContent: "",
                        content: ""
                      }
                    ]
                  }
                ]
            }]);
    };

    // if (visaCareCaseData.items.MainIndexDetails.id !== 0 && visaCareCaseData.items.MainIndexDetails.length > 0) {
    //     setMainIndexList(visaCareCaseData.items.MainIndexDetails);
    // }
    return (
        <>{(MainIndexList.map((addMainIndex, index) => (<div key={index}>
            <div className="bed-details" style={{ height:index === 0 ?"1140px":'924px',position:'relative',top:index === 0?'0px':"-88px" }}>
                <div className="bed-details-child" />
                <div className="bed-details-child1" style={{ height: index === 0 ?"1298px":'924px',position:'absolute',top:index === 0?'0px':"5px" }} />
                {index === 0 && <div className="bedline-div" style={{ top: "89.5px", left: "649px", width: "calc(50% - 544px)" }} />}
                <div className="bedexpand-more-24px-parent">
                    <img
                        className="bedexpand-more-24px-icon"
                        alt=""
                        src="/expand-more-24px.svg"
                    />
                     {index === 0 && <div style={{ top: "7px", left: "-102px", position: "absolute", textAlign: "center", width: "-webkit-fill-available" }}> <i style={{ position: "relative", top: "6px", left: "-534px", cursor: "pointer" }} className="large material-icons" >arrow_back</i>Create Profile Summary</div>}
                </div>
               <div style={{position:'relative',top:index === 0?'0px':"-126px"}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>

                    <div className="bedorgForm-fields8" style={{ top: "190px" }}>
                        <div style={{ color: "#000000", fontWeight: 600 }}>Heading </div>

                    </div>
                    <div className="bedorgForm-fields" style={{ top: "266px", display: "flex", flexDirection: "row-reverse" }}>
                        <TextField
                            id="institutionName" name="institutionName" onChange={(event) => handleMainIndexChange(index, event)} value={addMainIndex.institutionName}
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            placeholder="Placeholder"
                            label="InstitutionName"
                            size="medium"
                            margin="none"
                        />
                        <TextField
                           id="heading" name="heading" onChange={(event) => handleMainIndexChange(index, event)} value={addMainIndex.heading}
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            label="Heading"
                            placeholder="Placeholder"
                            size="medium"
                            margin="none"
                        />
                    </div>

                    <div className="bedorgForm-fields2" style={{ top: "354px" }}>
                        <TextField
                            id="policyTitle" name="policyTitle" onChange={(event) => handleMainIndexChange(index, event)} value={addMainIndex.policyTitle}
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            label="policyTitle"
                            placeholder="Placeholder"
                            size="medium"
                            margin="none"
                        />


                        <TextField
                            id="policyNumber" name="policyNumber" onChange={(event) => handleMainIndexChange(index, event)} value={addMainIndex.policyNumber}
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            placeholder="Placeholder"
                            label="PolicyNumber"
                            size="medium"
                            margin="none"
                        />
                    </div>
                    <div className="bedorgForm-fields3" style={{ position: "absolute", display: "flex", top: "441px" }}>
                        <MobileDateTimePicker
                            className="name-input13"
                            label="EffectiveDate"
                            onChange={(event) =>  {let data = [...MainIndexList];
                                data[index][event] = event;                               
                                setMainIndexList(data);}} value={addMainIndex.effectiveDate}
                            slotProps={{
                                textField: {
                                    variant: "outlined",
                                    size: "medium",

                                    color: "primary",
                                },
                            }}
                        />
                        <TextField
                            id="department" name="department" onChange={(event) => handleMainIndexChange(index, event)} value={addMainIndex.department}
                            className="name-input13"
                            color="primary"
                            variant="outlined"
                            type="text"
                            placeholder="Placeholder"
                            label="Department"
                            size="medium"
                            margin="none"
                        />
                    </div>

                </LocalizationProvider>
                <div style={{ display: "flex", position: "absolute", top: "552px", left: "610px", width: "calc(100% - 1151px)", justifyContent: "space-around" }}>
                {MainIndexList.map((addMainIndex, index) => (
                                                MainIndexList.length - 1 === index && <a style={{cursor:'pointer'}} onClick={handleMainIndexAdd}>
                                                <div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#1f489f", borderRadius: "4px", textAlign: "center" }}>
                                                <span style={{ position: "relative", top: "5px", color: "#ffffff" }}>Add</span>
                                            </div></a>
                                            ))}
                     {MainIndexList.length !== 1 && ( <a style={{cursor:'pointer'}} onClick={handleMainIndexRemove}>
                    <div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#C9D1E2", borderRadius: "4px", textAlign: "center" }}>
                        <span style={{ position: "relative", top: "5px", color: "black" }}>Remove</span>
                    </div></a>
                     )}
                </div>

                <div className="bedorgForm-fields8" style={{ top: "644px" }}>
                    <div style={{ color: "#000000", fontWeight: 600 }}>SubHeading </div>

                </div>

                <div className="bedorgForm-fields8" style={{ top: "685px" }}>
                    <TextField
                        id="comments" value={null} onChange={null}
                        className="name-input13"
                        color="primary"
                        variant="outlined"
                        type="text"
                        placeholder="Placeholder"
                        label="IndexContent"
                        size="medium"
                        margin="none"
                    />
                    <textarea
                       
                        style={{ width: " 50%", height: "55px", borderColor: "#c4c4c4", borderRadius: "3px" }}
                        rows={3}
                        cols={30}
                    />

                </div>
                <div style={{ display: "flex", position: "absolute", top: "790px", left: "610px", width: "calc(100% - 1151px)", justifyContent: "space-around" }}>
                    <div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#1f489f", borderRadius: "4px", textAlign: "center" }}>
                        <span style={{ position: "relative", top: "5px", color: "#ffffff" }}>Add</span>
                    </div>
                    <div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#C9D1E2", borderRadius: "4px", textAlign: "center" }}>
                        <span style={{ position: "relative", top: "5px", color: "black" }}>Remove</span>
                    </div>
                </div>
                <div className="bedorgForm-fields8" style={{ top: "854px" }}>
                    <div style={{ color: "#000000", fontWeight: 600 }}>IndexContent1 </div>

                </div>
                <div className="bedorgForm-fields8" style={{ top: "893px" }}>
                    <TextField
                        id="comments" value={null} onChange={null}
                        className="name-input13"
                        color="primary"
                        variant="outlined"
                        type="text"
                        placeholder="Placeholder"
                        label="IndexContent"
                        size="medium"
                        margin="none"
                    />
                    <textarea
                       
                        style={{ width: " 50%", height: "55px", borderColor: "#c4c4c4", borderRadius: "3px" }}
                        rows={3}
                        cols={30}
                    />

                </div>
                <div style={{ display: "flex", position: "absolute", top: "1000px", left: "610px", width: "calc(100% - 1151px)", justifyContent: "space-around" }}>
                    <div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#1f489f", borderRadius: "4px", textAlign: "center" }}>
                        <span style={{ position: "relative", top: "5px", color: "#ffffff" }}>Add</span>
                    </div>
                    <div style={{ border: "1px groove ", cursor: "pointer", height: "31px", width: "70px", backgroundColor: "#C9D1E2", borderRadius: "4px", textAlign: "center" }}>
                        <span style={{ position: "relative", top: "5px", color: "black" }}>Remove</span>
                    </div>
                </div>
               
              

                </div> 
            </div>
            </div>)))}
            <div style={{position:'relative',top:'-21px'}} className="component-5011">
                    <div className="cancel-group" style={{position:'relative',top:'12px'}}>
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
                            onNextContainerClick={handlePageSave}
                        />
                    </div>
                </div>
        </>
    );

};
const mapStateToProps = (state: any) => {
    const { deviceFormData, getAllergyByPatientInputIdData, getAllStaffData, createPatientAllergyData, updatePatientAllergyData } = state;
    return {
        deviceFormData, getAllergyByPatientInputIdData, getAllStaffData, createPatientAllergyData, updatePatientAllergyData
    };
};

export default connect(mapStateToProps)(NewIndexDynamicController)




