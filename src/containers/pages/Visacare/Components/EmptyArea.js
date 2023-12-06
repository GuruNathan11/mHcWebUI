import React, { useContext } from 'react'
import { FormContext } from '../../../../FormContext';

const EmptyArea = ({ fieldSize }) => {
    const { handleChange } = useContext(FormContext)
    if(fieldSize === "Small"){
        return (
             <div id="removePadding" className="p-col-12 p-md-4" ></div>                           
        )
    }else if(fieldSize === "Medium"){
        return (
             <div id="removePadding" className="p-col-12 p-md-6" ></div>                           
        )
    }else{
        return (
            <div id="removePadding" className="p-col-12 p-md-12" ></div>                           
        )
    }
}

export default EmptyArea