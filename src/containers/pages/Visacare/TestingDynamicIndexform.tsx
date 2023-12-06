
import React, { useState, useCallback, Dispatch, useEffect } from "react";
import "./../Bed/BedMasterConfiguration.css";
import Newtesting from "./../../../assets/data/IndexFormData.json";
import { connect } from "react-redux";
import { HttpLogin } from "../../../utils/Http";
interface ITestingform { }
interface ITestingform {
    StaticPage: any;
    dispatch: Dispatch<any>;
    match: any;
    getAllergyByPatientInputIdData: any;
    createPatientAllergyData: any;
    updatePatientAllergyData: any;
    getAllStaffData: any;
    state: {
        nodes: [],
        checked: [],
        expanded: []
    }
}
const Testingform: React.FC<ITestingform> = ({
    dispatch, match, getAllergyByPatientInputIdData, getAllStaffData, createPatientAllergyData, updatePatientAllergyData


}) => {

    let [TestingformData, setTestingformData] = useState(Newtesting);


    useEffect(() => {
        var encryptInitial = match.params.id;
        
        var CryptoJS = require("crypto-js");
        let decodePatientid = decodeURIComponent(encryptInitial);
        let decodeFinalPatientid = CryptoJS.AES.decrypt(decodePatientid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
        
        HttpLogin.axios().get("/api/indexForm/getById/"+decodeFinalPatientid)
        .then((response) => {
            if (response.data.message.code === "MHC - 0200") {
                setTestingformData(response.data.data);
            }
        })
    }, []);

    const [isVisible, setIsVisible] = useState(false);
    const toggleEvent = () => {
        setIsVisible(true);
        if (isVisible) {
            setIsVisible(false);
        }

    }

    const [activeTab, setActiveTab] = useState(null);
    const [clickedTabValue, setClickedTabValue] = useState(null);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const handleTabChange = (tab) => {
        console.log('Changed tab:', tab);
        setClickedTabValue(tab);
        setActiveTab(tab);
        setActiveTabIndex(Number(tab.replace('tab', '')) - 1);
    };

    const [activeHeading, setActiveHeading] = useState(null);
    const [activeSubHeading, setActiveSubHeading] = useState(null);
    const [activeContent, setActiveContent] = useState(null);

    const handleHeadingClick = (heading) => {
        setActiveHeading(activeHeading === heading ? null : heading);
        setActiveSubHeading(null);
    };

    const handleSubHeadingClick = (subHeading) => {   
        console.log(JSON.stringify(activeSubHeading === subHeading ? null : subHeading));   
        setActiveSubHeading(activeSubHeading === subHeading ? null : subHeading);   
        setActiveContent(null);
    };

    const handleContentClick = (newHeading) => {
        console.log(JSON.stringify(activeSubHeading)); 
        setActiveContent(activeContent === newHeading ? null : newHeading);
    };

    // Define state variable
    const [activeSubIndexContent, setActiveSubIndexContent] = useState(null);

    // Update handleSubHeadingClick function
    const handleSubHeadingClicks = (heading) => {
        console.log(JSON.stringify(activeSubIndexContent)); 
        setActiveSubIndexContent(heading === activeHeading ? null : heading);
        setActiveSubHeading(null);
    };
    const colors = ['#FF5733', '#33FF57', '#5733FF', '#ffffff'];
    return (
        <>
            <div style={{ position: "absolute", top: '3px', backgroundColor: "#EAF2FA", height: "768px", left: "2px", width: "300px" }}>
                <div style={{ display: "flex", gap: "14px", flexDirection: "column" }}>
                    <div>



                        {/* {TestingformData.content.map((sub, subIndex) => (
                            <div key={subIndex} style={{ marginBottom: '10px' }}>
                                <div
                                    style={{
                                        position: "relative",
                                        left: "34px",
                                        top: "25px",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => handleSubHeadingClicks(sub.heading)}
                                >
                                    <i style={{ position: "relative", top: "7px" }} className="large material-icons">chevron_right</i>
                                    {sub.heading}
                                </div>
                                {activeSubIndexContent === sub.heading && (
                                    <div style={{
                                        position: "relative", left: "85px", top: "26px", display: "flex", flexDirection: "column", gap: "10px"
                                    }}>
                                        {sub.subHeading[0].indexContent1.map((content, indexContent1) => (
                                            <div
                                                onClick={() => handleTabChange('tab2')}
                                                className={activeTab === 'tab2' ? 'active' : ''}
                                                style={{ cursor: "pointer" }}
                                                key={indexContent1}
                                            >
                                                {content.indexContent}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))} */}
                        {TestingformData.content.map((item, index) => (
                            <details key={index}
                                //  onClick={() => handleTabChange(`tab${index + 1}`)}
                                //     className={activeTab === `tab${index + 1}` ? 'active' : ''}
                                style={{ marginBottom: '10px' }}>
                                <summary
                                    style={{
                                        position: "relative",
                                        top: "20px",
                                        left: "12px",
                                        backgroundColor: colors[index % colors.length],
                                        width: "255px",
                                        height: "29px",
                                        cursor: 'pointer',
                                        padding: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                    onClick={() => handleSubHeadingClicks('tabA'+index)}
                                >
                                    <i className="large material-icons">chevron_right</i>
                                    {item.heading}
                                </summary>
                                {activeSubIndexContent === 'tabA'+index && (
                                    <div>
                                        {item.subHeading.map((sub, subIndex) => (
                                            <div key={subIndex} style={{ marginBottom: '10px' }}>
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        left: "34px",
                                                        top: "25px",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => handleSubHeadingClick('tabB'+subIndex)}
                                                >
                                                    <i style={{ position: "relative", top: "7px" }} className="large material-icons">chevron_right</i>
                                                    {sub.indexContent}
                                                </div>
                                                {activeSubHeading === 'tabB'+subIndex && (
                                                    <div style={{
                                                        position: "relative", left: "85px", top: "29px", display: "flex", flexDirection: "column", gap: "10px"
                                                    }}>
                                                        {sub.indexContent1.map((content, contentIndex) => (
                                                            <div                                                               
                                                                className={activeTabIndex === contentIndex ? 'active' : ''}
                                                                style={{ cursor: "pointer" }}
                                                                key={contentIndex}
                                                            >
                                                                
                                                                <a onClick={() => handleContentClick('tabC'+contentIndex)}>{content.indexContent}</a>
                                                            </div>
                                                        ))}

                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </details>
                        ))}

                    </div>
                </div>
            </div>
            {TestingformData.content.map((item, index) => (<> {activeSubIndexContent === 'tabA'+index && (<div key={index}>                
             <div  style={{ position: "absolute", left: "303px", top: "51px", height: "759px", backgroundColor: "white", width: "-webkit-fill-available" }}>
             <div className="App-TopBar-PatientName" style={{color:'black', fontSize:'20px',position: "relative", left: "5px", top: "-40px",}}><span><a style={{cursor:'pointer'}} >{item.heading}</a></span><i style={{position:'relative',top:'4px'}} className="large material-icons">chevron_right</i></div>
                <div style={{ display: "flex", width: "calc(100% - 270px)", justifyContent: "space-between", top: "20px", left: "133px", position: "absolute", border: "2px groove #cfcde5", height: "51px", lineHeight: 3.5 }}>
                    <div style={{ width: "133px", borderRightStyle: "groove" }}><span style={{ position: "relative", left: "5px" }}>Institution Name:</span></div>
                    <div style={{ position: "relative", left: "-46px", borderRightStyle: "groove", width: "292px" }}><span>{item.institutionName}</span></div>
                    <div style={{ position: "relative", left: "-100px", borderRightStyle: "groove", width: "111px" }}><span>Policy Title:</span></div>
                    <div style={{ position: "relative", left: "-85px" }}><span style={{ position: "relative", left: "-5px" }}>{item.policyTitle}</span></div>
                </div>
                <div style={{ display: "flex", width: "calc(100% - 270px)", justifyContent: "space-between", top: "69px", left: "133px", position: "absolute", border: "2px groove #cfcde5", height: "51px", lineHeight: 3.5 }}>
                    <div style={{ width: "133px", borderRightStyle: "groove" }}><span style={{ position: "relative", left: "5px" }}>Policy Number:</span></div>
                    <div style={{ position: "relative", left: "-59px", borderRightStyle: "groove", width: "292px" }}><span>{item.policyNumber}</span></div>
                    <div style={{ position: "relative", left: "-127px", borderRightStyle: "groove", width: "111px" }}><span>Effective Date:</span></div>
                    <div style={{ position: "relative", left: "-125px" }}><span style={{ position: "relative", left: "-5px" }}>{item.effectiveDate}</span></div>
                </div>
                <div style={{ display: "flex", width: "calc(100% - 270px)", justifyContent: "space-between", top: "118px", left: "133px", position: "absolute", border: "2px groove #cfcde5", height: "51px", lineHeight: 3.5 }}>
                    <div style={{ width: "133px", borderRightStyle: "groove",position: "relative", left: "2.5px"}}><span style={{ position: "relative", left: "2px" }}>Department:</span></div>
                    <div style={{ position: "relative", left: "26px", width: "768px" }}><span>{item.department}</span></div>
                </div>                
            </div>          
            {item.subHeading.map((sub, subIndex) => (   activeSubHeading === 'tabB'+subIndex && (
    <div key={subIndex}><div style={{ position: "absolute", left: "303px", top: "11px", height: "759px", backgroundColor: "white", width: "-webkit-fill-available" }}>
    <div style={{ position: "absolute", top: "70px", left: "30px" }}>
    <div className="App-TopBar-PatientName" style={{color:'black', fontSize:'20px',position:'relative',top:'-70px',left:'-25px'}}><span><a style={{cursor:'pointer'}} onClick={() => handleSubHeadingClick('tabB'+subIndex)}>{item.heading}</a></span><i style={{position:'relative',top:'4px'}} className="large material-icons">chevron_right</i>
        <span><a style={{cursor:'pointer'}} >{sub.indexContent}</a></span><i style={{position:'relative',top:'4px'}} className="large material-icons">chevron_right</i></div>
        <div>{sub.content}</div>
    </div>
</div>
{sub.indexContent1.map((content, contentIndex) => ( activeContent === 'tabC'+contentIndex &&(
     <div key={contentIndex}><div style={{ position: "absolute", left: "303px", top: "11px", height: "759px", backgroundColor: "white", width: "-webkit-fill-available" }}>
     <div style={{ position: "absolute", top: "70px", left: "30px" }}>
        <div className="App-TopBar-PatientName" style={{color:'black', fontSize:'20px',position:'relative',top:'-70px',left:'-25px'}}><span><a style={{cursor:'pointer'}} onClick={() => handleSubHeadingClick('tabB'+subIndex)}>{item.heading}</a></span><i style={{position:'relative',top:'4px'}} className="large material-icons">chevron_right</i>
        <span><a style={{cursor:'pointer'}}  onClick={() => handleContentClick('tabC'+contentIndex)}>{sub.indexContent}</a></span><i style={{position:'relative',top:'4px'}} className="large material-icons">chevron_right</i>
        <span><a style={{cursor:'pointer'}} >{content.indexContent}</a></span><i style={{position:'relative',top:'4px'}} className="large material-icons">chevron_right</i></div>
         <div>{content.content}</div>
     </div>
 </div>
 </div>)
))}
</div>
    )))}
            </div>)}
           </>))}
        </>
    );

};
const mapStateToProps = (state: any) => {
    const { deviceFormData, getAllergyByPatientInputIdData, getAllStaffData, createPatientAllergyData, updatePatientAllergyData } = state;
    return {
        deviceFormData, getAllergyByPatientInputIdData, getAllStaffData, createPatientAllergyData, updatePatientAllergyData
    };
};

export default connect(mapStateToProps)(Testingform)




