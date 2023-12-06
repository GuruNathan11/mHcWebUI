import React from 'react'
import Checkbox from './Components/Checkbox';
import Input from './Components/Input';
import Select from './Components/Select';
import Calendar from './Components/Calendar';
import Label from './Components/Label';
import EmptyArea from './Components/EmptyArea';
import MultiCheckBox from './Components/MultiCheckBox';
import Listbox from './Components/ListBox';
import Option from './Components/Option';
const Element = ({ field: { fieldType, fieldId, fieldLabel, fieldPlaceholder, fieldValue, fieldOptions, fieldSize, fieldSelect, fieldValue2, fieldOptions1, fieldValue1} }) => {

    switch (fieldType) {
        case 'text':
            return (<Input
                fieldId={fieldId}
                fieldLabel={fieldLabel}
                fieldPlaceholder={fieldPlaceholder}
                fieldValue={fieldValue}
                fieldSize={fieldSize}
            />)
        case 'select':
            return (<Select
                fieldId={fieldId}
                fieldLabel={fieldLabel}
                fieldPlaceholder={fieldPlaceholder}
                fieldValue={fieldValue}
                fieldOptions={fieldOptions}
                fieldSize={fieldSize}
            />)
        case 'checkbox':
            return (<Checkbox                
                fieldLabel={fieldLabel}
                fieldValue2={fieldValue2}
                fieldSize ={fieldSize}
                fieldId={fieldId}
            />)
        case 'date':
            return (<Calendar
                fieldId={fieldId}
                fieldLabel={fieldLabel}
                fieldValue={fieldValue}
                fieldSize={fieldSize}
            />)
        case 'label':
            return (<Label
                fieldId={fieldId}
                fieldLabel={fieldLabel}
                fieldValue={fieldValue}
                fieldSize={fieldSize}
            />)
        case 'empty':
            return (<EmptyArea              
                fieldSize={fieldSize}
            />)
        case 'multiselect':
            return (<MultiCheckBox                
                fieldOptions={fieldOptions}
                fieldSelect ={fieldSelect}
                fieldId={fieldId}
                fieldSize={fieldSize}
                fieldLabel={fieldLabel}
            />)
        case 'listbox':
            return (<Listbox                
                fieldOptions1={fieldOptions1}
                fieldValue1={fieldValue1}
                fieldLabel={fieldLabel}          
            />)
        case 'radio':
            return (<Option                
                fieldOptions={fieldOptions}
                fieldSelect ={fieldSelect}
                fieldId={fieldId}
                fieldSize={fieldSize}
                fieldLabel={fieldLabel}
            />)
        default:
            return null;
    }


}

export default Element