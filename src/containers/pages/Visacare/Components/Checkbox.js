import React, { useContext } from 'react'
import { FormContext } from '../../../../FormContext';
const Checkbox = ({ fieldId, fieldLabel, fieldValue2, fieldSize }) => {
    const { handleChange } = useContext(FormContext)
    if (fieldSize === "Small") {
        return (
            <>
                <div id="removePadding" className="p-col-12 p-md-12" style={{ position: "relative", left: "20px", top: "6px" }}>
                    <input type="checkbox" checked={fieldValue2} style={{ height: '21px', width: '24px', }}
                        onChange={(event, i) => handleChange(fieldId, event, i)}
                    />
                    <span id="removePadding" className="p-col-12 p-md-2" style={{ fontFamily: "Times New Roman", color: "#8494B7", fontSize: '17px', fontWeight: "lighter", textAlign: "justify", position: "relative", top: "-5px" }}>{fieldLabel}</span>
                </div>

            </>
        )
    } else if (fieldSize === "Medium") {
        return (
            <>
                <div id="removePadding" className="p-col-12 p-md-1" style={{ position: "relative", left: "20px", top: "6px" }} >
                    <input type="checkbox" checked={fieldValue2} style={{ height: '21px', width: '24px' }}
                        onChange={(event, i) => handleChange(fieldId, event, i)}
                    />

                </div>
                <div id="removePadding" className="p-col-12 p-md-5" style={{ fontFamily: "Times New Roman,Times, serif", color: "#8494B7", fontSize: '17px', fontWeight: "lighter", textAlign: "justify", position: "relative", top: "6px" }}>{fieldLabel}</div>
            </>
        )
    } else {
        return (
            <>
                <div id="removePadding" className="p-col-12 p-md-12" style={{ position: "relative", left: "20px", top: "26px" }}>
                    <input type="checkbox" checked={fieldValue2} style={{ height: '21px', width: '24px' }}
                        onChange={event => handleChange(fieldId, event)}
                    />
                    <span id="removePadding" className="p-col-12 p-md-11" style={{ fontFamily: "Times New Roman,Times, serif", color: "#8494B7", fontSize: '17px', fontWeight: "lighter", textAlign: "justify", position: "relative", top: '-6px',left:"34px" }}>{fieldLabel}</span>
                </div>

            </>
        )
    }
}

export default Checkbox