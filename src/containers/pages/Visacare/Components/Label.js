import React, { useContext } from 'react'
import { FormContext } from '../../../../FormContext';

const Label = ({ fieldLabel, fieldSize }) => {
    const { handleChange } = useContext(FormContext)
    if(fieldSize === "Medium"){
    return (
             <div id="removePadding" className="p-col-12 p-md-6" style={{fontFamily:"Times New Roman",fontSize:'15px',fontWeight:"lighter",textAlign:"justify",position:"relative",left:"20px",top:"6px",width:"calc(100% - 636px)"}}><span>{fieldLabel}</span></div>                           
    )
    }else{
        return (
            <div id="removePadding" className="p-col-12 p-md-12" style={{fontFamily:"Times New Roman",fontSize:'15px',fontWeight:"lighter" }}><span>{fieldLabel}</span></div>                           
        )
    }
}

export default Label