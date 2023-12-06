import React, { useState } from "react";
import { useContext } from 'react';
import "./../../../../css/Listbox.css";
import { FormContext } from '../../../../FormContext';
const HIGHLIGHT_COLOR = "#d5dce6";
const onSelectedPlaceholder = (newSelection, selectedList) => {};

const ListBox = ({fieldOptions1, fieldValue1, fieldLabel, onSelected = onSelectedPlaceholder, widthPct = 100,maxHeight = "100%"}) => {
const { handleChange } = useContext(FormContext)
  const [filterText, setFilterText] = useState("");
  const [filteredList, setFilteredList] = useState(fieldOptions1);
  const [selectedValues, setSelectedValues] = useState([]);

  const onFilter = (fieldValue1) => {
    setFilterText(fieldValue1);
    if (!fieldValue1 || fieldValue1 === "") {
      setFilteredList(fieldOptions1);
      return;
    }

    setFilteredList(
      fieldOptions1.filter((item) => item.toLowerCase().includes(fieldValue1.toLowerCase()))
    );
  };

  const onSelect = (item) => {
    let newSelections = [...selectedValues, item];

    if (selectedValues.includes(item)) {
      newSelections = newSelections.filter((selection) => selection !== item);
    }

    setSelectedValues(newSelections);
    setFilterText("");
    onFilter("");
    onSelected(item, newSelections);
  };

  return (
    <>
    <div id="removePadding" className="p-col-12 p-md-11" style={{fontFamily:"Times New Roman",fontSize:'20px',fontWeight:400}}><span>{fieldLabel}</span></div>
    <div className="ListBox" style={{ width: widthPct + "%" }}>
      <div className="block">
        <input
          className="full-width"
          type="text"
          placeholder={selectedValues.join(", ")}
          onChange = {(event) => handleChange(event, event.target.value,event)}
        /*  onChange={(e) => onFilter(e.target.value)}  */
          value={fieldValue1}
        />
      </div>
      <ul className="full-width overflow-auto" style={{ maxHeight: maxHeight }}>
        {fieldOptions1.map((item, index) => (
          <li
            key={index}
            className="no-highlight"
            style={{
              backgroundColor: selectedValues.includes(item)
                ? HIGHLIGHT_COLOR
                : "white",
            }}
            value={item}
            onClick={() => onSelect(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default ListBox;