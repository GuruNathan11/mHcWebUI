import React, { useContext } from 'react'
import { FormContext } from '../../../../FormContext';
const MultiCheckBox = ({ fieldOptions, fieldSelect, fieldId, fieldSize, fieldLabel }) => {
    const { handleChange } = useContext(FormContext)
    if (fieldSize === "Small") {
        return (
            <>
                <div id="removePadding" className="p-col-12 p-md-3" style={{ fontFamily: "Times New Roman", color: "#8494B7", fontSize: '17px', fontWeight: "lighter", textAlign: "justify", position: "relative", top: "15px", left: '17px' }}>{fieldLabel}</div>

                {fieldOptions.length > 0 && (
                    <div id="removePadding" className="p-col-12 p-md-7" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", width: "70%", gap: "10px" }}>
                        {fieldOptions.map((item, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="checkbox"
                                    checked={item.optionValue}
                                    id={fieldSelect}
                                    style={{ height: '21px', width: '24px', marginRight: '5px' }}
                                    onChange={(event) => handleChange(item.optionLabel, event, fieldId)}
                                />
                                <label id="removePadding" className="p-col-12 p-md-2" style={{ fontFamily: "Times New Roman", fontSize: '17px',color: "#8494B7", fontWeight: 400 }}>{item.optionLabel}</label>
                            </div>
                        ))}
                    </div>
                )}
            </>
        )
    }
    // <div id="removePadding" className="p-col-12 p-md-3" style={{ fontFamily: "Times New Roman", color: "#8494B7", fontSize: '17px', fontWeight: "lighter", textAlign: "justify", position: "relative", top: "-5px" }}>{fieldLabel}</div>
    //             {fieldOptions.length > 0 && fieldOptions.map((item, i) =>
    //                 <>
    //                     <div id="removePadding" className="p-col-12 p-md-1" style={{display:" grid",gridTemplateColumns:"200px 200px 200px"}}>
    //                     <input type="checkbox" checked={item.optionValue} id={fieldSelect} style={{ height: '21px', width: '24px' }}
    //                         onChange={(event) => handleChange(item.optionLabel, event, fieldId)}
    //                     />

    //                 </div >
    //             <div id="removePadding" className="p-col-12 p-md-2" style={{ fontFamily: "Times New Roman", fontSize: '15px', fontWeight: 400, position: "relative", top: "42px" }}><span style={{ marginLeft: '-27px' }}>{item.optionLabel}</span></div>  

    else if (fieldSize === "Medium") {
        return (
            <>
                <div id="removePadding" className="p-col-12 p-md-3" style={{ fontFamily: "Times New Roman", color: "#8494B7", fontSize: '17px', fontWeight: "lighter", textAlign: "justify", position: "relative", top: "15px", left: '17px' }}>{fieldLabel}</div>

                {fieldOptions.length > 0 && (
                    <div id="removePadding" className="p-col-12 p-md-7" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", width: "70%", gap: "10px" }}>
                        {fieldOptions.map((item, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    type="checkbox"
                                    checked={item.optionValue}
                                    id={fieldSelect}
                                    style={{ height: '21px', width: '24px', marginRight: '5px' }}
                                    onChange={(event) => handleChange(item.optionLabel, event, fieldId)}
                                />
                                <label id="removePadding" className="p-col-12 p-md-2" style={{ fontFamily: "Times New Roman", fontSize: '17px',color: "#8494B7", fontWeight: "lighter" }}>{item.optionLabel}</label>
                            </div>
                        ))}
                    </div>
                )}
                {/* <div id="removePadding" className="p-col-12 p-md-6" style={{ fontFamily: "Times New Roman", fontSize: '15px', fontWeight: "lighter", textAlign: "justify", position: "relative", left: "79px", width: "calc(100% - 195px)" }}>{fieldLabel}</div>
                {fieldOptions.length > 0 && fieldOptions.map((item, i) =>
                    <>
                        <div id="removePadding" className="p-col-12 p-md-1">
                            <input type="checkbox" checked={item.optionValue} id={fieldSelect} style={{ height: '21px', width: '24px' }}
                                onChange={(event) => handleChange(item.optionLabel, event, fieldId)}
                            />

                        </div>
                        <div id="removePadding" className="p-col-12 p-md-5" style={{ fontFamily: "Times New Roman", fontSize: '15px', fontWeight: 400 }}><span style={{ marginLeft: '-27px' }}>{item.optionLabel}</span></div>
                    </>
                )} */}
            </>
        )
    } else {
        return (
            <>
                <div id="removePadding" className="p-col-12 p-md-12" style={{ fontFamily: "Times New Roman", fontSize: '20px', fontWeight: "lighter", position: "relative", color: "#8494B7", top: "15px", left: "23px" }}>{fieldLabel}</div>
                {fieldOptions.length > 0 && fieldOptions.map((item, i) =>
                    <>
                        <div id="removePadding" className="p-col-12 p-md-1" style={{ position: "relative", left: "22px", top: "13px" }}>
                            <input type="checkbox" checked={item.optionValue} id={fieldSelect} style={{ height: '21px', width: '24px' }}
                                onChange={(event) => handleChange(item.optionLabel, event, fieldId)}
                            />

                        </div>
                        <div id="removePadding" className="p-col-12 p-md-11" style={{ fontFamily: "Times New Roman", fontSize: '20px', fontWeight: 400, position: "relative", color: "#8494B7", top: "12px" }}><span style={{ marginLeft: '-27px' }}>{item.optionLabel}</span></div>
                    </>
                )}
            </>
        )
    }






}

export default MultiCheckBox